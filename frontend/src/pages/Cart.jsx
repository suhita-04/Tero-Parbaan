import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage, toBengaliNumerals } from '../context/LanguageContext';
import { useStoreSettings } from '../context/StoreSettingsContext';
import ProductMedia from '../components/product/ProductMedia';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, totalCount } = useCart();
  const { t, formatPrice, getLocalizedField, language } = useLanguage();
  const { storeSettings } = useStoreSettings();

  const countDisplay = language === 'bn' ? toBengaliNumerals(totalCount) : totalCount;

  return (
    <div className="bg-brand-ivory min-h-screen py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        <header className="text-center mb-10 sm:mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-brand-crimson font-sans font-medium mb-2">
            {t('atelier_collection')}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-normal">
            {t('cart_title')}
          </h1>
          <div className="w-12 h-[1px] bg-brand-border-gold mx-auto my-4"></div>
          <span className="text-xs text-brand-stone font-sans">
            {countDisplay} {totalCount === 1 ? t('cart_item_single') : t('cart_item_plural')}
          </span>
        </header>

        {cartItems.length === 0 ? (
          <div className="bg-white border border-brand-border p-8 sm:p-14 text-center space-y-6 shadow-gold-subtle">
            <div className="w-16 h-16 mx-auto rounded-full bg-brand-ivory border border-brand-border-gold flex items-center justify-center text-brand-stone">
              <svg className="w-8 h-8 stroke-[1.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            
            <h3 className="font-serif text-2xl text-brand-charcoal font-medium">
              {t('cart_empty_title')}
            </h3>
            
            <p className="text-sm text-brand-stone max-w-md mx-auto font-sans leading-relaxed">
              {t('cart_empty_desc')}
            </p>

            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-block bg-brand-crimson hover:bg-brand-crimson-hover text-brand-ivory border border-brand-crimson px-8 py-3.5 text-xs font-sans font-medium tracking-[0.16em] uppercase transition-all duration-300 shadow-sm"
              >
                {t('cart_continue_browsing')}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Items Column */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => {
                const itemTitle = getLocalizedField(item.title, 'Handcrafted Garment');
                const itemQtyDisplay = language === 'bn' ? toBengaliNumerals(item.quantity) : item.quantity;

                return (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="bg-white border border-brand-border p-4 sm:p-6 flex gap-4 sm:gap-6 items-center shadow-gold-subtle hover:border-brand-border-gold transition-colors"
                  >
                    <ProductMedia
                      item={item}
                      alt={itemTitle}
                      className="w-20 h-24 sm:w-24 sm:h-28 object-cover object-center bg-brand-ivory-warm flex-shrink-0"
                    />
                    
                    <div className="flex-1 flex flex-col justify-between h-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-serif text-base sm:text-lg text-brand-charcoal font-medium">
                            {itemTitle}
                          </h3>
                          <p className="text-xs text-brand-stone font-sans mt-0.5">
                            {item.color} {item.size ? `• ${item.size}` : ''}
                          </p>
                        </div>
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

                      <div className="flex justify-between items-center mt-5">
                        <div className="flex items-center border border-brand-border">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-xs text-brand-stone hover:text-brand-charcoal hover:bg-brand-ivory transition-colors"
                          >
                            -
                          </button>
                          <span className="w-10 text-center text-xs font-sans font-medium text-brand-charcoal">
                            {itemQtyDisplay}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-xs text-brand-stone hover:text-brand-charcoal hover:bg-brand-ivory transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-sans text-sm sm:text-base font-semibold text-brand-crimson">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-4 bg-white border border-brand-border p-6 space-y-5 shadow-gold-subtle">
              <h3 className="font-serif text-xl text-brand-charcoal font-medium">
                {t('checkout_order_summary')}
              </h3>

              <div className="space-y-3 text-xs font-sans">
                <div className="flex justify-between text-brand-stone">
                  <span>{t('checkout_item_total')}</span>
                  <span className="font-medium text-brand-charcoal">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-brand-stone pb-2 border-b border-brand-border">
                  <span>{t('checkout_delivery_fee')}</span>
                  <span className="text-brand-charcoal">
                    ৳ {storeSettings.dhaka_delivery} - ৳ {storeSettings.outside_dhaka_delivery}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-sm font-medium text-brand-charcoal">{t('checkout_grand_total')}</span>
                  <span className="text-lg font-bold text-brand-crimson">{formatPrice(totalPrice)}*</span>
                </div>
                <p className="text-[10px] text-brand-stone italic leading-tight">
                  * Delivery fee calculated at checkout based on location.
                </p>
              </div>

              <Link
                to="/checkout"
                className="w-full py-3.5 bg-brand-crimson hover:bg-brand-crimson-hover text-brand-ivory border border-brand-crimson text-xs uppercase tracking-[0.16em] font-sans font-medium transition-all duration-300 block text-center shadow-sm"
              >
                {t('cart_proceed_checkout')}
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
