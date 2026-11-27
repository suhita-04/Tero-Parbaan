import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// =========================================================================
// FOUNDER EDITORIAL IMAGES (Easily swappable with local paths later)
// =========================================================================
export const FOUNDER_IMAGES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    alt: 'Founder of Tero Parbaan draped in traditional Bengali handloom saree',
    caption: 'Founder & Creative Director of Tero Parbaan, Dhaka.',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85',
    alt: 'Founder reviewing artisanal weave samples in rural Tangail cluster',
    caption: 'Working closely on loom sites with generational weavers to hand-curate every motif.',
  },
];

export default function Founder() {
  const { t } = useLanguage();

  return (
    <div className="bg-brand-canvas min-h-screen py-10 sm:py-16 lg:py-20 selection:bg-brand-crimson-soft selection:text-brand-crimson">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Navigation Breadcrumb */}
        <nav className="mb-8 text-xs uppercase tracking-wider text-brand-stone font-sans flex items-center gap-2">
          <Link to="/" className="hover:text-brand-black transition-colors">{t('nav_home')}</Link>
          <span className="text-brand-border-gold">&bull;</span>
          <span className="text-brand-crimson font-medium">{t('nav_founder')}</span>
        </nav>

        {/* Editorial Story Header */}
        <header className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-3.5">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson"></span>
            <p className="text-[10.5px] uppercase tracking-[0.28em] text-brand-crimson font-sans font-medium">
              {t('founder_eyebrow')}
            </p>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson"></span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-brand-black font-normal tracking-wide leading-tight">
            {t('founder_title')}
          </h1>

          <div className="w-14 h-[1px] bg-brand-gold mx-auto my-4"></div>

          <p className="font-sans text-sm sm:text-base lg:text-lg text-brand-stone font-light leading-relaxed max-w-2xl mx-auto">
            {t('founder_subtitle')}
          </p>
        </header>

        {/* ===================================================================
            HERO ESSAY & PORTRAIT (Portrait Left, Bio Right)
            =================================================================== */}
        <section className="mb-20 sm:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Framed Portrait Photo on One Side with Antique Gold Inset */}
            <div className="lg:col-span-5 relative group">
              <div className="aspect-[3/4] relative overflow-hidden bg-white border border-brand-border shadow-gallery">
                <img
                  src={FOUNDER_IMAGES[0].url}
                  alt={FOUNDER_IMAGES[0].alt}
                  className="w-full h-full object-cover object-center transform group-hover:scale-102 transition-transform duration-700 ease-out"
                />
                
                {/* Thin Antique Gold Inner Border Framing */}
                <div className="absolute inset-2 sm:inset-3 border border-brand-gold/40 pointer-events-none"></div>

                {/* Subtle Editorial Label Tag */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 border border-brand-gold/30 text-[9.5px] uppercase tracking-[0.2em] font-sans text-brand-black">
                  Dhaka Atelier &bull; Founder
                </div>
              </div>

              <p className="text-[11px] text-brand-stone font-sans italic mt-3 text-center sm:text-left">
                {FOUNDER_IMAGES[0].caption}
              </p>

              {/* Verified Community Badge Box */}
              <div className="mt-6 p-4 sm:p-5 bg-white border border-brand-border space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-sans font-semibold text-brand-black">Online Boutique Sanctuary</span>
                </div>
                <p className="text-[11px] text-brand-stone font-sans leading-relaxed">
                  Join our engaged circle of 45,000+ handloom patrons on Instagram at{' '}
                  <a
                    href="https://instagram.com/tero_parbon3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-crimson font-medium underline underline-offset-2"
                  >
                    @tero_parbon3
                  </a>
                </p>
              </div>
            </div>

            {/* Editorial Bio & Pull-Quote Block on the Other Side */}
            <div className="lg:col-span-7 space-y-8 text-left">
              
              {/* Styled Pull-Quote Block Highlighting Her Passion */}
              <div className="p-6 sm:p-8 bg-white border border-brand-border relative shadow-gold-subtle">
                <div className="absolute inset-1.5 border border-brand-gold/30 pointer-events-none"></div>
                <span className="text-brand-crimson text-3xl font-serif leading-none block mb-2">&ldquo;</span>
                <blockquote className="font-serif text-lg sm:text-xl md:text-2xl text-brand-black italic font-light leading-snug">
                  {t('founder_quote')}
                </blockquote>
                <div className="w-10 h-[1px] bg-brand-gold my-3"></div>
                <p className="text-xs font-sans uppercase tracking-[0.16em] text-brand-crimson font-medium">
                  {t('founder_author')}
                </p>
              </div>

              {/* Story Section 1: How She Started Tero Parbaan */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <span className="h-[1px] w-6 bg-brand-crimson"></span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-brand-crimson font-sans font-semibold">
                    {t('founder_sec1_tag')}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-black font-normal">
                  {t('founder_sec1_title')}
                </h2>
                <p className="text-xs sm:text-sm text-brand-stone font-sans font-light leading-relaxed">
                  {t('founder_sec1_desc')}
                </p>
              </div>

              {/* Story Section 2: The Journey So Far */}
              <div className="space-y-3 pt-4 border-t border-brand-border/70">
                <div className="flex items-center gap-2">
                  <span className="h-[1px] w-6 bg-brand-gold"></span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-brand-gold font-sans font-semibold">
                    {t('founder_sec2_tag')}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-black font-normal">
                  {t('founder_sec2_title')}
                </h2>
                <p className="text-xs sm:text-sm text-brand-stone font-sans font-light leading-relaxed">
                  {t('founder_sec2_desc')}
                </p>
              </div>

              {/* Story Section 3: Every Step Forward */}
              <div className="space-y-3 pt-4 border-t border-brand-border/70">
                <div className="flex items-center gap-2">
                  <span className="h-[1px] w-6 bg-brand-black"></span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-brand-black font-sans font-semibold">
                    {t('founder_sec3_tag')}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-black font-normal">
                  {t('founder_sec3_title')}
                </h2>
                <p className="text-xs sm:text-sm text-brand-stone font-sans font-light leading-relaxed">
                  {t('founder_sec3_desc')}
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* Community Milestones & Stats Banner */}
        <section className="mb-20 py-10 px-6 sm:px-12 bg-white border border-brand-border shadow-gallery text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-brand-border">
            <div className="pt-4 md:pt-0">
              <p className="font-serif text-3xl sm:text-4xl text-brand-crimson font-normal">45K+</p>
              <p className="text-xs uppercase tracking-wider text-brand-stone font-sans mt-1">
                {t('founder_stats_community')}
              </p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="font-serif text-3xl sm:text-4xl text-brand-black font-normal">120+</p>
              <p className="text-xs uppercase tracking-wider text-brand-stone font-sans mt-1">
                {t('founder_stats_artisans')}
              </p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="font-serif text-3xl sm:text-4xl text-brand-crimson font-normal">64</p>
              <p className="text-xs uppercase tracking-wider text-brand-stone font-sans mt-1">
                {t('founder_stats_cities')}
              </p>
            </div>
          </div>
        </section>

        {/* Secondary Storytelling Photo & Note */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white border border-brand-border p-6 sm:p-10">
          <div className="md:col-span-5 aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-brand-canvas relative">
            <img
              src={FOUNDER_IMAGES[1].url}
              alt={FOUNDER_IMAGES[1].alt}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-1.5 border border-brand-gold/30 pointer-events-none"></div>
          </div>
          <div className="md:col-span-7 space-y-3 text-left">
            <p className="text-[10px] uppercase tracking-[0.24em] text-brand-crimson font-sans font-semibold">
              The Artisan Fellowship
            </p>
            <h3 className="font-serif text-xl sm:text-2xl text-brand-black font-normal">
              Direct Weaver Relationships, Zero Middlemen
            </h3>
            <p className="text-xs sm:text-sm text-brand-stone font-sans font-light leading-relaxed">
              &ldquo;When you wear a saree from Tero Parbaan, you directly sustain the livelihood and dignity of our indigenous weaving families. Thank you for walking this beautiful journey with me.&rdquo;
            </p>
          </div>
        </section>

        {/* Action Button: Browse Her Handpicked Pieces */}
        <div className="text-center pt-4">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center bg-brand-crimson hover:bg-brand-crimson-hover text-white px-8 py-3.5 sm:px-10 sm:py-4 text-xs font-sans font-medium tracking-[0.18em] uppercase transition-all duration-300 shadow-sm hover:-translate-y-0.5"
          >
            <span>{t('founder_cta_btn')}</span>
            <span className="ml-2">&rarr;</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
