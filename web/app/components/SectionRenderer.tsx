import {VideoBanner} from '~/components/VideoBanner';
import {Hero} from '~/components/Hero';
import {TextWithParagraph} from '~/components/TextWithParagraph';
import {BentoGrid} from '~/components/BentoGrid';
import {PerspectiveSection} from '~/components/PerspectiveSection';
import type {SanityHero, SanityVideoBanner, SanityTextWithParagraph, SanityBentoGrid, SanityPerspectiveSection} from '~/lib/sanity-types';
import type {ProductItemFragment} from 'storefrontapi.generated';

interface SectionRendererProps {
  sections: Array<SanityHero | SanityVideoBanner | SanityTextWithParagraph | SanityBentoGrid | SanityPerspectiveSection>;
  productsMap?: Record<string, ProductItemFragment[]>;
}

export function SectionRenderer({sections, productsMap}: SectionRendererProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case 'videoBanner':
            return (
              <VideoBanner
                key={section._id}
                banner={section as SanityVideoBanner}
              />
            );
          
          case 'perspectiveSection':
            return (
              <PerspectiveSection
                key={section._id}
                data={section as SanityPerspectiveSection}
              />
            );

          case 'hero':
            return (
              <Hero
                key={section._id}
                hero={section as SanityHero}
              />
            );

          case 'textWithParagraph':
            return (
              <TextWithParagraph
                key={section._id}
                data={section as SanityTextWithParagraph}
              />
            );

          case 'bentoGrid':
            return (
              <BentoGrid
                key={section._id}
                data={section as SanityBentoGrid}
                products={productsMap?.[section._id]}
              />
            );
          
          default:
            console.warn('Unknown section type:', section._type);
            return null;
        }
      })}
    </>
  );
}
