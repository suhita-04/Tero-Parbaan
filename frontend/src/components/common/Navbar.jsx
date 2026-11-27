import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLanguage, toBengaliNumerals } from '../../context/LanguageContext';
import CustomerAuthModal from '../auth/CustomerAuthModal';

export default function Navbar() {
  const { totalCount, totalPrice, openCart } = useCart();
  const { language, setLanguage, t, formatPrice } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation & dropdown states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [customerUser, setCustomerUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync customer user state with localStorage & custom events
  useEffect(() => {
    const loadCustomer = () => {
      try {
        const saved = localStorage.getItem('tp_customer');
        setCustomerUser(saved ? JSON.parse(saved) : null);
      } catch (err) {
        console.error('Failed to parse customer storage', err);
        setCustomerUser(null);
      }
    };

    loadCustomer();
    window.addEventListener('tp_customer_change', loadCustomer);
    return () => window.removeEventListener('tp_customer_change', loadCustomer);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCategoryDropdownOpen(false);
  }, [location.pathname, location.search]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileCategoryOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      closeMobileMenu();
    }
  };

  const handleContactClick = (e) => {
    e?.preventDefault();
    closeMobileMenu();

    const targetEl = document.getElementById('footer-contact');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('footer-contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  // Dynamic styling for nav links
  const navLinkClasses = ({ isActive }) =>
    `whitespace-nowrap text-xs uppercase tracking-boutique transition-all duration-200 py-1.5 border-b ${
      isActive
        ? 'text-[#B91C1C] border-[#B91C1C] font-semibold'
        : 'text-brand-stone hover:text-[#B91C1C] hover:border-[#B91C1C] border-transparent'
    }`;

  const isCategoryActive = location.pathname === '/shop' && !location.search.includes('search');

  return (
    <>
      {/* 1. Top Announcement Bar (above Navbar) */}
      <div className="bg-[#1A1A1A] text-[#FAF8F5] text-xs py-1.5 px-4 sm:px-8 border-b border-[#C5A059]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left/Center Notice: "Dhaka Boutique Showroom • Nationwide Delivery" */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C] animate-pulse"></span>
            <p className="text-[10px] sm:text-[11.5px] tracking-[0.16em] sm:tracking-[0.20em] uppercase font-sans text-[#FAF8F5]/90">
              {t('announcement_showroom')}
            </p>
          </div>

          {/* Right: Clean Instagram and Facebook Icon Links */}
          <div className="flex items-center space-x-3 text-[#FAF8F5]/80">
            {/* Instagram Link */}
            <a
              href="#" /* Replace with real Instagram URL, e.g. https://instagram.com/tero_parbon3 */
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="hover:text-[#C5A059] transition-colors p-0.5"
              title="Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Facebook Link */}
            <a
              href="#" /* Replace with real Facebook URL, e.g. https://facebook.com/teroparbon */
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Page"
              className="hover:text-[#C5A059] transition-colors p-0.5"
              title="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Minimalist Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-border transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Left: Brand Emblem & Title */}
          <div className="flex items-center shrink-0">
            <Link to="/" onClick={closeMobileMenu} className="group flex items-center space-x-2.5 sm:space-x-3">
              {/* Circular Crimson & Jet Black Brand Emblem */}
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-brand-black border-2 border-brand-crimson p-0.5 flex items-center justify-center relative overflow-hidden shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full border border-brand-gold/60 flex flex-col items-center justify-center bg-gradient-to-br from-brand-crimson via-brand-black to-brand-black text-white text-center leading-none">
                  <span className="font-bengali text-[8px] sm:text-[9px] font-bold text-brand-gold-light tracking-tighter">তেরো</span>
                  <span className="font-bengali text-[7px] sm:text-[7.5px] text-white tracking-tight -mt-0.5">পার্বণ</span>
                </div>
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col text-left">
                <span className="font-serif text-lg sm:text-2xl lg:text-[25px] tracking-widest uppercase text-brand-crimson font-medium leading-none group-hover:text-brand-crimson-hover transition-colors">
                  {t('brand_name')}
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] tracking-[0.28em] uppercase text-brand-stone font-sans mt-0.5 sm:mt-1">
                  {t('brand_subtitle')}
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Exact Navigation Links (Home, Category Dropdown, Customer Reviews, About Us, Contact Us) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
            
            {/* 1) Home */}
            <NavLink to="/" className={navLinkClasses} end>
              {t('nav_home')}
            </NavLink>

            {/* 2) Category (Hover & Click Dropdown) */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
              onMouseLeave={() => setIsCategoryDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className={`whitespace-nowrap flex items-center gap-1 text-xs uppercase tracking-boutique transition-all duration-200 py-1.5 border-b focus:outline-none ${
                  isCategoryActive || isCategoryDropdownOpen
                    ? 'text-[#B91C1C] border-[#B91C1C] font-semibold'
                    : 'text-brand-stone hover:text-[#B91C1C] hover:border-[#B91C1C] border-transparent'
                }`}
                aria-expanded={isCategoryDropdownOpen}
                aria-haspopup="true"
              >
                <span>{t('nav_category')}</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isCategoryDropdownOpen ? 'rotate-180 text-[#B91C1C]' : 'text-brand-stone'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Prominent Category Dropdown Floating Menu */}
              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-[#C5A059]/40 shadow-2xl rounded-lg p-3.5 z-50 animate-fadeIn">
                  
                  {/* Saree Section with Nested Subcategories */}
                  <div className="pb-2.5 mb-2 border-b border-brand-border/60">
                    <Link
                      to="/shop?category=sarees"
                      onClick={() => setIsCategoryDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider text-brand-black hover:bg-[#B91C1C]/10 hover:text-[#B91C1C] rounded-md transition-colors group"
                    >
                      <span className="group-hover:text-[#B91C1C]">{t('cat_sarees')}</span>
                      <span className="text-[10px] text-brand-stone group-hover:text-[#B91C1C] font-sans font-normal">&rarr; {t('sub_all')}</span>
                    </Link>

                    {/* Saree Subcategories (Shuti, Handloom, Muslin, Silk) */}
                    <div className="pl-3 pr-1 pt-1 space-y-0.5 border-l-2 border-[#C5A059]/40 ml-2 mt-1">
                      <Link
                        to="/shop?category=sarees&sub=shuti"
                        onClick={() => setIsCategoryDropdownOpen(false)}
                        className="block px-3 py-1.5 text-xs text-brand-stone hover:bg-[#B91C1C]/10 hover:text-[#B91C1C] rounded-md transition-colors"
                      >
                        • {t('sub_shuti')}
                      </Link>
                      <Link
                        to="/shop?category=sarees&sub=handloom"
                        onClick={() => setIsCategoryDropdownOpen(false)}
                        className="block px-3 py-1.5 text-xs text-brand-stone hover:bg-[#B91C1C]/10 hover:text-[#B91C1C] rounded-md transition-colors"
                      >
                        • {t('sub_handloom')}
                      </Link>
                      <Link
                        to="/shop?category=sarees&sub=muslin"
                        onClick={() => setIsCategoryDropdownOpen(false)}
                        className="block px-3 py-1.5 text-xs text-brand-stone hover:bg-[#B91C1C]/10 hover:text-[#B91C1C] rounded-md transition-colors"
                      >
                        • {t('sub_muslin')}
                      </Link>
                      <Link
                        to="/shop?category=sarees&sub=silk"
                        onClick={() => setIsCategoryDropdownOpen(false)}
                        className="block px-3 py-1.5 text-xs text-brand-stone hover:bg-[#B91C1C]/10 hover:text-[#B91C1C] rounded-md transition-colors"
                      >
                        • {t('sub_silk')}
                      </Link>
                    </div>
                  </div>

                  {/* Blouse */}
                  <div className="py-0.5">
                    <Link
                      to="/shop?category=blouses"
                      onClick={() => setIsCategoryDropdownOpen(false)}
                      className="block px-3 py-2 text-xs uppercase tracking-wider text-brand-black hover:bg-[#B91C1C]/10 hover:text-[#B91C1C] rounded-md transition-colors font-medium"
                    >
                      {t('cat_blouses')}
                    </Link>
                  </div>

                  {/* Kurti */}
                  <div className="py-0.5">
                    <Link
                      to="/shop?category=kurtis"
                      onClick={() => setIsCategoryDropdownOpen(false)}
                      className="block px-3 py-2 text-xs uppercase tracking-wider text-brand-black hover:bg-[#B91C1C]/10 hover:text-[#B91C1C] rounded-md transition-colors font-medium"
                    >
                      {t('cat_kurtis')}
                    </Link>
                  </div>

                  {/* Stoles */}
                  <div className="py-0.5">
                    <Link
                      to="/shop?category=stoles"
                      onClick={() => setIsCategoryDropdownOpen(false)}
                      className="block px-3 py-2 text-xs uppercase tracking-wider text-brand-black hover:bg-[#B91C1C]/10 hover:text-[#B91C1C] rounded-md transition-colors font-medium"
                    >
                      {t('cat_stoles')}
                    </Link>
                  </div>

                  {/* All Collections Link */}
                  <div className="pt-2 mt-1 border-t border-brand-border/60">
                    <Link
                      to="/shop"
                      onClick={() => setIsCategoryDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wider text-[#B91C1C] hover:bg-[#B91C1C]/10 rounded-md font-semibold transition-colors"
                    >
                      <span>{t('home_explore_all')}</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3) Customer Reviews */}
            <NavLink to="/reviews" className={navLinkClasses}>
              {t('nav_reviews_full')}
            </NavLink>

            {/* 4) About Us */}
            <NavLink to="/about" className={navLinkClasses}>
              {t('nav_about_us')}
            </NavLink>

            {/* 5) Contact Us (Smooth Scroll to Footer Contact Section) */}
            <button
              type="button"
              onClick={handleContactClick}
              className="whitespace-nowrap text-xs uppercase tracking-boutique text-brand-stone hover:text-[#B91C1C] hover:border-[#B91C1C] border-b border-transparent py-1.5 transition-all duration-200 focus:outline-none"
            >
              {t('nav_contact_us')}
            </button>
          </nav>

          {/* Right Utilities: Search Input, Customer Login, Language Toggle, Shopping Cart, Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3.5 shrink-0">
            
            {/* Live Compact Search Box with Search Icon */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search_dresses')}
                className="w-36 xl:w-44 focus:w-48 transition-all duration-300 text-xs py-1.5 pl-8 pr-6 bg-brand-canvas border border-brand-border focus:border-[#B91C1C] rounded-full text-brand-black placeholder-brand-stone/70 focus:outline-none shadow-inner"
              />
              <button
                type="submit"
                className="absolute left-2.5 text-brand-stone hover:text-brand-crimson transition-colors focus:outline-none"
                aria-label="Submit search"
              >
                <svg className="w-3.5 h-3.5 stroke-[1.8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-[10px] text-brand-stone hover:text-brand-crimson focus:outline-none"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </form>

            {/* Customer Sign In / Login Icon Button */}
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="p-1.5 text-brand-black hover:text-brand-crimson transition-colors relative flex items-center gap-1.5 focus:outline-none group"
              title={customerUser ? `${customerUser.name} (${t('auth_patron_badge')})` : t('auth_tab_login')}
              aria-label="Customer Account Portal"
            >
              {customerUser ? (
                /* Authenticated Customer Avatar Pill */
                <div className="flex items-center gap-1.5 bg-brand-crimson-soft px-2 py-0.5 rounded-full border border-brand-crimson/30">
                  <span className="w-4 h-4 rounded-full bg-brand-crimson text-white text-[9px] font-serif font-bold flex items-center justify-center">
                    {customerUser.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden xl:inline text-[11px] font-sans font-medium text-brand-crimson max-w-[80px] truncate">
                    {customerUser.name.split(' ')[0]}
                  </span>
                </div>
              ) : (
                /* Unauthenticated Icon */
                <svg className="w-5 h-5 stroke-[1.5] group-hover:scale-105 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              )}
            </button>

            {/* Language Switcher: EN | বাংলা */}
            <div className="flex items-center border border-brand-border bg-brand-canvas px-1 py-0.5 rounded-sm">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-sans font-medium tracking-wider transition-all rounded-sm ${
                  language === 'en'
                    ? 'bg-brand-crimson text-white font-semibold'
                    : 'text-brand-stone hover:text-brand-black'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <span className="text-brand-border text-xs px-0.5">|</span>
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-sans font-medium tracking-wider transition-all rounded-sm ${
                  language === 'bn'
                    ? 'bg-brand-crimson text-white font-semibold'
                    : 'text-brand-stone hover:text-brand-black'
                }`}
                aria-label="বাংলা ভাষায় পরিবর্তন করুন"
              >
                বাংলা
              </button>
            </div>

            {/* Cart Trigger with Live ৳ Total & Item Count Badge */}
            <button
              type="button"
              onClick={openCart}
              className="group flex items-center space-x-1.5 sm:space-x-2 text-brand-black hover:text-brand-crimson transition-colors py-1.5 focus:outline-none"
              aria-label={`Shopping bag with ${totalCount} items, total ${formatPrice(totalPrice)}`}
            >
              <div className="relative">
                <svg
                  className="w-5 h-5 text-brand-black group-hover:text-brand-crimson transition-colors stroke-[1.5]"
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

                {totalCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-brand-crimson text-white text-[9px] font-medium font-sans w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-xs">
                    {language === 'bn' ? toBengaliNumerals(totalCount) : totalCount}
                  </span>
                )}
              </div>

              {/* Live ৳ Total Amount */}
              <span className="hidden sm:inline-block text-xs font-semibold font-sans text-brand-black group-hover:text-brand-crimson transition-colors">
                {formatPrice(totalPrice)}
              </span>
            </button>

            {/* Mobile Hamburger Drawer Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-brand-black hover:text-brand-crimson transition-colors lg:hidden focus:outline-none"
              aria-label="Toggle mobile navigation menu"
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

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-brand-border px-4 py-4 space-y-2 shadow-md animate-fadeIn">
            
            {/* Mobile Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search_dresses')}
                className="w-full text-xs py-2 pl-8 pr-16 bg-brand-canvas border border-brand-border rounded-sm text-brand-black placeholder-brand-stone/70 focus:outline-none focus:border-brand-crimson"
              />
              <span className="absolute left-2.5 text-brand-stone">
                <svg className="w-3.5 h-3.5 stroke-[1.8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </span>
              <button
                type="submit"
                className="absolute right-1 px-2.5 py-1 bg-brand-crimson text-white text-[10px] uppercase font-medium rounded-sm"
              >
                Go
              </button>
            </form>

            {/* 1) Home */}
            <NavLink
              to="/"
              onClick={closeMobileMenu}
              end
              className={({ isActive }) =>
                `block py-2.5 px-3 text-xs uppercase tracking-wider border-l-2 ${
                  isActive
                    ? 'border-brand-crimson bg-brand-crimson-soft text-brand-crimson font-semibold'
                    : 'border-transparent text-brand-black hover:bg-brand-canvas'
                }`
              }
            >
              {t('nav_home')}
            </NavLink>

            {/* 2) Category (Collapsible Submenu Accordion) */}
            <div className="border-l-2 border-transparent">
              <button
                type="button"
                onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                className="w-full flex items-center justify-between py-2.5 px-3 text-xs uppercase tracking-wider text-brand-black hover:bg-brand-canvas transition-colors"
              >
                <span className={isCategoryActive ? 'text-brand-crimson font-semibold' : ''}>
                  {t('nav_category')}
                </span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${isMobileCategoryOpen ? 'rotate-180 text-brand-crimson' : 'text-brand-stone'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Collapsible Category Items */}
              {isMobileCategoryOpen && (
                <div className="pl-4 pr-2 py-2 bg-brand-canvas/60 space-y-1.5 text-xs font-sans">
                  <div className="font-medium text-brand-crimson uppercase text-[11px] pt-1">
                    {t('cat_sarees')}
                  </div>
                  <div className="pl-2 space-y-1 text-brand-stone">
                    <Link
                      to="/shop?category=sarees"
                      onClick={closeMobileMenu}
                      className="block py-0.5 hover:text-brand-crimson"
                    >
                      • {t('sub_all')}
                    </Link>
                    <Link
                      to="/shop?category=sarees&sub=shuti"
                      onClick={closeMobileMenu}
                      className="block py-0.5 hover:text-brand-crimson"
                    >
                      • {t('sub_shuti')}
                    </Link>
                    <Link
                      to="/shop?category=sarees&sub=handloom"
                      onClick={closeMobileMenu}
                      className="block py-0.5 hover:text-brand-crimson"
                    >
                      • {t('sub_handloom')}
                    </Link>
                    <Link
                      to="/shop?category=sarees&sub=muslin"
                      onClick={closeMobileMenu}
                      className="block py-0.5 hover:text-brand-crimson"
                    >
                      • {t('sub_muslin')}
                    </Link>
                    <Link
                      to="/shop?category=sarees&sub=silk"
                      onClick={closeMobileMenu}
                      className="block py-0.5 hover:text-brand-crimson"
                    >
                      • {t('sub_silk')}
                    </Link>
                  </div>

                  <Link
                    to="/shop?category=blouses"
                    onClick={closeMobileMenu}
                    className="block py-1 font-medium text-brand-black hover:text-brand-crimson border-t border-brand-border/40 mt-1"
                  >
                    {t('cat_blouses')}
                  </Link>
                  <Link
                    to="/shop?category=kurtis"
                    onClick={closeMobileMenu}
                    className="block py-1 font-medium text-brand-black hover:text-brand-crimson"
                  >
                    {t('cat_kurtis')}
                  </Link>
                  <Link
                    to="/shop?category=stoles"
                    onClick={closeMobileMenu}
                    className="block py-1 font-medium text-brand-black hover:text-brand-crimson"
                  >
                    {t('cat_stoles')}
                  </Link>
                  <Link
                    to="/shop"
                    onClick={closeMobileMenu}
                    className="block py-1 text-[11px] text-brand-stone hover:text-brand-crimson italic"
                  >
                    {t('home_explore_all')} &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* 3) Customer Reviews */}
            <NavLink
              to="/reviews"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `block py-2.5 px-3 text-xs uppercase tracking-wider border-l-2 ${
                  isActive
                    ? 'border-brand-crimson bg-brand-crimson-soft text-brand-crimson font-semibold'
                    : 'border-transparent text-brand-black hover:bg-brand-canvas'
                }`
              }
            >
              {t('nav_reviews_full')}
            </NavLink>

            {/* 4) About Us */}
            <NavLink
              to="/about"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `block py-2.5 px-3 text-xs uppercase tracking-wider border-l-2 ${
                  isActive
                    ? 'border-brand-crimson bg-brand-crimson-soft text-brand-crimson font-semibold'
                    : 'border-transparent text-brand-black hover:bg-brand-canvas'
                }`
              }
            >
              {t('nav_about_us')}
            </NavLink>

            {/* 5) Contact Us */}
            <button
              type="button"
              onClick={handleContactClick}
              className="w-full text-left py-2.5 px-3 text-xs uppercase tracking-wider text-brand-black hover:bg-brand-canvas transition-colors border-l-2 border-transparent"
            >
              {t('nav_contact_us')}
            </button>

            {/* Customer Sign In / Account Drawer Button */}
            <div className="pt-2 border-t border-brand-border">
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  setIsAuthModalOpen(true);
                }}
                className="w-full flex items-center justify-between py-2 px-3 bg-brand-canvas hover:bg-brand-crimson-soft rounded-sm text-xs font-sans text-brand-black transition-colors"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 stroke-[1.5] text-brand-crimson" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <span>
                    {customerUser ? `${customerUser.name} (${t('auth_patron_badge')})` : t('auth_tab_login')}
                  </span>
                </span>
                <span className="text-[10px] text-brand-crimson font-medium">&rarr;</span>
              </button>
            </div>

            {/* Mobile Language Switch & Cart Total Recap */}
            <div className="pt-2 flex items-center justify-between px-3 text-xs font-sans">
              <span className="text-[11px] text-brand-stone">
                Bag: <strong className="text-brand-crimson">{formatPrice(totalPrice)}</strong> ({totalCount})
              </span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-0.5 text-xs rounded-sm border ${
                    language === 'en'
                      ? 'bg-brand-crimson text-white border-brand-crimson font-medium'
                      : 'bg-brand-canvas text-brand-black border-brand-border'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('bn')}
                  className={`px-2 py-0.5 text-xs rounded-sm border ${
                    language === 'bn'
                      ? 'bg-brand-crimson text-white border-brand-crimson font-medium'
                      : 'bg-brand-canvas text-brand-black border-brand-border'
                  }`}
                >
                  বাংলা
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Customer Authentication Portal Modal */}
      <CustomerAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
