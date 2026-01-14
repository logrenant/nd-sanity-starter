import {Suspense, type ReactNode} from 'react';
import {Await, Link} from 'react-router';
import {motion} from 'framer-motion';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import type {SanityFooter} from '~/lib/sanity-types';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  sanityFooter?: Promise<SanityFooter | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

function getLinkUrl(link: any) {
  switch (link.type) {
    case 'faq':
      return '/pages/faq';
    case 'about':
      return '/pages/about';
    case 'collections':
      return '/collections';
    case 'collection':
      return `/collections/${link.collectionHandle}`;
    case 'custom':
    default:
      return link.url || '#';
  }
}

function FooterShell({children}: {children: ReactNode}) {
  return (
    <motion.footer
      initial={{opacity: 0, y: 12}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 0.6, ease: 'easeOut'}}
      viewport={{once: true, amount: 0.2}}
      className="mt-auto w-full border-t border-neutral-200 bg-[#f7f7f7] text-neutral-900"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-24">
        {children}
      </div>
    </motion.footer>
  );
}

export function Footer({
  footer: footerPromise,
  sanityFooter: sanityFooterPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <Suspense fallback={<div className="bg-black h-20" />}>
      <Await resolve={sanityFooterPromise}>
        {(sanityFooter) => {
          if (!sanityFooter) {
            // Fallback to Shopify footer if Sanity footer is not available
            return (
              <Await resolve={footerPromise}>
                {(footer) => (
                  <FooterShell>
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                      {footer?.menu && header.shop.primaryDomain?.url && (
                        <FooterMenu
                          menu={footer.menu}
                          primaryDomainUrl={header.shop.primaryDomain.url}
                          publicStoreDomain={publicStoreDomain}
                          className="flex flex-wrap gap-4"
                        />
                      )}
                      <div className="text-xs text-neutral-500">
                        &copy; {year}. All rights reserved.
                      </div>
                    </div>
                  </FooterShell>
                )}
              </Await>
            );
          }

          const {logo, usefulLinks, support, newsletter} = sanityFooter;
          const logoUrl = logo?.asset?.url;

          return (
            <FooterShell>
              <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Footer Logo"
                    className="h-10 w-auto object-contain md:h-12"
                  />
                ) : null}
                <div className="flex w-full flex-col gap-10 md:flex-row md:justify-end md:gap-12">
                  {usefulLinks ? (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                        {usefulLinks.groupTitle}
                      </h3>
                      <ul className="mt-4 space-y-3 text-sm">
                        {usefulLinks.links?.map((link, index) => (
                          <li key={index}>
                            <Link
                              to={getLinkUrl(link)}
                              className="group relative inline-block text-neutral-600 transition-colors hover:text-neutral-900"
                            >
                              {link.title}
                              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neutral-900 transition-all duration-300 group-hover:w-full" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {support ? (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                        {support.groupTitle}
                      </h3>
                      <ul className="mt-4 space-y-3 text-sm">
                        {support.links?.map((link, index) => (
                          <li key={index}>
                            <Link
                              to={getLinkUrl(link)}
                              className="group relative inline-block text-neutral-600 transition-colors hover:text-neutral-900"
                            >
                              {link.title}
                              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neutral-900 transition-all duration-300 group-hover:w-full" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {newsletter ? (
                    <div className="max-w-sm">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                        {newsletter.title}
                      </h3>
                      <p className="mt-3 text-sm text-neutral-600">
                        {newsletter.description}
                      </p>
                      <form
                        className="mt-4 flex flex-col gap-3 sm:flex-row"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <label className="sr-only" htmlFor="footer-email">
                          Email
                        </label>
                        <input
                          id="footer-email"
                          type="email"
                          autoComplete="email"
                          placeholder={newsletter.placeholder}
                          className="w-full flex-1 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-neutral-500 focus:outline-none"
                        />
                        <motion.button
                          type="submit"
                          className="group relative px-5 py-2 text-sm font-semibold text-white overflow-hidden rounded-full"
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <div className="absolute inset-0 bg-neutral-900 rounded-full transition-all duration-300 group-hover:bg-neutral-800" />
                          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                          </div>
                          <span className="relative z-10">Subscribe</span>
                        </motion.button>
                      </form>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mt-10 border-t border-neutral-200 pt-6 text-xs text-neutral-500">
                &copy; {year}. All rights reserved.
              </div>
            </FooterShell>
          );
        }}
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
  className,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
  className?: string;
}) {
  const navClassName = className || 'flex flex-wrap gap-4';
  const itemClassName =
    'text-sm text-neutral-600 transition-colors hover:text-neutral-900';

  return (
    <nav className={navClassName} role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a
            href={url}
            key={item.id}
            rel="noopener noreferrer"
            target="_blank"
            className={itemClassName}
          >
            {item.title}
          </a>
        ) : (
          <Link
            key={item.id}
            to={url}
            className={itemClassName}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
