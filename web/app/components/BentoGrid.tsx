import {Link} from 'react-router';
import {PortableText} from '@portabletext/react';
import {motion} from 'framer-motion';
import type {ProductItemFragment} from 'storefrontapi.generated';
import {ProductItem} from './ProductItem';

interface BentoLayout {
    width?: 'full' | 'half' | 'third' | 'two-thirds' | 'quarter';
    height?: 'short' | 'medium' | 'tall';
    contentDirection?: 'column' | 'row' | 'column-reverse' | 'row-reverse';
    align?: 'start' | 'center' | 'end' | 'between';
}

interface BentoProductLink {
    handle: string;
}

interface BentoContentItem {
    _type: 'image' | 'productGrid' | 'richText';
    asset?: {
        url: string;
    };
    isBackground?: boolean;
    expand?: boolean;
    products?: BentoProductLink[];
    text?: any[];
}

interface BentoItem {
    layout?: BentoLayout;
    content?: BentoContentItem[];
}

interface SanityBentoGridNew {
    _id: string;
    items?: BentoItem[];
}

interface BentoGridProps {
  data: SanityBentoGridNew | any;
  products?: ProductItemFragment[];
}

export function BentoGrid({
  data,
  products,
}: BentoGridProps) {
  if (!data || !data.items) return null;

  const widthMap: Record<string, string> = {
    'full': 'md:col-span-12',
    'half': 'md:col-span-6',
    'third': 'md:col-span-4',
    'two-thirds': 'md:col-span-8',
    'quarter': 'md:col-span-3'
  };

  const heightMap: Record<string, string> = {
    'short': 'min-h-[250px]',
    'medium': 'min-h-[500px]',
    'tall': 'min-h-[750px]'
  };
  
  const directionMap: Record<string, string> = {
      'column': 'flex-col',
      'row': 'md:flex-row flex-col',
      'column-reverse': 'flex-col-reverse',
      'row-reverse': 'md:flex-row-reverse flex-col-reverse'
  };

  const justifyMap: Record<string, string> = {
      'start': 'justify-start',
      'center': 'justify-center',
      'end': 'justify-end',
      'between': 'justify-between'
  };

  return (
    <section className="w-full py-24 px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-fr">
            {data.items.map((item: BentoItem, index: number) => {
                const width = item.layout?.width || 'third';
                const height = item.layout?.height || 'medium'; 
                const direction = item.layout?.contentDirection || 'column';
                const align = item.layout?.align || 'start';
                
                const colClass = widthMap[width] || 'md:col-span-4';
                const heightClass = heightMap[height] || 'min-h-[500px]';
                const dirClass = directionMap[direction] || 'flex-col';
                const justifyClass = justifyMap[align] || 'justify-start';

                return (
                    <motion.div 
                      key={index} 
                      className={`relative overflow-hidden rounded-lg bg-gray-50 flex flex-col ${colClass} ${heightClass} border border-neutral-200 transition-all duration-300 hover:border-neutral-400`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      whileHover={{ y: -4 }}
                    >
                        {item.content?.map((content, cIndex) => {
                             // Handle Background Images separately
                             if (content._type === 'image' && content.asset?.url && (content.isBackground || (item.content?.length === 1))) {
                                 return (
                                     <img key={cIndex} src={content.asset.url} alt="Bento" className="w-full h-full object-cover absolute inset-0 z-0" />
                                 );
                             }
                             return null;
                        })}
                        
                        {/* Relative Content Stack */}
                        <div className={`flex w-full h-full z-10 p-4 gap-4 ${dirClass} ${justifyClass}`}>
                            {item.content?.map((content, cIndex) => {
                                 // Skip background images in the stack
                                 if (content._type === 'image' && (content.isBackground || (item.content?.length === 1))) {
                                     return null;
                                 }

                                 // Stacked Image - Flex-1 to take remaining space
                                 if (content._type === 'image' && content.asset?.url) {
                                     return (
                                        <motion.div 
                                          key={cIndex} 
                                          className="relative overflow-hidden flex-1 w-full min-h-0 rounded-lg border border-neutral-200 transition-all duration-300 hover:border-neutral-400 group"
                                          whileHover={{ scale: 1.02 }}
                                          transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                           <img src={content.asset.url} alt="Bento" className="w-full h-full object-cover" />
                                           {/* Shine effect */}
                                           <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden rounded-lg">
                                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                           </div>
                                        </motion.div>
                                     );
                                 }

                                 // Rich Text - Flex-none to take only needed space
                                 if (content._type === 'richText') {
                                     return (
                                         <motion.div 
                                           key={cIndex} 
                                           className="prose prose-sm max-w-none w-full flex-none"
                                           initial={{ opacity: 0, y: 10 }}
                                           whileInView={{ opacity: 1, y: 0 }}
                                           transition={{ duration: 0.5 }}
                                         >
                                             <PortableText value={content.text} />
                                         </motion.div>
                                     );
                                 }

                                 // Product Grid - Dynamic rows, Max height 60%
                                 if (content._type === 'productGrid') {
                                     const itemHandles = content.products?.map(p => p.handle) || [];
                                     const itemProducts = products?.filter(p => itemHandles.includes(p.handle)) || [];
                                     const productCount = itemProducts.length;
                                     
                                     return (
                                         <div 
                                            key={cIndex} 
                                            className="w-full flex-1 min-h-0"
                                         >
                                             {itemProducts.length > 0 ? (
                                                <div 
                                                    className="grid gap-4 h-full"
                                                    style={{ 
                                                        gridTemplateColumns: `repeat(${productCount}, minmax(0, 1fr))` 
                                                    }}
                                                >
                                                     {itemProducts.map((p, idx) => (
                                                        <motion.div 
                                                          key={p.id} 
                                                          className="h-full bg-white rounded-lg overflow-hidden border border-neutral-200 transition-all duration-300 hover:border-neutral-400 group"
                                                          initial={{ opacity: 0, scale: 0.95 }}
                                                          whileInView={{ opacity: 1, scale: 1 }}
                                                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                                                          viewport={{ once: true }}
                                                          whileHover={{ y: -2, borderColor: '#000' }}
                                                        >
                                                            {/* Shine effect overlay */}
                                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden rounded-lg z-20 pointer-events-none">
                                                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                                            </div>
                                                            <ProductItem product={p} />
                                                        </motion.div>
                                                     ))}
                                                </div>
                                             ) : (
                                                 <motion.div 
                                                   className="w-full h-full flex items-center justify-center text-neutral-400 p-8 border-2 border-dashed border-neutral-300 rounded-lg bg-gradient-to-br from-white/50 to-neutral-50/50"
                                                   initial={{ opacity: 0 }}
                                                   whileInView={{ opacity: 1 }}
                                                   transition={{ duration: 0.5 }}
                                                 >
                                                    <span className="text-sm font-medium">Add products in Sanity</span>
                                                 </motion.div>
                                             )}
                                         </div>
                                     )
                                 }
                                 return null;
                            })}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    </section>
  );
}
