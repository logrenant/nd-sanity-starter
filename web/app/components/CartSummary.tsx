import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {CartLayout} from '~/components/CartMain';
import {CartForm, Money, type OptimisticCart} from '@shopify/hydrogen';
import {useEffect, useRef} from 'react';
import {useFetcher} from 'react-router';
import {motion} from 'framer-motion';
import type {FetcherWithComponents} from 'react-router';

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};

export function CartSummary({cart, layout}: CartSummaryProps) {
  const className =
    layout === 'page'
      ? 'relative'
      : 'backdrop-blur-[10px] border-t border-white/30 bg-white/5 px-6 py-4 text-sm shrink-0 w-full';

  return (
    <motion.div 
      aria-labelledby="cart-summary" 
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h4 className="mb-4 mt-0 text-xs font-bold uppercase tracking-widest text-neutral-900 opacity-60">
        Order Summary
      </h4>
      <div className="space-y-3">
        <dl className="flex items-center justify-between text-sm">
          <dt className="font-medium text-neutral-700">Subtotal</dt>
          <dd className="font-semibold text-neutral-900 m-0">
            {cart?.cost?.subtotalAmount?.amount ? (
              <Money data={cart?.cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </dd>
        </dl>
        <CartDiscounts discountCodes={cart?.discountCodes} />
        <CartGiftCard giftCardCodes={cart?.appliedGiftCards} />
        <div className="border-t border-white/20 pt-3">
          <dl className="flex items-center justify-between text-base">
            <dt className="font-bold text-neutral-900">Total</dt>
            <dd className="font-bold text-neutral-900 m-0">
              {cart?.cost?.totalAmount?.amount ? (
                <Money data={cart?.cost?.totalAmount} />
              ) : (
                '-'
              )}
            </dd>
          </dl>
        </div>
      </div>
      <CartCheckoutActions checkoutUrl={cart?.checkoutUrl} />
    </motion.div>
  );
}

function CartCheckoutActions({checkoutUrl}: {checkoutUrl?: string}) {
  if (!checkoutUrl) return null;

  return (
    <div className="mt-4">
      <motion.a
        href={checkoutUrl}
        target="_self"
        className="group relative block text-center px-5 py-3 bg-neutral-900 text-white no-underline rounded-lg font-semibold transition-all duration-300 text-sm overflow-hidden"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </div>
        <p className="m-0 relative z-10">Proceed to Checkout →</p>
      </motion.a>
    </div>
  );
}

function CartDiscounts({
  discountCodes,
}: {
  discountCodes?: CartApiQueryFragment['discountCodes'];
}) {
  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <div>
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length}>
        <div className="flex gap-2 items-center bg-green-50/50 border border-green-200/50 rounded-lg p-2">
          <dt className="text-xs font-semibold text-green-900">Applied:</dt>
          <UpdateDiscountForm>
            <div className="flex gap-2 items-center flex-1">
              <code className="flex-1 text-[12px] font-mono text-green-700">{codes?.join(', ')}</code>
              <motion.button
                className="px-3 py-1 bg-green-900/20 hover:bg-green-900/30 text-green-900 border border-green-200 rounded text-xs font-medium transition-colors shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Remove
              </motion.button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            name="discountCode"
            placeholder="Discount code"
            className="px-3 py-2 border border-neutral-300 rounded-lg flex-1 text-sm min-w-0 bg-white/80 focus:bg-white focus:border-neutral-500 outline-none transition-all"
          />
          <motion.button
            type="submit"
            className="px-4 py-2 bg-neutral-900/80 hover:bg-neutral-900 text-white border border-neutral-800 rounded-lg font-medium text-sm whitespace-nowrap transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply
          </motion.button>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}

function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

function CartGiftCard({
  giftCardCodes,
}: {
  giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
}) {
  const appliedGiftCardCodes = useRef<string[]>([]);
  const giftCardCodeInput = useRef<HTMLInputElement>(null);
  const giftCardAddFetcher = useFetcher({key: 'gift-card-add'});

  // Clear the gift card code input after the gift card is added
  useEffect(() => {
    if (giftCardAddFetcher.data) {
      giftCardCodeInput.current!.value = '';
    }
  }, [giftCardAddFetcher.data]);

  function saveAppliedCode(code: string) {
    const formattedCode = code.replace(/\s/g, ''); // Remove spaces
    if (!appliedGiftCardCodes.current.includes(formattedCode)) {
      appliedGiftCardCodes.current.push(formattedCode);
    }
  }

  return (
    <div className="mt-3">
      {/* Display applied gift cards with individual remove buttons */}
      {giftCardCodes && giftCardCodes.length > 0 && (
        <dl>
          <dt>Applied Gift Card(s)</dt>
          {giftCardCodes.map((giftCard) => (
            <RemoveGiftCardForm key={giftCard.id} giftCardId={giftCard.id}>
              <div className="flex gap-2 items-center">
                <code className="flex-1 text-[13px]">***{giftCard.lastCharacters}</code>
                &nbsp;
                <Money data={giftCard.amountUsed} />
                &nbsp;
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white border-none rounded cursor-pointer font-medium transition-opacity duration-200 text-sm whitespace-nowrap shrink-0 hover:opacity-90"
                >
                  Remove
                </button>
              </div>
            </RemoveGiftCardForm>
          ))}
        </dl>
      )}

      {/* Show an input to apply a gift card */}
      <UpdateGiftCardForm
        giftCardCodes={appliedGiftCardCodes.current}
        saveAppliedCode={saveAppliedCode}
        fetcherKey="gift-card-add"
      >
        <div className="flex gap-2 items-center">
          <input
            type="text"
            name="giftCardCode"
            placeholder="Gift card code"
            ref={giftCardCodeInput}
            className="px-3 py-2 border border-neutral-300 rounded-lg flex-1 text-sm min-w-0 bg-white/80 focus:bg-white focus:border-neutral-500 outline-none transition-all"
          />
          <motion.button
            type="submit"
            disabled={giftCardAddFetcher.state !== 'idle'}
            className="px-4 py-2 bg-neutral-900/80 hover:bg-neutral-900 text-white border border-neutral-800 rounded-lg font-medium text-sm whitespace-nowrap transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply
          </motion.button>
        </div>
      </UpdateGiftCardForm>
    </div>
  );
}

function UpdateGiftCardForm({
  giftCardCodes,
  saveAppliedCode,
  fetcherKey,
  children,
}: {
  giftCardCodes?: string[];
  saveAppliedCode?: (code: string) => void;
  fetcherKey?: string;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      fetcherKey={fetcherKey}
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesUpdate}
      inputs={{
        giftCardCodes: giftCardCodes || [],
      }}
    >
      {(fetcher: FetcherWithComponents<any>) => {
        const code = fetcher.formData?.get('giftCardCode');
        if (code && saveAppliedCode) {
          saveAppliedCode(code as string);
        }
        return children;
      }}
    </CartForm>
  );
}

function RemoveGiftCardForm({
  giftCardId,
  children,
}: {
  giftCardId: string;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesRemove}
      inputs={{
        giftCardCodes: [giftCardId],
      }}
    >
      {children}
    </CartForm>
  );
}
