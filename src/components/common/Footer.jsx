import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-cream border-t border-brand-border mt-24 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-brand-border">
          
          {/* Brand Philosophy */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-serif text-2xl tracking-widest uppercase text-brand-red">
              Tero Parbon
            </h3>
            <p className="text-sm text-brand-stone font-sans max-w-md leading-relaxed">
              Curated ethnic luxury celebrating Bengal's artisanal heritage. Handwoven Jamdani sarees, bespoke zardozi blouses, and timeless linen kurtis designed with minimalist elegance.
            </p>
            <div className="pt-2 text-xs tracking-widest uppercase text-brand-stone font-sans">
              Dhaka &bull; Kolkata &bull; Worldwide Delivery
            </div>
          </div>

          {/* Boutique Navigation */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-widest text-brand-charcoal font-semibold">
              Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-stone">
              <li>
                <Link to="/shop?category=sarees" className="hover:text-brand-red transition-colors">
                  Handloom Sarees
                </Link>
              </li>
              <li>
                <Link to="/shop?category=kurtis" className="hover:text-brand-red transition-colors">
                  Artisanal Kurtis
                </Link>
              </li>
              <li>
                <Link to="/shop?category=blouses" className="hover:text-brand-red transition-colors">
                  Bespoke Blouses
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-brand-red transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Boutique Service */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-widest text-brand-charcoal font-semibold">
              Boutique Care
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-stone">
              <li>
                <span className="hover:text-brand-red transition-colors cursor-pointer">
                  Textile & Sizing Guide
                </span>
              </li>
              <li>
                <span className="hover:text-brand-red transition-colors cursor-pointer">
                  Cash on Delivery & Shipping
                </span>
              </li>
              <li>
                <span className="hover:text-brand-red transition-colors cursor-pointer">
                  Artisan Care Instructions
                </span>
              </li>
              <li>
                <span className="hover:text-brand-red transition-colors cursor-pointer">
                  Private Appointments
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-stone font-sans gap-4">
          <p>&copy; {new Date().getFullYear()} Tero Parbon. All rights reserved.</p>
          <p className="tracking-wide">
            Minimalist Elegance &bull; High Whitespace &bull; Handcrafted Quality
          </p>
        </div>
      </div>
    </footer>
  );
}
