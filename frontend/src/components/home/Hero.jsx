import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

// =========================================================================
// PASTEL BANNER IMAGES (Easily swappable with local '/images/banner-1.jpg', etc.)
// =========================================================================
export const BANNER_IMAGES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    alt: 'Pastel Handloom Silk Saree Drape with Antique Gold Zari',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
    alt: 'Pure Dhakai Jamdani Muslin Sheer Pastel Textile',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1583391733975-dd2d0865d8c3?auto=format&fit=crop&w=1200&q=85',
    alt: 'Handwoven Pastel Bengal Tangail Taant Fabric',
  },
];

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section className="relative w-full h-[460px] md:h-[560px] overflow-hidden bg-brand-canvas select-none">
      
      {/* =====================================================================
          1. ANGULAR DIAGONAL SPLIT BANNER (3 Image Panels)
          ===================================================================== */}
      <div className="absolute inset-0 w-full h-full bg-[#FAF8F5]">
        
        {/* Panel 1: Left Angular Slice */}
        <div className="absolute inset-0 w-full h-full panel-diagonal-1 overflow-hidden z-0">
          <img
            src={BANNER_IMAGES[0].url}
            alt={BANNER_IMAGES[0].alt}
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-out"
            loading="eager"
          />
        </div>

        {/* Panel 2: Center Angular Slice */}
        <div className="absolute inset-0 w-full h-full panel-diagonal-2 overflow-hidden z-0">
          <img
            src={BANNER_IMAGES[1].url}
            alt={BANNER_IMAGES[1].alt}
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-out"
            loading="eager"
          />
        </div>

        {/* Panel 3: Right Angular Slice */}
        <div className="absolute inset-0 w-full h-full panel-diagonal-3 overflow-hidden z-0">
          <img
            src={BANNER_IMAGES[2].url}
            alt={BANNER_IMAGES[2].alt}
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-out"
            loading="eager"
          />
        </div>

        {/* Crisp Diagonal Dividers (SVG overlay matching polygon seam angles) */}
        {/* Desktop Divider Lines (md and up) */}
        <svg
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          {/* Seam 1: Ivory base border + Antique Gold Hairline */}
          <line x1="38" y1="0" x2="28" y2="100" stroke="#FAF8F5" strokeWidth="4" vectorEffect="non-scaling-stroke" />
          <line x1="38" y1="0" x2="28" y2="100" stroke="#C5A059" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />

          {/* Seam 2: Ivory base border + Antique Gold Hairline */}
          <line x1="72" y1="0" x2="62" y2="100" stroke="#FAF8F5" strokeWidth="4" vectorEffect="non-scaling-stroke" />
          <line x1="72" y1="0" x2="62" y2="100" stroke="#C5A059" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Mobile Divider Lines (< md) */}
        <svg
          className="md:hidden absolute inset-0 w-full h-full pointer-events-none z-10"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          {/* Mobile Seam 1 */}
          <line x1="36" y1="0" x2="30" y2="100" stroke="#FAF8F5" strokeWidth="3.5" vectorEffect="non-scaling-stroke" />
          <line x1="36" y1="0" x2="30" y2="100" stroke="#C5A059" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />

          {/* Mobile Seam 2 */}
          <line x1="71" y1="0" x2="65" y2="100" stroke="#FAF8F5" strokeWidth="3.5" vectorEffect="non-scaling-stroke" />
          <line x1="71" y1="0" x2="65" y2="100" stroke="#C5A059" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* ===================================================================
            2. PASTEL-IVORY FROSTED GRADIENT OVERLAY
            =================================================================== */}
        <div className="absolute inset-0 bg-[#FAF8F5]/55 backdrop-blur-[1.5px] bg-gradient-to-b from-[#FAF8F5]/65 via-[#FAF8F5]/50 to-[#FAF8F5]/70 z-10 pointer-events-none" />
      </div>

      {/* =====================================================================
          3. CENTERED EDITORIAL OVERLAY WITH GLASSMORPHISM
          ===================================================================== */}
      <div className="relative z-20 w-full h-full flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
        <div className="max-w-2xl w-full bg-white/85 sm:bg-white/90 backdrop-blur-md p-6 sm:p-9 md:p-11 border border-brand-gold/40 shadow-gallery relative text-center">
          
          {/* Subtle Geometric Antique Gold Hairline Inset */}
          <div className="absolute inset-1.5 sm:inset-2.5 border border-brand-gold/30 pointer-events-none" />

          {/* Brand Emblem Accent & Eyebrow */}
          <div className="inline-flex items-center justify-center gap-2 mb-2 sm:mb-2.5">
            <div className="w-5 h-5 rounded-full bg-brand-black border border-brand-crimson flex items-center justify-center p-0.5 shadow-sm">
              <span className="font-bengali text-[6.5px] text-brand-gold font-bold leading-none">তেরো</span>
            </div>
            <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.24em] font-sans text-brand-crimson font-medium">
              {t('hero_eyebrow')}
            </span>
          </div>

          {/* Brand Heading */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[44px] text-brand-black tracking-widest uppercase font-medium leading-none mb-2.5 sm:mb-3">
            {t('brand_name')}
          </h1>

          {/* The Official Poetic Bengali Tagline */}
          <p className="font-bengali text-sm sm:text-base md:text-xl text-brand-black leading-snug font-normal max-w-lg mx-auto">
            &ldquo;{t('tagline_bengali')}&rdquo;
          </p>

          {/* Subtitle / Poetic translation in English mode */}
          {language === 'en' && (
            <p className="text-[10.5px] sm:text-xs text-brand-stone font-sans italic mt-1 max-w-md mx-auto">
              {t('tagline')}
            </p>
          )}

          {/* Antique Gold Divider Line */}
          <div className="w-10 sm:w-12 h-[1px] bg-brand-gold mx-auto my-3 sm:my-4"></div>

          {/* Single Crimson Action Button */}
          <div className="pt-0.5">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-brand-crimson hover:bg-brand-crimson-hover text-white px-7 py-3 sm:px-9 sm:py-3.5 text-xs font-sans font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
            >
              <span>{t('hero_cta_shop')}</span>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Dhaka Heritage Trust Markers */}
          <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-brand-border/70 flex items-center justify-center gap-3 sm:gap-7 text-center text-xs font-sans text-brand-stone">
            <span className="flex items-center gap-1 sm:gap-1.5">
              <span className="text-brand-crimson text-xs">✦</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider">{t('hero_badge1_lbl')}</span>
            </span>
            <span className="text-brand-border">&bull;</span>
            <span className="flex items-center gap-1 sm:gap-1.5">
              <span className="text-brand-black text-xs">✦</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider">{t('hero_badge2_lbl')}</span>
            </span>
            <span className="text-brand-border">&bull;</span>
            <span className="flex items-center gap-1 sm:gap-1.5">
              <span className="text-brand-crimson text-xs">✦</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider">{t('hero_badge3_lbl')}</span>
            </span>
          </div>

        </div>
      </div>

    </section>
  );
}
