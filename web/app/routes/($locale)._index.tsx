import {Await, useLoaderData, Link, type MetaFunction, type LoaderFunctionArgs} from 'react-router';
import {ProductItem} from '~/components/ProductItem';
import {SectionRenderer} from '~/components/SectionRenderer';
import {getHomePage} from '~/lib/sanity-queries';
import type {SanityBentoGrid} from '~/lib/sanity-types';

export const meta: MetaFunction<typeof loader> = ({matches}) => {
  const rootData = matches.find((match) => match.id === 'root')?.data;
  const title = (rootData as any)?.settings?.title ?? 'Luneva';
  return [{title: `${title} | Home`}];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const [{collections}, homePage] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    getHomePage(context.sanity).catch((error: Error) => {
      console.error('Error fetching homepage:', error);
      return null;
    }),
  ]);

  const productsMap: Record<string, any[]> = {};

  if (homePage?.sections) {
    const bentoSections = homePage.sections.filter((s: any) => s._type === 'bentoGrid') as SanityBentoGrid[];
    
    if (bentoSections.length > 0) {
      const fetchPromises: Promise<void>[] = [];
      
      for (const section of bentoSections) {
        // Collect all handles from all items in this section
        const handles = new Set<string>();
        if (section.items) {
          section.items.forEach((item: any) => {
            if (item.content) {
              item.content.forEach((contentItem: any) => {
                if (contentItem._type === 'productGrid' && contentItem.products) {
                  contentItem.products.forEach((p: any) => {
                    if (p.handle) handles.add(p.handle);
                  });
                }
              });
            }
          });
        }
        // Legacy support or fallback if fields exist directly
        if (section.products) {
           section.products.forEach((p: any) => {
             if (p.handle) handles.add(p.handle);
           });
        }

        if (handles.size > 0) {
          productsMap[section._id] = [];
          
          const uniqueHandles = Array.from(handles);
          const productPromises = uniqueHandles.map(handle => 
             context.storefront.query(PRODUCT_BY_HANDLE_QUERY, {
                variables: {
                  handle: handle,
                  country: context.storefront.i18n.country,
                  language: context.storefront.i18n.language,
                }
             }).then((res: any) => res?.product).catch((e: unknown) => {
               console.error(`Failed to fetch product ${handle}`, e);
               return null;
             })
          );

          fetchPromises.push(
            Promise.all(productPromises).then(products => {
              productsMap[section._id] = products.filter(Boolean);
            })
          );
        }
      }
      
      await Promise.all(fetchPromises);
    }
  }

  return {
    featuredCollection: collections.nodes[0],
    homePage,
    productsMap,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error: Error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      {data.homePage?.sections && (
        <div className="mx-0">
          <SectionRenderer 
            sections={data.homePage.sections} 
            productsMap={data.productsMap}
          />
        </div>
      )}
    </div>
  );
}


const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;

const PRODUCT_BY_HANDLE_QUERY = `#graphql
  fragment BentoProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
      }
    }
  }
  query ProductByHandle($handle: String!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...BentoProduct
    }
  }
` as const;
