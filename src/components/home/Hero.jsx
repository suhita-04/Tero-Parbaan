import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-cream pt-4 pb-10 sm:pt-8 sm:pb-16 lg:pt-14 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Main Hero Card / Banner Container */}
        <div className="relative border border-brand-border bg-white overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-0 lg:min-h-[640px]">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col justify-center px-5 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-14 z-10 bg-white/95 order-2 lg:order-1">
              
              {/* Eyebrow Label */}
              <div className="flex items-center space-x-2.5 sm:space-x-3 mb-3 sm:mb-4">
                <span className="h-[1px] w-6 sm:w-8 bg-brand-red/60"></span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-sans text-brand-red font-medium">
                  Artisanal Heritage Wear
                </span>
              </div>

              {/* Responsive Elegant Serif Heading */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-charcoal leading-[1.18] sm:leading-[1.15] font-normal mb-4 sm:mb-6">
                Elegance in <br className="hidden sm:inline" />
                <span className="italic font-light">Every Thread</span>
              </h1>

              {/* Subtitle / Narrative */}
              <p className="text-sm sm:text-base lg:text-lg text-brand-stone font-sans font-light leading-relaxed mb-6 sm:mb-8 max-w-lg">
                Discover masterfully hand-woven Jamdani sarees, bespoke embroidered blouses, and breathable silk kurtis. Understated luxury created for cherished celebrations.
              </p>

              {/* Responsive CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center bg-brand-red hover:bg-brand-red-hover text-brand-cream border border-brand-red px-6 py-3.5 sm:px-8 sm:py-4 text-xs font-sans font-medium tracking-[0.16em] uppercase transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Shop Collection</span>
                  <svg className="w-4 h-4 ml-2.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>

                <Link
                  to="/shop?category=sarees"
                  className="inline-flex items-center justify-center bg-transparent hover:bg-brand-cream text-brand-charcoal hover:text-brand-red border border-brand-border px-6 py-3.5 sm:px-8 sm:py-4 text-xs font-sans font-medium tracking-[0.16em] uppercase transition-all duration-300 hover:border-brand-red"
                >
                  Explore Sarees
                </Link>
              </div>

              {/* Responsive Artisan Trust Markers */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-brand-border/60 grid grid-cols-3 gap-2 sm:gap-4 text-center sm:text-left">
                <div>
                  <p className="font-serif text-base sm:text-lg text-brand-charcoal">100%</p>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-brand-stone font-sans">Pure Handloom</p>
                </div>
                <div>
                  <p className="font-serif text-base sm:text-lg text-brand-charcoal">Bespoke</p>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-brand-stone font-sans">Custom Tailoring</p>
                </div>
                <div>
                  <p className="font-serif text-base sm:text-lg text-brand-charcoal">COD</p>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-brand-stone font-sans">Nationwide</p>
                </div>
              </div>

            </div>

            {/* Right Banner Image Area */}
            <div className="lg:col-span-6 relative bg-brand-cream-warm min-h-[260px] sm:min-h-[380px] lg:min-h-full overflow-hidden flex items-center justify-center order-1 lg:order-2">
              
              {/* High-Resolution Editorial Boutique Photography */}
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=85"
                alt="Tero Parbon Handwoven Crimson Saree Collection"
                className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
                loading="eager"
              />

              {/* Minimalist Editorial Watermark / Tag */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 border border-brand-border/80 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-sans text-brand-charcoal">
                The Heritage Edit &bull; Vol. I
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
