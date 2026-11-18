import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const { totalCount, openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinkClasses = ({ isActive }) =>
    `text-xs uppercase tracking-boutique transition-colors duration-200 py-1 border-b ${
      isActive
        ? 'text-brand-red border-brand-red font-semibold'
        : 'text-brand-stone hover:text-brand-charcoal border-transparent'
    }`;

  const mobileNavLinkClasses = ({ isActive }) =>
    `block py-3 px-4 text-xs uppercase tracking-[0.16em] transition-colors border-l-2 ${
      isActive
        ? 'border-brand-red bg-brand-red-soft text-brand-red font-semibold'
        : 'border-transparent text-brand-charcoal hover:bg-brand-cream-warm hover:text-brand-red'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-brand-cream/95 backdrop-blur-sm border-b border-brand-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Name on the Left */}
        <div className="flex items-center">
          <Link to="/" onClick={closeMobileMenu} className="group flex flex-col">
            <span className="font-serif text-xl sm:text-2xl lg:text-3xl tracking-widest uppercase text-brand-red font-medium transition-colors group-hover:text-brand-red-hover">
              Tero Parbon
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-brand-stone -mt-0.5 sm:-mt-1 font-sans">
              Boutique Heritage
            </span>
          </Link>
        </div>

        {/* Minimalist Desktop Navigation (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
          <NavLink to="/" className={navLinkClasses} end>
            Home
          </NavLink>
          <NavLink to="/shop?category=sarees" className={navLinkClasses}>
            Sarees
          </NavLink>
          <NavLink to="/shop?category=kurtis" className={navLinkClasses}>
            Kurtis
          </NavLink>
          <NavLink to="/shop?category=blouses" className={navLinkClasses}>
            Blouses
          </NavLink>
          <NavLink to="/shop" className={navLinkClasses}>
            Collection
          </NavLink>
        </nav>

        {/* Right Actions: Admin Link, Cart, & Mobile Hamburger */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          {/* Desktop Admin Portal Shortcut */}
          <Link
            to="/admin"
            className="text-[11px] uppercase tracking-wider text-brand-stone hover:text-brand-red font-sans transition-colors border border-brand-border px-2.5 py-1 hidden sm:inline-block hover:border-brand-red"
            title="Private Atelier Admin Portal"
          >
            Admin
          </Link>

          {/* Cart Trigger */}
          <button
            type="button"
            onClick={openCart}
            className="group relative flex items-center space-x-1.5 sm:space-x-2 text-brand-charcoal hover:text-brand-red transition-colors duration-200 py-2 focus:outline-none"
            aria-label={`Open Shopping Bag with ${totalCount} items`}
          >
            <svg
              className="w-5 h-5 text-brand-charcoal group-hover:text-brand-red transition-colors duration-200 stroke-[1.5]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            
            <span className="hidden xs:inline-block text-xs uppercase tracking-wider font-medium text-brand-stone group-hover:text-brand-charcoal transition-colors">
              Bag
            </span>

            {/* Counter Badge */}
            <span className="inline-flex items-center justify-center text-[10px] font-sans font-medium text-brand-red bg-brand-red-soft px-1.5 py-0.5 border border-brand-red/20 min-w-[20px] text-center">
              {totalCount}
            </span>
          </button>

          {/* Mobile Hamburger Menu Button (Visible on mobile only) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-brand-charcoal hover:text-brand-red transition-colors md:hidden focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-cream border-b border-brand-border px-4 py-4 space-y-1 shadow-sm transition-all duration-200">
          <NavLink to="/" className={mobileNavLinkClasses} onClick={closeMobileMenu} end>
            Home
          </NavLink>
          <NavLink to="/shop?category=sarees" className={mobileNavLinkClasses} onClick={closeMobileMenu}>
            Sarees
          </NavLink>
          <NavLink to="/shop?category=kurtis" className={mobileNavLinkClasses} onClick={closeMobileMenu}>
            Kurtis
          </NavLink>
          <NavLink to="/shop?category=blouses" className={mobileNavLinkClasses} onClick={closeMobileMenu}>
            Blouses
          </NavLink>
          <NavLink to="/shop" className={mobileNavLinkClasses} onClick={closeMobileMenu}>
            All Collections
          </NavLink>
          
          <div className="pt-3 mt-2 border-t border-brand-border/60 flex items-center justify-between px-4">
            <span className="text-[10px] uppercase tracking-widest text-brand-stone font-sans">
              Administration
            </span>
            <Link
              to="/admin"
              onClick={closeMobileMenu}
              className="text-xs uppercase tracking-wider text-brand-red border border-brand-red/30 px-3 py-1 font-medium bg-brand-red-soft"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
