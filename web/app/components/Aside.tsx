import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {motion} from 'motion/react';

type AsideType = 'search' | 'cart' | 'mobile' | 'closed';
type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 */
export function Aside({
  children,
  heading,
  type,
}: {
  children?: React.ReactNode;
  type: AsideType;
  heading: React.ReactNode;
}) {
  const {type: activeType, close} = useAside();
  const expanded = type === activeType;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    if (expanded) {
      document.addEventListener(
        'keydown',
        function handler(event: KeyboardEvent) {
          if (event.key === 'Escape') {
            close();
          }
        },
        {signal: abortController.signal},
      );
    }
    return () => abortController.abort();
  }, [close, expanded]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-modal
      className={`fixed inset-0 bg-black/20 z-[100] transition-opacity duration-400 ${
        expanded ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
      }`}
      role="dialog"
    >
      <button
        className="bg-transparent border-none text-transparent h-full absolute left-0 top-0 w-[calc(100%-400px)]"
        onClick={close}
      />
      <motion.aside
        layout
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 50,
        }}
        className={`bg-white/95 backdrop-blur-[10px] border-l border-neutral-200 shadow-2xl fixed right-[-400px] w-[min(400px,100vw)] flex flex-col
          h-[calc(100vh-60px)] top-[60px] rounded-tl-[30px]
          md:h-[calc(100vh-70px)] md:top-[70px]
          lg:h-[calc(100vh-80px)] lg:top-[80px]
          ${
            scrolled
              ? 'h-[calc(100vh-70px)] top-[70px] mr-4 rounded-xl md:h-[calc(100vh-100px)] md:top-[80px] md:mr-4 lg:h-[calc(100vh-120px)] lg:top-[100px] lg:mr-16 lg:rounded-xl'
              : ''
          }
          ${expanded ? '-translate-x-[400px]' : ''}
        `}
      >
        <header className="flex items-center justify-between h-16 px-6 border-b border-neutral-200 bg-white shrink-0 rounded-xl">
          <h3 className="m-0 text-neutral-900 font-bold text-lg">{heading}</h3>
          <button
            className="font-bold opacity-60 hover:opacity-100 transition-opacity duration-200 w-6 h-6 flex items-center justify-center text-neutral-600 hover:text-neutral-900 border-0 bg-transparent cursor-pointer"
            onClick={close}
            aria-label="Close cart"
          >
            ✕
          </button>
        </header>
        <main className="flex-1 overflow-hidden relative px-6">{children}</main>
      </motion.aside>
    </div>
  );
}

const AsideContext = createContext<AsideContextValue | null>(null);

Aside.Provider = function AsideProvider({children}: {children: ReactNode}) {
  const [type, setType] = useState<AsideType>('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}
