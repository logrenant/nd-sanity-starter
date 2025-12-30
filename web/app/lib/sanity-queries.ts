import type {SanityClient} from '@sanity/client'
import type {
  SanityProduct,
  SanityCollection,
  SanityPage,
  SanityHero,
} from './sanity-types'

/**
 * Fetch active hero for homepage
 */
export async function getActiveHero(
  client: SanityClient
): Promise<SanityHero | null> {
  const query = `*[_type == "hero" && isActive == true][0]{
    _id,
    _type,
    title,
    subtitle,
    image,
    ctaText,
    ctaLink,
    isActive
  }`

  return client.fetch(query)
}

/**
 * Fetch a product by slug
 */
export async function getProductBySlug(
  client: SanityClient,
  slug: string
): Promise<SanityProduct | null> {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    shopifyId,
    slug,
    description,
    seo,
    images
  }`

  return client.fetch(query, {slug})
}

/**
 * Fetch all products
 */
export async function getAllProducts(
  client: SanityClient
): Promise<SanityProduct[]> {
  const query = `*[_type == "product"] | order(_createdAt desc){
    _id,
    _type,
    title,
    shopifyId,
    slug,
    description,
    images
  }`

  return client.fetch(query)
}

/**
 * Fetch a collection by slug
 */
export async function getCollectionBySlug(
  client: SanityClient,
  slug: string
): Promise<SanityCollection | null> {
  const query = `*[_type == "collection" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    shopifyId,
    slug,
    description,
    image,
    seo
  }`

  return client.fetch(query, {slug})
}

/**
 * Fetch all collections
 */
export async function getAllCollections(
  client: SanityClient
): Promise<SanityCollection[]> {
  const query = `*[_type == "collection"] | order(_createdAt desc){
    _id,
    _type,
    title,
    shopifyId,
    slug,
    description,
    image
  }`

  return client.fetch(query)
}

/**
 * Fetch a page by slug
 */
export async function getPageBySlug(
  client: SanityClient,
  slug: string
): Promise<SanityPage | null> {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    content,
    seo
  }`

  return client.fetch(query, {slug})
}

/**
 * Fetch all pages
 */
export async function getAllPages(
  client: SanityClient
): Promise<SanityPage[]> {
  const query = `*[_type == "page"] | order(_createdAt desc){
    _id,
    _type,
    title,
    slug
  }`

  return client.fetch(query)
}
