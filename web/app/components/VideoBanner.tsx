import {Link} from 'react-router';
import {useEffect, useRef, useState} from 'react';
import type {SanityVideoBanner} from '~/lib/sanity-types';

interface VideoBannerProps {
  banner: SanityVideoBanner;
}

export function VideoBanner({banner}: VideoBannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle video loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoaded(true);
      if (banner.autoplay) {
        video.play().catch(console.error);
      }
    };

    const handleError = (e: Event) => {
      const videoElement = e.target as HTMLVideoElement;
      console.error('Video error:', videoElement.error?.message);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [banner.autoplay, banner.video, banner.mobileVideo, isMobile]);

  const videoUrl = (isMobile && banner.mobileVideo) || banner.video;
  const posterUrl = banner.posterImage?.asset?.url;

  if (!videoUrl) return null;

  const hasOverlay = banner.overlayText || banner.overlaySubtext || banner.ctaText;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black 2xl:h-[58.25vw] 2xl:max-h-screen">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          key={videoUrl}
          className={`absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-500 ease-in-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          poster={posterUrl}
          autoPlay={banner.autoplay}
          loop={banner.loop}
          muted={banner.muted}
          playsInline
          preload="auto"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {hasOverlay && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/30 to-black/50 z-10">
            <div className="text-center text-white p-6 md:p-8 max-w-[900px] animate-[fadeInUp_1s_ease-out]">
              {banner.overlayText && (
                <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold mb-4 mt-0 [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)] leading-[1.2]">
                  {banner.overlayText}
                </h1>
              )}
              {banner.overlaySubtext && (
                <p className="text-[clamp(1rem,2vw,1.5rem)] mb-8 mt-0 opacity-95 [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)] leading-normal">
                  {banner.overlaySubtext}
                </p>
              )}
              {banner.ctaText && banner.ctaLink && (
                <Link
                  to={banner.ctaLink}
                  className="inline-block px-8 py-3.5 md:px-10 md:py-4 bg-white text-black no-underline font-semibold text-base md:text-[1.1rem] rounded transition-all duration-300 ease-out shadow-md hover:-translate-y-0.5 hover:shadow-lg hover:bg-white/95"
                >
                  {banner.ctaText}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
