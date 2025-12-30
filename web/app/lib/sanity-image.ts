import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'
import type {SanityClient} from '@sanity/client'

/**
 * Initialize the image URL builder
 */
export function getImageBuilder(client: SanityClient) {
  return imageUrlBuilder(client)
}

/**
 * Generate image URL from Sanity image source
 */
export function urlFor(client: SanityClient, source: SanityImageSource) {
  return getImageBuilder(client).image(source)
}

/**
 * Get optimized image URL with default settings
 */
export function getImageUrl(
  client: SanityClient,
  source: SanityImageSource,
  options?: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'jpg' | 'png'
  }
) {
  let builder = urlFor(client, source).auto('format')

  if (options?.width) builder = builder.width(options.width)
  if (options?.height) builder = builder.height(options.height)
  if (options?.quality) builder = builder.quality(options.quality)
  if (options?.format) builder = builder.format(options.format)

  return builder.url()
}
