import {Link} from 'react-router';
import type {SanityHero} from '~/lib/sanity-types';

interface HeroProps {
  hero: SanityHero;
}

export function Hero({hero}: HeroProps) {
  if (!hero) return null;

  const {title, subtitle, image, ctaText, ctaLink} = hero;
  const imageUrl = image?.asset?.url;

  return (
    <div className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {imageUrl && (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white pt-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        {subtitle && (
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        {ctaText && ctaLink && (
          <Link
            to={ctaLink}
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </div>
  );
}
