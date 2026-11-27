import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, toBengaliNumerals } from '../context/LanguageContext';

// =========================================================================
// REVIEWS DATA (Easily swappable with local '/images/reviews/...' paths later)
// Supports: 'photo' (customer portrait), 'screenshot' (social review), 'written'
// =========================================================================
export const REVIEWS_DATA = [
  {
    id: 1,
    type: 'photo',
    customerName: {
      en: 'Tahmina Anjum',
      bn: 'তাহমিনা আনজুম',
    },
    city: {
      en: 'Dhanmondi, Dhaka',
      bn: 'ধানমন্ডি, ঢাকা',
    },
    rating: 5,
    productPurchased: {
      en: 'Roktojoba — Dhakai Jamdani Muslin',
      bn: 'রক্তজবা — ঢাকাই জামদানি মসলিন',
    },
    quote: {
      en: 'Wore this breathtaking Dhakai Jamdani to my sister\'s Gaye Holud. The drape is featherlight, and the antique gold zari caught the evening lights so gently. Truly proud to wear authentic Bengal craftsmanship!',
      bn: 'বোনের গায়ে হলুদে এই রক্তজবা জামদানিটা পরেছিলাম। যেমন হালকা আরামদায়ক, তেমনই রাজকীয় আভিজাত্য। সবাই শাড়ির বুননের প্রশংসা করেছে!',
    },
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
    date: 'Oct 2026',
  },
  {
    id: 2,
    type: 'screenshot',
    customerName: {
      en: 'Dr. Farhana Chowdhury',
      bn: 'ডা. ফারহানা চৌধুরী',
    },
    city: {
      en: 'Uttara, Dhaka',
      bn: 'উত্তরা, ঢাকা',
    },
    source: 'WhatsApp',
    rating: 5,
    productPurchased: {
      en: 'Neelambori — Tangail Taant Shuti',
      bn: 'নীলাম্বরী — টাঙ্গাইল তাঁত সুতি',
    },
    quote: {
      en: '“Aapa, received the parcel just now! The cotton quality is superb, pure organic softness. And thank you for the complimentary muslin cloth wrap. Very impressed with the Cash on Delivery service!”',
      bn: '“আপু, পার্সেলটা এইমাত্র হাতে পেলাম! সুতি ফেব্রিকটা অসম্ভব নরম ও আরামদায়ক। সাথে সুতি কাপড়ের মোড়কটাও ভীষণ পছন্দ হয়েছে। ক্যাশ অন ডেলিভারিতে এমন সুন্দর সার্ভিস সত্যিই প্রশংসনীয়!”',
    },
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1000&q=85',
    date: 'Nov 2026',
  },
  {
    id: 3,
    type: 'written',
    customerName: {
      en: 'Samira Rahman',
      bn: 'সামিরা রহমান',
    },
    city: {
      en: 'Nasirabad, Chattogram',
      bn: 'নাসিরাবাদ, চট্টগ্রাম',
    },
    rating: 5,
    productPurchased: {
      en: 'Chondraboli — Raw Silk Zardozi Blouse',
      bn: 'চন্দ্রাবলী — র সিল্ক জারদৌসি ব্লাউজ',
    },
    quote: {
      en: 'The bespoke cut on this raw silk blouse is perfection. The back dori detailing and gold zardozi needlework look like something straight out of an heirloom royal trunk. Delivery to Chattogram took only 3 days.',
      bn: 'র সিল্কের এই ব্লাউজটির কাটিং ও ফিনিশিং অসাধারণ। পিঠের ডোরি আর নিখুঁত জারদৌসি হাতের কাজ দেখে মনে হয় যেন প্রাচীন ঐতিহ্যবাহী কোনো সম্পদ। চট্টগ্রামে মাত্র ৩ দিনে ডেলিভারি পেয়েছি।',
    },
    date: 'Nov 2026',
  },
  {
    id: 4,
    type: 'photo',
    customerName: {
      en: 'Nusrat Jahan',
      bn: 'নুসরাত জাহান',
    },
    city: {
      en: 'Gulshan 2, Dhaka',
      bn: 'গুলশান ২, ঢাকা',
    },
    rating: 5,
    productPurchased: {
      en: 'Meghdumoor — Rajshahi Mulberry Silk',
      bn: 'মেঘডুম্বুর — রাজশাহী তুঁত সিল্ক',
    },
    quote: {
      en: 'Rajshahi silk at its absolute finest. It feels like wearing pure poetry. Tero Parbaan has become my go-to boutique for every family celebration.',
      bn: 'রাজশাহী সিল্কের আসল উজ্জ্বলতা ও বিশুদ্ধতা এতে স্পষ্ট। তেরোপার্বণের শাড়িগুলো যেমন আভিজাত্যে ভরপুর, তেমনই ঐতিহ্যবাহী। যেকোনো পারিবারিক অনুষ্ঠানে আমার প্রথম পছন্দ এখন তেরোপার্বণ।',
    },
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
    date: 'Oct 2026',
  },
  {
    id: 5,
    type: 'screenshot',
    customerName: {
      en: 'Sabrina Mostafa',
      bn: 'সাবরিনা মোস্তফা',
    },
    city: {
      en: 'Zindabazar, Sylhet',
      bn: 'জিন্দাবাজার, সিলেট',
    },
    source: 'Facebook Messenger',
    rating: 5,
    productPurchased: {
      en: 'Bonalata — Begumpuri Textured Cotton',
      bn: 'বনলতা — বেগমপুরী টেক্সচার্ড সুতি',
    },
    quote: {
      en: '“Ordered from Sylhet and was a bit nervous about the online order, but the saree is 100% genuine handloom. Color matched the photos exactly. Will definitely order again!”',
      bn: '“সিলেট থেকে অর্ডার করার সময় একটু ইতস্তত করছিলাম, কিন্তু পার্সেল খুলে শাড়ি দেখে মন ভরে গেল। ছবির সাথে হুবহু মিল এবং ১০০% খাঁটি তাঁত। অনেক অনেক ধন্যবাদ আপু!”',
    },
    image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=1000&q=85',
    date: 'Nov 2026',
  },
  {
    id: 6,
    type: 'written',
    customerName: {
      en: 'Meera Sen',
      bn: 'মীরা সেন',
    },
    city: {
      en: 'Banani, Dhaka',
      bn: 'বনানী, ঢাকা',
    },
    rating: 5,
    productPurchased: {
      en: 'Shraboni — Tussar Silk Embroidered Kurti',
      bn: 'শ্রাবণী — তসর সিল্ক নকশিকাঁথা কুর্তি',
    },
    quote: {
      en: 'Understated luxury in every sense. The handspun Tussar silk combined with fine Kantha needlework makes this kurti so versatile for cultural gatherings and dinner evenings.',
      bn: 'তসর সিল্কের প্রাকৃতিক উজ্জ্বলতা আর নকশিকাঁথার নিখুঁত ফিনিশিং এই কুর্তিটাকে অনন্য করে তুলেছে। পরিমিত আভিজাত্য যাদের পছন্দ, তাঁদের জন্য সেরা সংগ্রহ।',
    },
    date: 'Oct 2026',
  },
  {
    id: 7,
    type: 'screenshot',
    customerName: {
      en: 'Nazia Haque',
      bn: 'নাজিয়া হক',
    },
    city: {
      en: 'Mirpur DOHS, Dhaka',
      bn: 'মিরপুর ডিওএইচএস, ঢাকা',
    },
    source: 'Instagram DM',
    rating: 5,
    productPurchased: {
      en: 'Arundhati — Handloom Tussar Silk Stole',
      bn: 'অরুন্ধতী — তসর সিল্ক হ্যান্ডলুম স্টোল',
    },
    quote: {
      en: '“The gold zari stripes and handcrafted tassels on this stole elevated my simple cotton outfit instantly. Packaging was so royal! Love your brand ❤️”',
      bn: '“স্টোলটির সোনালী জরির পাড় এবং হাতের ট্যাসেলগুলো এত সুন্দর! সাধারণ সুতি জামার সাথেও এক নিমেষে আভিজাত্য এনে দেয়। প্যাকেজিংটাও ভীষণ রাজকীয় ছিল ❤️”',
    },
    image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=1000&q=85',
    date: 'Nov 2026',
  },
  {
    id: 8,
    type: 'photo',
    customerName: {
      en: 'Afroza Begum',
      bn: 'আফরোজা বেগম',
    },
    city: {
      en: 'Sonadanga, Khulna',
      bn: 'সোনাডাঙ্গা, খুলনা',
    },
    rating: 5,
    productPurchased: {
      en: 'Rani Golap — Mirpur Katan Silk',
      bn: 'রানিগোলাপ — মিরপুর কাতান সিল্ক',
    },
    quote: {
      en: 'Gifted this Katan to my mother for her 50th birthday. The meenakari pallu is rich and regal without being loud. She was genuinely overjoyed!',
      bn: 'মায়ের ৫০তম জন্মদিনে এই রানিগোলাপ কাতান শাড়িটি উপহার দিয়েছিলাম। শাড়ির আঁচলের মীনা কারুকাজ আর জরির ঐতিহ্য সত্যিই অসাধারণ। মা ভীষণ খুশি হয়েছেন!',
    },
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
    date: 'Sep 2026',
  },
];

