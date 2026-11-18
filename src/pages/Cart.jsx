import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, totalCount } = useCart();

  return (
    <div className="bg-brand-cream min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        <header className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-brand-red font-sans font-medium mb-2">
            Order Review
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-normal">
            Your Boutique Bag
          </h1>
          <div className="w-12 h-[1px] bg-brand-border mx-auto my-4"></div>
          <span className="text-xs text-brand-stone font-sans">
            {totalCount} {totalCount === 1 ? 'item selected' : 'items selected'}
          </span>
        </header>

        {cartItems.length === 0 ? (
          <div className="bg-white border border-brand-border p-12 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-brand-cream flex items-center justify-center text-brand-stone">
              <svg className="w-8 h-8 stroke-[1.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            
            <h3 className="font-serif text-2xl text-brand-charcoal">
              Your shopping bag is currently empty
            </h3>
            
            <p className="text-sm text-brand-stone max-w-md mx-auto font-sans leading-relaxed">
              Explore our curated handloom sarees, bespoke tailored blouses, and lightweight summer kurtis.
            </p>

            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-block bg-brand-red hover:bg-brand-red-hover text-brand-cream border border-brand-red px-8 py-3.5 text-xs font-sans font-medium tracking-[0.16em] uppercase transition-all duration-300"
              >
                Explore Boutique Collection
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Items Column */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="bg-white border border-brand-border p-6 flex gap-6 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-28 object-cover object-center bg-brand-cream-warm flex-shrink-0"
                  />
                  
                  <div className="flex-1 flex flex-col justify-between h-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-lg text-brand-charcoal font-medium">
                          {item.title}
                        </h3>
                        <p className="text-xs text-brand-stone font-sans mt-1">
                          {item.color} &bull; {item.size}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="text-brand-stone hover:text-brand-red text-xs transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <svg className="w-4 h-4 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <div className="flex items-center border border-brand-border">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-xs text-brand-stone hover:text-brand-charcoal hover:bg-brand-cream transition-colors"
                        >
                          -
                        </button>
                        <span className="w-10 text-center text-xs font-sans font-medium text-brand-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-xs text-brand-stone hover:text-brand-charcoal hover:bg-brand-cream transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-sans text-base text-brand-charcoal font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-4 bg-white border border-brand-border p-6 sm:p-8 space-y-6">
              <h3 className="font-serif text-xl text-brand-charcoal font-medium pb-4 border-b border-brand-border">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs text-brand-stone font-sans">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-brand-charcoal font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-brand-red font-medium">Complimentary</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-brand-border text-sm font-medium text-brand-charcoal">
                  <span className="font-serif text-base">Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-3 bg-brand-cream border border-brand-border text-[11px] text-brand-stone leading-relaxed">
                Eligible for Cash on Delivery nationwide. Inspected & packed by master artisans.
              </div>

              <Link
                to="/checkout"
                className="block w-full py-4 text-center bg-brand-red hover:bg-brand-red-hover text-brand-cream border border-brand-red text-xs font-sans font-medium tracking-[0.16em] uppercase transition-all duration-300"
              >
                Proceed to Checkout
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
