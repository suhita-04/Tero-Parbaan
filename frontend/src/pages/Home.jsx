import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import ProductGrid from '../components/product/ProductGrid';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  // Curated boutique preview for homepage gallery (first 6 items)
  const featuredProducts = MOCK_PRODUCTS.slice(0, 6);

  return (
    <div className="bg-brand-canvas">
      {/* 1. Editorial Hero Section */}
      <Hero />

      {/* 2. Airy Boutique Gallery Product Listing Section */}
      <section className="py-12 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2.5">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-crimson font-sans font-medium">
            {t('home_signatures_eyebrow')}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-brand-black font-normal">
            {t('home_signatures_title')}
          </h2>
          <div className="w-10 h-[1px] bg-brand-gold mx-auto my-3 sm:my-4"></div>
          <p className="text-xs sm:text-sm text-brand-stone font-sans font-light leading-relaxed">
            {t('home_signatures_desc')}
          </p>
        </div>

        {/* Airy 3-Column Product Grid */}
        <ProductGrid products={featuredProducts} />

        {/* All Collections Link */}
        <div className="mt-14 sm:mt-20 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center text-xs uppercase tracking-[0.18em] font-sans text-brand-crimson hover:text-brand-crimson-hover border-b border-brand-crimson pb-1 font-medium transition-colors"
          >
            <span>{t('home_explore_all')}</span>
            <span className="ml-2">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* 3. Poetic Brand Quote Section on White Canvas */}
      <section className="border-y border-brand-border bg-white py-14 sm:py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-[9.5px] uppercase tracking-[0.28em] text-brand-gold font-sans font-medium">
            ✦ Authentic Dhaka Heritage &bull; Slow Craftsmanship ✦
          </span>
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-brand-black font-light italic leading-snug">
            &ldquo;{t('home_quote')}&rdquo;
          </blockquote>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-crimson font-sans pt-1">
            {t('home_quote_author')}
          </p>
        </div>
      </section>
    </div>
  );
}
