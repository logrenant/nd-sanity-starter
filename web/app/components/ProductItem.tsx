import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import UpArrow from './svg/UpArrow';

export function ProductItem({
  product,
  loading,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  return (
    <Link
      className="product-item"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      <div className='bg-gray-200 rounded-lg p-2 flex flex-col gap-2'>
        <div className='flex flex-row justify-between items-center '>
          <h4 className='text-sm'>{product.title}</h4>
          <div className='h-8 w-8 flex items-center justify-center bg-white rounded-lg'>
            <UpArrow />
          </div>
        </div>
        {image && (
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/2"
            data={image}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
            className="h-auto w-full rounded-lg"
          />
        )}
      </div>
      {/* <small>
        <Money data={product.priceRange.minVariantPrice} />
      </small> */}
    </Link>
  );
}
