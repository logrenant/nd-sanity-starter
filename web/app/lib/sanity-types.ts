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
    _ref?: string
    _type: 'reference'
    _id?: string
    url?: string
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

export interface SanityFaqItem {
  question: string
  answer: any[] // Block content
}

export interface SanityFaq extends SanityDocument {
  _type: 'faq'
  title: string
  faqs: SanityFaqItem[]
}

export interface SanityAbout extends SanityDocument {
  _type: 'about'
  title: string
  mainImage?: SanityImage
  content?: any[] // Block content
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

export interface SanityFile {
  _type: 'file'
  asset: {
    _ref: string
    _type: 'reference'
    url?: string
  }
}

export interface SanityVideoBanner extends SanityDocument {
  _type: 'videoBanner'
  title: string
  video: string  // Will be populated as URL string from query
  posterImage?: SanityImage
  mobileVideo?: string  // Will be populated as URL string from query
  overlayText?: string
  overlaySubtext?: string
  ctaText?: string
  ctaLink?: string
  autoplay: boolean
  loop: boolean
  muted: boolean
  isActive: boolean
}

export interface SanityBentoGrid extends SanityDocument {
  _type: 'bentoGrid'
  title: string
  mainImage: SanityImage
  secondaryImage: SanityImage
  products?: Array<{
    handle: string
  }>
}

export interface SanityPerspectiveSectionItem {
  key: string
  image: SanityImage
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

export interface SanityPerspectiveSection extends SanityDocument {
  _type: 'perspectiveSection'
  items: SanityPerspectiveSectionItem[]
}

export interface SanityTextWithParagraph extends SanityDocument {
  _type: 'textWithParagraph'
  title: string
  content: any[] // Block content
  reverseDirection: boolean
}

export interface SanityHomePage extends SanityDocument {
  _type: 'homePage'
  title: string
  sections: Array<SanityHero | SanityVideoBanner | SanityTextWithParagraph | SanityBentoGrid | SanityPerspectiveSection>
  seo?: SanitySeo
}

export interface SanityLink {
  _type: 'link'
  title: string
  type?: 'custom' | 'faq' | 'about' | 'collections' | 'collection'
  url?: string
  collectionHandle?: string
}

export interface SanityFooterGroup {
  groupTitle: string
  links: SanityLink[]
}

export interface SanityNewsletter {
  title: string
  description: string
  placeholder: string
}

export interface SanityFooter extends SanityDocument {
  _type: 'footer'
  logo?: SanityImage
  usefulLinks?: SanityFooterGroup
  support?: SanityFooterGroup
  newsletter?: SanityNewsletter
}

export interface SanityHeader extends SanityDocument {
  _type: 'header'
  logo?: SanityImage
  menu?: SanityLink[]
}

export interface SanityFontWeight {
  weight: string
  file: {
    asset: {
      _ref?: string
      _type: 'reference'
      _id?: string
      url?: string
      extension?: string
    }
  }
  style: 'normal' | 'italic'
}

export interface SanityFont {
  name: string
  variableName: string
  weights: SanityFontWeight[]
}

export interface SanitySettings extends SanityDocument {
  _type: 'settings'
  title?: string
  description?: string
  logo?: SanityImage
  favicon?: SanityImage
  ogImage?: SanityImage
  fonts?: SanityFont[]
}
