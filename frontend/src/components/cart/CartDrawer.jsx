import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLanguage, toBengaliNumerals } from '../../context/LanguageContext';
import ProductMedia from '../product/ProductMedia';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalCount,
    totalPrice,
  } = useCart();

  const { t, formatPrice, getLocalizedField, language } = useLanguage();

  // Prevent background body scrolling when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const countDisplay = language === 'bn' ? toBengaliNumerals(totalCount) : totalCount;

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 transition-opacity duration-300 ease-in-out ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel: Full width on mobile (w-full), standard on desktop (md:w-96) */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full md:w-96 bg-brand-ivory border-l border-brand-border flex flex-col transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Shopping Bag Drawer"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 border-b border-brand-border flex items-center justify-between bg-brand-ivory">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
              {t('cart_title')}
            </h2>
            <span className="text-[10px] uppercase tracking-widest text-brand-stone font-sans">
              {countDisplay} {totalCount === 1 ? t('cart_item_single') : t('cart_item_plural')}
            </span>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="p-2 text-brand-stone hover:text-brand-crimson transition-colors"
            aria-label="Close Shopping Bag"
          >
            <svg className="w-5 h-5 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Body / Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-white border border-brand-border-gold flex items-center justify-center text-brand-stone">
                <svg className="w-6 h-6 stroke-[1.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="font-serif text-lg sm:text-xl text-brand-charcoal font-medium">
                {t('cart_empty_title')}
              </p>
              <p className="text-xs text-brand-stone font-sans max-w-xs leading-relaxed">
                {t('cart_empty_desc')}
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 text-xs uppercase tracking-widest font-sans font-medium text-brand-charcoal border border-brand-border hover:border-brand-crimson hover:text-brand-crimson transition-colors bg-white"
              >
                {t('cart_continue_browsing')}
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const itemTitle = getLocalizedField(item.title, 'Handcrafted Item');
              const itemQtyDisplay = language === 'bn' ? toBengaliNumerals(item.quantity) : item.quantity;

              return (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-white border border-brand-border transition-colors hover:border-brand-border-gold"
                >
                  {/* Item Thumbnail */}
                  <ProductMedia
                    item={item}
                    alt={itemTitle}
                    className="w-16 h-20 sm:w-20 sm:h-24 object-cover object-center bg-brand-ivory-warm flex-shrink-0"
                  />

                  {/* Item Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm sm:text-base text-brand-charcoal font-medium line-clamp-1">
                          {itemTitle}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.size, item.color)}
                          className="text-brand-stone hover:text-brand-crimson text-xs transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <svg className="w-4 h-4 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <p className="text-[11px] text-brand-stone font-sans mt-0.5">
                        {item.size ? `${item.size}` : ''} {item.color ? `• ${item.color}` : ''}
                      </p>
                      
                      <p className="text-xs font-sans text-brand-charcoal font-medium mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-brand-border/60">
                      <div className="flex items-center border border-brand-border">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-brand-stone hover:text-brand-charcoal hover:bg-brand-ivory transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-sans font-medium text-brand-charcoal">
                          {itemQtyDisplay}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-brand-stone hover:text-brand-charcoal hover:bg-brand-ivory transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-sans font-semibold text-brand-crimson">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer / Subtotal & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-brand-border bg-white space-y-3 sm:space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-wider text-brand-stone font-sans">
                {t('cart_subtotal')}
              </span>
              <span className="font-sans text-lg sm:text-xl font-bold text-brand-charcoal">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <p className="text-[11px] text-brand-stone font-sans leading-relaxed">
              {t('cart_shipping_note')}
            </p>

            <Link
              to="/checkout"
              onClick={closeCart}
              className="w-full py-3.5 bg-brand-crimson hover:bg-brand-crimson-hover text-brand-ivory border border-brand-crimson text-xs uppercase tracking-[0.16em] font-sans font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm"
            >
              <span>{t('cart_proceed_checkout')}</span>
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
