import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

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

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40 transition-opacity duration-300 ease-in-out ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel: Full width on mobile (w-full), standard sidebar on desktop (md:w-96) */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full md:w-96 bg-brand-cream border-l border-brand-border flex flex-col transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Shopping Bag Drawer"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 border-b border-brand-border flex items-center justify-between bg-brand-cream">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
              Shopping Bag
            </h2>
            <span className="text-[10px] uppercase tracking-widest text-brand-stone font-sans">
              {totalCount} {totalCount === 1 ? 'Handcrafted Item' : 'Handcrafted Items'}
            </span>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="p-2 text-brand-stone hover:text-brand-red transition-colors"
            aria-label="Close Shopping Bag"
          >
            <svg className="w-5 h-5 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Body / Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-white border border-brand-border flex items-center justify-center text-brand-stone">
                <svg className="w-6 h-6 stroke-[1.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="font-serif text-lg sm:text-xl text-brand-charcoal">
                Your bag is currently empty
              </p>
              <p className="text-xs text-brand-stone font-sans max-w-xs leading-relaxed">
                Explore our curated handloom sarees, bespoke blouses, and artisanal kurtis.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 text-xs uppercase tracking-widest font-sans font-medium text-brand-charcoal border border-brand-border hover:border-brand-red hover:text-brand-red transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-white border border-brand-border transition-colors hover:border-brand-border/80"
              >
                {/* Item Thumbnail */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-20 sm:w-20 sm:h-24 object-cover object-center bg-brand-cream-warm flex-shrink-0"
                />

                {/* Item Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-serif text-sm sm:text-base text-brand-charcoal font-medium line-clamp-1">
                        {item.title}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="text-brand-stone hover:text-brand-red text-xs transition-colors p-0.5"
                        aria-label={`Remove ${item.title}`}
                      >
                        <svg className="w-4 h-4 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <p className="text-[10px] sm:text-[11px] text-brand-stone font-sans mt-0.5">
                      {item.color} &bull; {item.size}
                    </p>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-brand-border/60">
                    <div className="flex items-center border border-brand-border">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-brand-stone hover:text-brand-charcoal hover:bg-brand-cream transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-xs font-sans font-medium text-brand-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-brand-stone hover:text-brand-charcoal hover:bg-brand-cream transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-sans text-xs sm:text-sm text-brand-charcoal font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer (Subtotal & Checkout) */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-brand-border bg-brand-cream space-y-3 sm:space-y-4">
            <div className="space-y-1.5 text-xs text-brand-stone font-sans">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-brand-charcoal font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-brand-red font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-brand-border text-sm font-medium text-brand-charcoal">
                <span className="font-serif text-base">Estimated Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-[10px] sm:text-[11px] text-brand-stone/90 text-center font-sans">
              Cash on Delivery verified upon dispatch
            </p>

            <Link
              to="/checkout"
              onClick={closeCart}
              className="block w-full py-3.5 sm:py-4 text-center bg-brand-red hover:bg-brand-red-hover text-brand-cream border border-brand-red text-xs font-sans font-medium tracking-[0.16em] uppercase transition-all duration-300"
            >
              Proceed to Checkout (${totalPrice.toFixed(2)})
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
