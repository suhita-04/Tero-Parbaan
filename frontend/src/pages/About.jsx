import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// =========================================================================
// ABOUT PAGE EDITORIAL IMAGES (Easily swappable with local paths later)
// =========================================================================
export const ABOUT_IMAGES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    alt: 'Master weaver working on traditional handloom',
    caption: 'Tangail & Narayanganj: Generational master weavers preserving traditional pitloom artistry.',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
    alt: 'Fine Dhakai Jamdani gossamer threadwork',
    caption: 'Pure Jamdani Weave: 300-count organic cotton spun with geometric resham and zari buttis.',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1583391733975-dd2d0865d8c3?auto=format&fit=crop&w=1200&q=85',
    alt: 'Careful quality inspection and packaging in Dhaka atelier',
    caption: 'Dhaka Showroom: Meticulous thread inspection and anti-moisture muslin wrap before dispatch.',
  },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="bg-brand-canvas min-h-screen py-10 sm:py-16 lg:py-20 selection:bg-brand-crimson-soft selection:text-brand-crimson">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Navigation Breadcrumb */}
        <nav className="mb-8 text-xs uppercase tracking-wider text-brand-stone font-sans flex items-center gap-2">
          <Link to="/" className="hover:text-brand-black transition-colors">{t('nav_home')}</Link>
          <span className="text-brand-border-gold">&bull;</span>
          <span className="text-brand-crimson font-medium">{t('nav_about')}</span>
        </nav>

        {/* Magazine Editorial Header */}
        <header className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson"></span>
            <p className="text-[10.5px] uppercase tracking-[0.28em] text-brand-crimson font-sans font-medium">
              {t('about_eyebrow')}
            </p>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson"></span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-brand-black font-normal tracking-wide leading-tight">
            {t('about_title')}
          </h1>

          <div className="w-14 h-[1px] bg-brand-gold mx-auto my-4"></div>

          <p className="font-sans text-sm sm:text-base lg:text-lg text-brand-stone font-light leading-relaxed max-w-2xl mx-auto">
            {t('about_subtitle')}
          </p>
        </header>

        {/* ===================================================================
            SECTION 1: OUR STORY & PROMISE (Image on Left, Story on Right)
            =================================================================== */}
        <section className="mb-20 sm:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Image Column with Antique Gold Inset Framing */}
            <div className="lg:col-span-6 relative group">
              <div className="aspect-[4/5] sm:aspect-[3/4] relative overflow-hidden bg-white border border-brand-border shadow-gallery">
                <img
                  src={ABOUT_IMAGES[0].url}
                  alt={ABOUT_IMAGES[0].alt}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-2 border border-brand-gold/30 pointer-events-none"></div>
              </div>
              <p className="text-[10px] text-brand-stone font-sans italic mt-2.5 px-1 leading-normal">
                {ABOUT_IMAGES[0].caption}
              </p>
            </div>

            {/* Story Text Column */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-brand-gold"></span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-brand-gold font-sans font-medium">
                  {t('about_sec1_tag')}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-brand-black font-normal">
                {t('about_sec1_title')}
              </h2>

              <p className="text-xs sm:text-sm text-brand-stone font-sans font-light leading-relaxed">
                {t('about_sec1_p1')}
              </p>

              <p className="text-xs sm:text-sm text-brand-stone font-sans font-light leading-relaxed">
                {t('about_sec1_p2')}
              </p>

              <div className="pt-2">
                <div className="p-4 bg-white border-l-2 border-brand-crimson border-y border-r border-brand-border/60">
                  <p className="font-bengali text-xs sm:text-sm text-brand-black italic">
                    &ldquo;বারো মাসের, তেরো সাজে — মিষ্টি সুবাস শাড়ির ভাঁজে!&rdquo;
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Editorial Pull-Quote Break */}
        <section className="my-16 sm:my-24 py-12 px-6 sm:px-12 bg-white border border-brand-border shadow-gallery text-center relative overflow-hidden">
          <div className="absolute inset-2 border border-brand-gold/25 pointer-events-none"></div>
          <span className="text-brand-gold text-2xl sm:text-3xl font-serif">✦</span>
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-brand-black font-light italic leading-snug max-w-2xl mx-auto my-3">
            {t('about_quote')}
          </blockquote>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-crimson font-sans">
            — Tero Parbaan Atelier Manifesto —
          </p>
        </section>

        {/* ===================================================================
            SECTION 2: AUTHENTICITY & CRAFTSMANSHIP (Story on Left, Image on Right)
            =================================================================== */}
        <section className="mb-20 sm:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Story Text Column */}
            <div className="lg:col-span-6 space-y-5 text-left order-2 lg:order-1">
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-brand-gold"></span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-brand-gold font-sans font-medium">
                  {t('about_sec2_tag')}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-brand-black font-normal">
                {t('about_sec2_title')}
              </h2>

              <p className="text-xs sm:text-sm text-brand-stone font-sans font-light leading-relaxed">
                {t('about_sec2_p1')}
              </p>

              <p className="text-xs sm:text-sm text-brand-stone font-sans font-light leading-relaxed">
                {t('about_sec2_p2')}
              </p>

              {/* Artisan Heritage Points */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-sans">
                <div className="bg-white p-3 border border-brand-border">
                  <span className="text-brand-crimson font-bold block mb-0.5">300 Count</span>
                  <span className="text-brand-stone text-[11px]">Dhakai Muslin Sheerness</span>
                </div>
                <div className="bg-white p-3 border border-brand-border">
                  <span className="text-brand-crimson font-bold block mb-0.5">100% Pure</span>
                  <span className="text-brand-stone text-[11px]">Organic Combed Cotton</span>
                </div>
              </div>
            </div>

            {/* Image Column */}
            <div className="lg:col-span-6 relative group order-1 lg:order-2">
              <div className="aspect-[4/5] sm:aspect-[3/4] relative overflow-hidden bg-white border border-brand-border shadow-gallery">
                <img
                  src={ABOUT_IMAGES[1].url}
                  alt={ABOUT_IMAGES[1].alt}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-2 border border-brand-gold/30 pointer-events-none"></div>
              </div>
              <p className="text-[10px] text-brand-stone font-sans italic mt-2.5 px-1 leading-normal">
                {ABOUT_IMAGES[1].caption}
              </p>
            </div>

          </div>
        </section>

        {/* ===================================================================
            SECTION 3: HOW WE WORK (Image on Left, Story on Right)
            =================================================================== */}
        <section className="mb-20 sm:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Image Column */}
            <div className="lg:col-span-6 relative group">
              <div className="aspect-[4/5] sm:aspect-[3/4] relative overflow-hidden bg-white border border-brand-border shadow-gallery">
                <img
                  src={ABOUT_IMAGES[2].url}
                  alt={ABOUT_IMAGES[2].alt}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-2 border border-brand-gold/30 pointer-events-none"></div>
              </div>
              <p className="text-[10px] text-brand-stone font-sans italic mt-2.5 px-1 leading-normal">
                {ABOUT_IMAGES[2].caption}
              </p>
            </div>

            {/* Story Text Column */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-brand-gold"></span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-brand-gold font-sans font-medium">
                  {t('about_sec3_tag')}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-brand-black font-normal">
                {t('about_sec3_title')}
              </h2>

              <p className="text-xs sm:text-sm text-brand-stone font-sans font-light leading-relaxed">
                {t('about_sec3_p1')}
              </p>

              <p className="text-xs sm:text-sm text-brand-stone font-sans font-light leading-relaxed">
                {t('about_sec3_p2')}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 text-xs text-brand-stone font-sans">
                  <span className="text-brand-crimson">✓</span>
                  <span>Inside Dhaka: ৳80 (2-3 days)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-stone font-sans">
                  <span className="text-brand-crimson">✓</span>
                  <span>Nationwide: ৳150 (3-5 days)</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Final Editorial Call to Action */}
        <section className="text-center pt-8 border-t border-brand-border">
          <h3 className="font-serif text-2xl sm:text-3xl text-brand-black font-normal mb-3">
            Experience the Touch of Handloom Luxury
          </h3>
          <p className="text-xs sm:text-sm text-brand-stone font-sans max-w-md mx-auto mb-6">
            Explore our limited batches of Jamdani, Taant, Silk sarees, bespoke blouses, and artisanal stoles.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center bg-brand-crimson hover:bg-brand-crimson-hover text-white px-8 py-3.5 sm:px-10 sm:py-4 text-xs font-sans font-medium tracking-[0.18em] uppercase transition-all duration-300 shadow-sm hover:-translate-y-0.5"
          >
            <span>{t('about_cta_btn')}</span>
            <span className="ml-2">&rarr;</span>
          </Link>
        </section>

      </div>
    </div>
  );
}
