import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {CollectionItemFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';

export function CollectionProductCard({
  product,
  loading,
}: {
  product: CollectionItemFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;

  return (
    <Link
      key={product.id}
      prefetch="intent"
      to={variantUrl}
      className="group block h-full overflow-hidden"
    >
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
        {image ? (
          <Image
            alt={image.altText || product.title}
            aspectRatio="3/4"
            data={image}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        
        {/* Subtle overlay on hover if desired, or quick actions */}
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <div className="flex justify-between items-start">
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 group-hover:underline decoration-1 underline-offset-4 line-clamp-2">
            {product.title}
            </h3>
        </div>
        
        <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                <Money data={product.priceRange.minVariantPrice} />
            </span>
            {/* Compare at price could go here if available */}
        </div>
      </div>
    </Link>
  );
}
