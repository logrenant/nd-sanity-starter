/**
 * Sanity Schema Types
 * These types should be generated from your Sanity schema
 */

export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface SanitySeo {
  title?: string
  description?: string
}

export interface SanityProduct extends SanityDocument {
  _type: 'product'
  title: string
  shopifyId?: string
  slug: SanitySlug
  description?: string
  seo?: SanitySeo
  images?: SanityImage[]
}

export interface SanityCollection extends SanityDocument {
  _type: 'collection'
  title: string
  shopifyId?: string
  slug: SanitySlug
  description?: string
  image?: SanityImage
  seo?: SanitySeo
}

export interface SanityPage extends SanityDocument {
  _type: 'page'
  title: string
  slug: SanitySlug
  content?: any[] // Block content
  seo?: SanitySeo
}

export interface SanityHero extends SanityDocument {
  _type: 'hero'
  title: string
  subtitle?: string
  image: SanityImage
  ctaText?: string
  ctaLink?: string
  isActive: boolean
}
