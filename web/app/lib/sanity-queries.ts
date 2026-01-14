import type {SanityClient} from '@sanity/client'
import type {
  SanityHero,
  SanityVideoBanner,
  SanityHomePage,
  SanityFaq,
  SanityAbout,
  SanityFooter,
  SanityHeader,
  SanitySettings,
} from './sanity-types'

/**
 * Fetch Header settings
 */
export async function getHeader(
  client: SanityClient
): Promise<SanityHeader | null> {
  const query = `*[_type == "header"][0]{
    _id,
    _type,
    logo{
      _type,
      asset->{
        _id,
        _type,
        url,
        metadata
      },
      hotspot,
      crop
    },
    menu[]{
      title,
      type,
      url,
      collectionHandle
    }
  }`

  return client.fetch(query)
}

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
    image{
      _type,
      asset->{
        _id,
        _type,
        url,
        metadata
      },
      hotspot,
      crop
    },
    ctaText,
    ctaLink,
    isActive
  }`

  return client.fetch(query)
}

/**
 * Fetch active video banner for homepage
 */
export async function getActiveVideoBanner(
  client: SanityClient
): Promise<SanityVideoBanner | null> {
  const query = `*[_type == "videoBanner" && isActive == true][0]{
    _id,
    _type,
    title,
    "video": video.asset->url,
    posterImage{
      _type,
      asset->{
        _id,
        _type,
        url,
        metadata
      },
      hotspot,
      crop
    },
    "mobileVideo": mobileVideo.asset->url,
    overlayText,
    overlaySubtext,
    ctaText,
    ctaLink,
    autoplay,
    loop,
    muted,
    isActive
  }`

  return client.fetch(query)
}

/**
 * Fetch homepage with all sections
 */
export async function getHomePage(
  client: SanityClient
): Promise<SanityHomePage | null> {
  const query = `*[_type == "homePage"][0]{
    _id,
    _type,
    title,
    "sections": sections[]->{
      _id,
      _type,
      _type == "videoBanner" => {
        title,
        "video": video.asset->url,
        posterImage{
          _type,
          asset->{
            _id,
            _type,
            url,
            metadata
          },
          hotspot,
          crop
        },
        "mobileVideo": mobileVideo.asset->url,
        overlayText,
        overlaySubtext,
        ctaText,
        ctaLink,
        autoplay,
        loop,
        muted,
        isActive
      },
      _type == "hero" => {
        title,
        subtitle,
        image{
          _type,
          asset->{
            _id,
            _type,
            url,
            metadata
          },
          hotspot,
          crop
        },
        ctaText,
        ctaLink,
        isActive
      },
      _type == "textWithParagraph" => {
        title,
        content,
        reverseDirection
      },
      _type == "bentoGrid" => {
        items[]{
          layout{
            width,
            height,
            contentDirection,
            align
          },
          content[]{
            _type,
            _type == "image" => {
              asset->{
                _id,
                _type,
                url,
                metadata
              },
              hotspot,
              crop,
              isBackground,
              expand
            },
            _type == "productGrid" => {
              products[]{
                handle
              },
              expand
            },
            _type == "richText" => {
              text,
              expand
            }
          }
        }
      },
      _type == "perspectiveSection" => {
        items[]{
          _key,
          title,
          description,
          buttonText,
          buttonLink,
          image{
            _type,
            asset->{
              _id,
              _type,
              url,
              metadata
            },
            hotspot,
            crop
          }
        }
      }
    },
    seo
  }`

  return client.fetch(query)
}

/**
 * Fetch FAQ page
 */
export async function getFaqPage(
  client: SanityClient
): Promise<SanityFaq | null> {
  const query = `*[_type == "faq"][0]{
    _id,
    _type,
    title,
    faqs[]{
      question,
      answer
    }
  }`

  return client.fetch(query)
}

/**
 * Fetch About Us page
 */
export async function getAboutPage(
  client: SanityClient
): Promise<SanityAbout | null> {
  const query = `*[_type == "about"][0]{
    _id,
    _type,
    title,
    mainImage{
      _type,
      asset->{
        _id,
        _type,
        url,
        metadata
      },
      hotspot,
      crop
    },
    content
  }`

  return client.fetch(query)
}

/**
 * Fetch Footer settings
 */
export async function getFooter(
  client: SanityClient
): Promise<SanityFooter | null> {
  const query = `*[_type == "footer"][0]{
    _id,
    _type,
    logo{
      _type,
      asset->{
        _id,
        _type,
        url,
        metadata
      },
      hotspot,
      crop
    },
    usefulLinks{
      groupTitle,
      links[]{
        title,
        type,
        url,
        collectionHandle
      }
    },
    support{
      groupTitle,
      links[]{
        title,
        type,
        url,
        collectionHandle
      }
    },
    newsletter{
      title,
      description,
      placeholder
    }
  }`

  return client.fetch(query)
}

/**
 * Fetch site settings including fonts
 */
export async function getSettings(
  client: SanityClient
): Promise<SanitySettings | null> {
  const query = `*[_type == "settings"][0]{
    _id,
    _type,
    title,
    description,
    logo{
      _type,
      asset->{
        _id,
        _type,
        url,
        metadata
      },
      hotspot,
      crop
    },
    favicon{
      _type,
      asset->{
        _id,
        _type,
        url,
        metadata
      }
    },
    ogImage{
      _type,
      asset->{
        _id,
        _type,
        url,
        metadata
      },
      hotspot,
      crop
    },
    fonts[]{
      name,
      variableName,
      weights[]{
        weight,
        style,
        file{
          asset->{
            _id,
            _type,
            url,
            extension,
            originalFilename
          }
        }
      }
    }
  }`

  return client.fetch(query)
}
