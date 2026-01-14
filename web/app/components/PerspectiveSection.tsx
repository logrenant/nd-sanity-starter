import { useRef, useEffect, useState, Fragment } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import type { SanityPerspectiveSection, SanityPerspectiveSectionItem } from '~/lib/sanity-types';

interface Props {
  data: SanityPerspectiveSection;
}

export function PerspectiveSection({ data }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const [scrollBlocked, setScrollBlocked] = useState(false);
  const [requiredScroll, setRequiredScroll] = useState(0);
  const { items } = data;

  useEffect(() => {
    const element = container.current;
    if (!element) return;

    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let velocityTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      if (scrollBlocked) {
        e.preventDefault();
      }

      scrollVelocity = Math.abs(e.deltaY);
      
      clearTimeout(velocityTimeout);
      velocityTimeout = setTimeout(() => {
        scrollVelocity = 0;
      }, 150);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      
      if (scrollBlocked && delta > 0) {
        setRequiredScroll(prev => prev - delta);
        
        if (requiredScroll <= 0) {
          setScrollBlocked(false);
          setRequiredScroll(0);
        }
      }
      
      lastScrollY = currentScrollY;
    };

    element.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      element.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(velocityTimeout);
    };
  }, [scrollBlocked, requiredScroll]);

  if (!items || items.length === 0) return null;

  return (
    <div 
      ref={container} 
      className="relative"
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <Fragment key={item.key || i}>
            <PerspectiveItem
              item={item}
              isLast={isLast}
              onReachBottom={() => {
                if (!isLast) {
                  setScrollBlocked(true);
                  setRequiredScroll(300);
                }
              }}
            />
          </Fragment>
        );
      })}
    </div>
  );
}

interface ItemProps {
  item: SanityPerspectiveSectionItem;
  isLast: boolean;
  onReachBottom: () => void;
}

function PerspectiveItem({ item, isLast, onReachBottom }: ItemProps) {
  const imageUrl = item.image?.asset?.url;
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLast) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isVisible) {
          onReachBottom();
        }
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.95 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [isLast, isVisible, onReachBottom]);

  return (
    <div 
      className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-white"
    >
        <div className="relative w-full h-full">
            {imageUrl && (
                <motion.img 
                    src={imageUrl} 
                    alt={item.title || ''} 
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            )}
             {/* Overlay */}
             <div className="absolute inset-0 bg-black/30" />
             
             <motion.div 
               className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center z-10"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
             >
                  {item.title && <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg">{item.title}</h2>}
                  {item.description && <p className="mt-6 text-lg md:text-xl lg:text-2xl leading-relaxed drop-shadow-md max-w-2xl font-light">{item.description}</p>}
             </motion.div>
             
             {/* Animated Button */}
             {item.buttonText && item.buttonLink && (
               <motion.div
                 className="absolute bottom-32 left-1/2 z-20"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.4 }}
                 style={{ x: '-50%' }}
               >
                 <Link
                   to={item.buttonLink}
                   className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white overflow-hidden"
                 >
                   {/* Background gradient animation */}
                   <div className="absolute inset-0 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg transition-all duration-300 group-hover:bg-white/30 group-hover:border-white/50" />
                   
                   {/* Shine effect */}
                   <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                   </div>
                   
                   <span className="relative z-10 flex items-center gap-2">
                     {item.buttonText}
                     <motion.svg
                       className="w-6 h-6"
                       fill="none"
                       stroke="currentColor"
                       viewBox="0 0 24 24"
                       initial={{ x: 0 }}
                       whileHover={{ x: 4 }}
                       transition={{ type: 'spring', stiffness: 300 }}
                     >
                       <path
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         strokeWidth={2}
                         d="M17 8l4 4m0 0l-4 4m4-4H3"
                       />
                     </motion.svg>
                   </span>
                 </Link>
               </motion.div>
             )}
             
             {/* Bottom trigger for scroll stop */}
             {!isLast && <div ref={bottomRef} className="absolute bottom-0 h-1 w-full" />}
        </div>
    </div>
  );
}
