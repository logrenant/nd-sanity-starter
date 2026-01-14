import {Suspense, useState} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import type {SanityHeader} from '~/lib/sanity-types';
import {useAside} from '~/components/Aside';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from '~/components/ui/resizable-navbar';
import {UserIcon, MagnifyingGlassIcon, ShoppingCartIcon} from '@heroicons/react/24/outline';

interface HeaderProps {
  header: HeaderQuery;
  sanityHeader: SanityHeader | null;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  sanityHeader,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Use Sanity header items if available, otherwise fallback to Shopify menu
  const menuItems = sanityHeader?.menu?.map(item => {
      let url = item.url || '#';
      if (item.type === 'collection' && item.collectionHandle) {
         url = `/collections/${item.collectionHandle}`;
      } else if (item.type === 'collections') {
         url = `/collections`;
      } else if (item.type === 'faq') {
         url = `/pages/faq`; 
      } else if (item.type === 'about') {
         url = `/pages/about`;
      }
      
      return {
          title: item.title,
          url: url
      };
  }) || menu?.items || [];

  // Convert menu items to the format needed by NavItems
  const navItems = menuItems.map((item) => {
    const url =
      item.url?.includes('myshopify.com') ||
      item.url?.includes(publicStoreDomain) ||
      item.url?.includes(header.shop.primaryDomain.url)
        ? new URL(item.url).pathname
        : item.url || '#';

    return {
      name: item.title,
      link: url,
    };
  });

  const logoUrl = sanityHeader?.logo?.asset?.url;

  return (
    <Navbar className="fixed top-0">
      {/* Desktop Navigation */}
      <NavBody>
        <NavLink prefetch="intent" to="/" className="relative z-20 flex items-center space-x-2 px-2 py-1">
          {logoUrl ? (
             <img src={logoUrl} alt={shop.name} className="h-8 object-contain" />
          ) : (
             <span className="font-bold text-black dark:text-white">{shop.name}</span>
          )}
        </NavLink>
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavLink prefetch="intent" to="/" className="relative z-20 flex items-center space-x-2 px-2 py-1">
             {logoUrl ? (
                 <img src={logoUrl} alt={shop.name} className="h-8 object-contain" />
              ) : (
                 <span className="font-bold text-black dark:text-white">{shop.name}</span>
              )}
          </NavLink>
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-neutral-600 dark:text-neutral-300"
            >
              {item.name}
            </a>
          ))}
          <div className="border-t border-gray-200 dark:border-neutral-800 pt-4 w-full">
            <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}

function HeaderCtas({isLoggedIn, cart}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <div className="flex items-center gap-4">
      <NavLink
        prefetch="intent"
        to="/account"
        className="flex items-center gap-1.5 text-sm text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white"
      >
        <UserIcon className="w-5 h-5" />
        <Suspense fallback="Sign Up">
          <Await resolve={isLoggedIn} errorElement="Sign Up">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign Up')}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </div>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button
      className="flex items-center gap-1.5 text-sm text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white"
      onClick={() => open('search')}
    >
      <MagnifyingGlassIcon className="w-5 h-5" />
      <span>Search</span>
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      className="flex items-center gap-1.5 text-sm text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white relative"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
    >
      <div className="relative">
        <ShoppingCartIcon className="w-5 h-5" />
        {count !== null && count > 0 && (
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {count}
          </span>
        )}
      </div>
      <span>Cart</span>
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}
