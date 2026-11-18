import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import ProductGrid from '../components/product/ProductGrid';
import { MOCK_PRODUCTS } from '../data/mockProducts';

export default function Home() {
  return (
    <div className="bg-brand-cream">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Boutique Product Listing Section (3-Column ProductGrid) */}
      <section className="py-12 sm:py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2.5 sm:space-y-3">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-red font-sans font-medium">
            Handcrafted Editions
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-brand-charcoal font-normal">
            Boutique Signatures
          </h2>
          <div className="w-12 h-[1px] bg-brand-border mx-auto my-3 sm:my-4"></div>
          <p className="text-xs sm:text-sm text-brand-stone font-sans font-light leading-relaxed">
            Explore our curated handloom weaves and tailored garments. Each piece is crafted in limited batches celebrating timeless craftsmanship.
          </p>
        </div>

        {/* Responsive ProductGrid: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
        <ProductGrid products={MOCK_PRODUCTS} />

        {/* Catalog Navigation Link */}
        <div className="mt-10 sm:mt-16 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] font-sans text-brand-red hover:text-brand-red-hover border-b border-brand-red pb-1 font-medium transition-colors"
          >
            <span>Explore All Saree, Kurti & Blouse Collections</span>
            <span className="ml-2">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* 3. Aesthetic Brand Statement Banner */}
      <section className="border-y border-brand-border bg-white py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3 sm:space-y-4">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-brand-stone font-sans">
            Slow Fashion &bull; Enduring Heritage
          </span>
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-brand-charcoal font-light italic leading-snug">
            &ldquo;We believe luxury is woven with patience, preserving Bengal&apos;s textile legacy through timeless silhouettes and uncompromised craftsmanship.&rdquo;
          </blockquote>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-red font-sans pt-1 sm:pt-2">
            &mdash; The Tero Parbon Atelier &mdash;
          </p>
        </div>
      </section>
    </div>
  );
}