export default function Reviews() {
  const { t, getLocalizedField, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'photo', 'screenshot', 'written'
  const [lightboxItem, setLightboxItem] = useState(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxItem(null);
      }
    };
    if (lightboxItem) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxItem]);

  // Filter reviews
  const filteredReviews = REVIEWS_DATA.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const countDisplay = language === 'bn' ? toBengaliNumerals(filteredReviews.length) : filteredReviews.length;

  return (
    <div className="bg-brand-canvas min-h-screen py-10 sm:py-16 lg:py-20 selection:bg-brand-crimson-soft selection:text-brand-crimson">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Navigation Breadcrumb */}
        <nav className="mb-8 text-xs uppercase tracking-wider text-brand-stone font-sans flex items-center gap-2">
          <Link to="/" className="hover:text-brand-black transition-colors">{t('nav_home')}</Link>
          <span className="text-brand-border-gold">&bull;</span>
          <span className="text-brand-crimson font-medium">{t('nav_reviews')}</span>
        </nav>

        {/* Editorial Page Header */}
        <header className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson animate-pulse"></span>
            <p className="text-[10.5px] uppercase tracking-[0.28em] text-brand-crimson font-sans font-medium">
              {t('reviews_eyebrow')}
            </p>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson animate-pulse"></span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-brand-black font-normal tracking-wide leading-tight">
            {t('reviews_title')}
          </h1>

          <div className="w-14 h-[1px] bg-brand-gold mx-auto my-4"></div>

          <p className="font-sans text-xs sm:text-sm lg:text-base text-brand-stone font-light leading-relaxed max-w-xl mx-auto">
            {t('reviews_subtitle')}
          </p>

          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-brand-border text-[11px] font-sans text-brand-black shadow-sm">
              <span className="text-brand-gold">★★★★★</span>
              <span className="font-medium">{t('reviews_all_five_stars')}</span>
            </span>
          </div>
        </header>

        {/* ===================================================================
            CLEAN FILTER TABS (All, Customer Photos, Screenshots, Written)
            =================================================================== */}
        <div className="flex justify-start sm:justify-center items-center space-x-2 sm:space-x-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
          {[
            { key: 'all', label: t('reviews_filter_all') },
            { key: 'photo', label: t('reviews_filter_photos') },
            { key: 'screenshot', label: t('reviews_filter_screenshots') },
            { key: 'written', label: t('reviews_filter_written') },
          ].map((tab) => {
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={`text-[11px] sm:text-xs uppercase tracking-wider px-4 sm:px-5 py-2 transition-all whitespace-nowrap rounded-sm border ${
                  isActive
                    ? 'bg-brand-crimson text-white border-brand-crimson font-medium shadow-sm'
                    : 'bg-white text-brand-stone hover:text-brand-black border-brand-border hover:border-brand-gold'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Counter Note */}
        <div className="text-right text-[11px] text-brand-stone font-sans mb-6">
          {t('reviews_showing')} <strong className="text-brand-black">{countDisplay}</strong> {t('reviews_entries')}
        </div>

        {/* ===================================================================
            RESPONSIVE 3-COLUMN REVIEWS GRID / MASONRY FEEL
            =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {filteredReviews.map((item) => {
            const customer = getLocalizedField(item.customerName);
            const city = getLocalizedField(item.city);
            const quote = getLocalizedField(item.quote);
            const product = getLocalizedField(item.productPurchased);

            // -------------------------------------------------------------
            // FORMAT 1: CUSTOMER PHOTO CARD
            // -------------------------------------------------------------
            if (item.type === 'photo') {
              return (
                <div
                  key={item.id}
                  className="bg-white border border-brand-border p-3.5 shadow-gallery group hover:border-brand-gold transition-all duration-300 flex flex-col"
                >
                  {/* Portrait Photo with Zoom Trigger */}
                  <div
                    onClick={() => setLightboxItem(item)}
                    className="relative aspect-[3/4] overflow-hidden bg-brand-canvas cursor-pointer mb-3"
                  >
                    <img
                      src={item.image}
                      alt={customer}
                      className="w-full h-full object-cover object-center transform group-hover:scale-103 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-1.5 border border-brand-gold/30 pointer-events-none"></div>

                    {/* Subtle Overlay Zoom Hint */}
                    <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 text-[9px] uppercase tracking-wider font-sans opacity-0 group-hover:opacity-100 transition-opacity">
                      🔍 {t('reviews_click_zoom')}
                    </div>

                    <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-[8.5px] uppercase tracking-widest text-brand-crimson px-2 py-0.5 font-sans border border-brand-border">
                      {t('reviews_verified')}
                    </span>
                  </div>

                  {/* Customer Meta & Quote */}
                  <div className="space-y-2 p-1 text-left flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-brand-gold text-xs">★★★★★</span>
                        <span className="text-[10px] text-brand-stone font-sans">{item.date}</span>
                      </div>
                      <p className="font-serif text-sm sm:text-base text-brand-black leading-snug italic mb-2 line-clamp-3">
                        &ldquo;{quote}&rdquo;
                      </p>
                    </div>

                    <div className="pt-2 border-t border-brand-border/60">
                      <h4 className="font-sans text-xs font-semibold text-brand-black">{customer}</h4>
                      <p className="text-[10.5px] text-brand-stone font-sans">{city}</p>
                      <p className="text-[10px] text-brand-crimson font-sans mt-0.5 truncate">
                        <span className="text-brand-stone">{t('reviews_purchased')}</span> {product}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            // -------------------------------------------------------------
            // FORMAT 2: SCREENSHOT CARD (Messenger / WhatsApp / Facebook)
            // -------------------------------------------------------------
            if (item.type === 'screenshot') {
              return (
                <div
                  key={item.id}
                  className="bg-white border border-brand-gold/50 p-4 shadow-gallery group hover:shadow-lg transition-all duration-300 flex flex-col relative"
                >
                  {/* Verified Review Badge & Source Header */}
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-brand-border text-xs font-sans">
                    <span className="inline-flex items-center gap-1.5 text-brand-crimson font-medium text-[10.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson"></span>
                      <span>{t('reviews_verified')}</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-brand-stone font-mono bg-brand-canvas px-1.5 py-0.5 border border-brand-border">
                      {item.source}
                    </span>
                  </div>

                  {/* Neatly Framed Review Screenshot with Zoom Action */}
                  <div
                    onClick={() => setLightboxItem(item)}
                    className="relative aspect-[4/3] overflow-hidden bg-brand-canvas border border-brand-border cursor-pointer group-hover:border-brand-gold transition-colors mb-3.5"
                  >
                    <img
                      src={item.image}
                      alt={`${customer} ${item.source} review`}
                      className="w-full h-full object-cover object-center transform group-hover:scale-103 transition-transform duration-700 ease-out"
                    />

                    {/* Screenshot Frame Overlay Hint */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="bg-white/95 backdrop-blur-sm text-brand-black text-[10px] uppercase tracking-wider font-sans px-3 py-1 border border-brand-gold/60 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        🔍 {t('reviews_click_zoom')}
                      </span>
                    </div>
                  </div>

                  {/* Customer Text Excerpt & Product Info */}
                  <div className="space-y-2 text-left flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-brand-gold text-xs block mb-1">★★★★★</span>
                      <p className="font-serif text-xs sm:text-sm text-brand-black italic leading-relaxed line-clamp-3">
                        {quote}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-brand-border/60 flex items-end justify-between">
                      <div>
                        <h4 className="font-sans text-xs font-semibold text-brand-black">{customer}</h4>
                        <p className="text-[10px] text-brand-stone font-sans">{city}</p>
                        <p className="text-[10px] text-brand-crimson font-sans mt-0.5 truncate max-w-[200px]">
                          {product}
                        </p>
                      </div>
                      <span className="text-[9.5px] text-brand-stone font-sans">{item.date}</span>
                    </div>
                  </div>
                </div>
              );
            }

            // -------------------------------------------------------------
            // FORMAT 3: WRITTEN TESTIMONIAL CARD
            // -------------------------------------------------------------
            return (
              <div
                key={item.id}
                className="bg-white border border-brand-border p-6 sm:p-7 shadow-gallery flex flex-col justify-between hover:border-brand-border-gold transition-colors relative"
              >
                {/* Subtle Inner Accent Hairline */}
                <div className="absolute inset-1.5 border border-brand-gold/20 pointer-events-none"></div>

                <div>
                  {/* 5 Subtle Gold Stars */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-brand-gold text-sm tracking-wider">★★★★★</span>
                    <span className="text-[10px] uppercase tracking-wider text-brand-stone font-sans bg-brand-canvas px-2 py-0.5 border border-brand-border">
                      {t('reviews_verified')}
                    </span>
                  </div>

                  {/* Editorial Serif Quote */}
                  <blockquote className="font-serif text-base sm:text-lg text-brand-black font-light italic leading-relaxed mb-6">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-brand-border/70 flex justify-between items-end">
                  <div className="text-left">
                    <h4 className="font-sans text-xs font-semibold text-brand-black">{customer}</h4>
                    <p className="text-[11px] text-brand-stone font-sans">{city}</p>
                    <p className="text-[10.5px] text-brand-crimson font-sans mt-0.5">
                      <span className="text-brand-stone">{t('reviews_purchased')}</span> {product}
                    </p>
                  </div>
                  <span className="text-[10px] text-brand-stone font-sans">{item.date}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp & Community Inquiry Banner */}
        <section className="mt-16 sm:mt-24 p-8 sm:p-12 bg-white border border-brand-border text-center shadow-gallery relative">
          <div className="absolute inset-2 border border-brand-gold/25 pointer-events-none"></div>
          <span className="text-brand-crimson text-xs uppercase tracking-[0.24em] font-sans font-medium block mb-2">
            Share Your Experience
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-brand-black font-normal mb-3">
            Draped in Tero Parbaan?
          </h3>
          <p className="text-xs sm:text-sm text-brand-stone font-sans max-w-lg mx-auto mb-6 leading-relaxed">
            Send us your photos or reviews on Instagram or WhatsApp to be featured in our official patron gallery.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="https://instagram.com/tero_parbon3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-brand-black hover:bg-black text-white px-7 py-3 text-xs uppercase tracking-wider font-sans font-medium transition-colors"
            >
              <span>DM on Instagram @tero_parbon3</span>
              <span className="ml-1.5">&nearr;</span>
            </a>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-brand-crimson hover:bg-brand-crimson-hover text-white px-7 py-3 text-xs uppercase tracking-wider font-sans font-medium transition-colors"
            >
              <span>Explore Boutique Collections</span>
              <span className="ml-1.5">&rarr;</span>
            </Link>
          </div>
        </section>

      </div>

      {/* =====================================================================
          4. FULL-SCREEN LIGHTBOX ZOOM MODAL
          ===================================================================== */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-all"
          onClick={() => setLightboxItem(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Lightbox Inner Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-white border border-brand-gold shadow-2xl p-4 sm:p-6 flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto animate-fadeIn"
          >
            {/* Close 'X' Button */}
            <button
              type="button"
              onClick={() => setLightboxItem(null)}
              className="absolute top-3 right-3 text-brand-stone hover:text-brand-crimson p-1.5 text-lg font-mono focus:outline-none z-10 transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Large Image Preview */}
            <div className="md:w-3/5 bg-brand-canvas flex items-center justify-center overflow-hidden border border-brand-border">
              <img
                src={lightboxItem.image}
                alt={getLocalizedField(lightboxItem.customerName)}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>

            {/* Review Meta & Quote Details */}
            <div className="md:w-2/5 flex flex-col justify-between text-left space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-brand-gold text-sm">★★★★★</span>
                  <span className="text-[10px] uppercase tracking-wider text-brand-crimson font-sans font-semibold bg-brand-crimson-soft px-2 py-0.5 border border-brand-border-gold">
                    {t('reviews_verified')}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-brand-black font-medium">
                  {getLocalizedField(lightboxItem.customerName)}
                </h3>
                <p className="text-xs text-brand-stone font-sans mt-0.5">
                  {getLocalizedField(lightboxItem.city)} &bull; {lightboxItem.date}
                </p>

                <div className="w-10 h-[1px] bg-brand-gold my-3"></div>

                <blockquote className="font-serif text-sm sm:text-base text-brand-black italic leading-relaxed">
                  &ldquo;{getLocalizedField(lightboxItem.quote)}&rdquo;
                </blockquote>
              </div>

              <div className="pt-3 border-t border-brand-border space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-brand-stone font-sans block">
                  {t('reviews_purchased')}
                </span>
                <p className="font-sans text-xs font-semibold text-brand-crimson">
                  {getLocalizedField(lightboxItem.productPurchased)}
                </p>

                <div className="pt-4">
                  <Link
                    to="/shop"
                    onClick={() => setLightboxItem(null)}
                    className="w-full py-2.5 bg-brand-crimson hover:bg-brand-crimson-hover text-white text-xs uppercase tracking-wider font-sans font-medium transition-colors block text-center"
                  >
                    Shop This Piece
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
