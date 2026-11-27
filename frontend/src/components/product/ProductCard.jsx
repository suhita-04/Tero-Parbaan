import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function ProductCard({ product }) {
  const { t, formatPrice, language } = useLanguage();

  // Category and Subcategory representation
  const categoryLabel = t(`cat_${product.category.toLowerCase()}`);
  const subcategoryLabel = product.subcategory ? t(`sub_${product.subcategory.toLowerCase()}`) : null;

  // Render bilingual title format: "রক্তজবা — Roktojoba"
  const getBilingualTitle = () => {
    if (!product.title) return '';
    if (typeof product.title === 'string') return product.title;
    
    // Extract short names
    const bnName = product.title.bn?.split('—')[0]?.trim() || '';
    const enName = product.title.en?.split('—')[0]?.trim() || '';

    if (bnName && enName && bnName !== enName) {
      return `${bnName} — ${enName}`;
    }
    return product.title[language] || product.title.bn || product.title.en || '';
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block text-center transition-all duration-300"
    >
      {/* Borderless 3:4 Portrait Image Container with Smooth Zoom Hover */}
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-canvas mb-4 shadow-gallery group-hover:shadow-lg transition-shadow duration-500">
        <img
          src={product.image}
          alt={getBilingualTitle()}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Subtle Minimalist Category Badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[8.5px] uppercase tracking-[0.2em] text-brand-black px-2 py-0.5 font-sans border border-brand-border">
          {subcategoryLabel ? `${categoryLabel} • ${subcategoryLabel}` : categoryLabel}
        </span>
      </div>

      {/* Center-Aligned Minimalist Details Below Image */}
      <div className="space-y-1.5 px-2">
        {/* Tiny Uppercase Category Label */}
        <p className="text-[9.5px] uppercase tracking-[0.22em] text-brand-stone font-sans">
          {subcategoryLabel || categoryLabel}
        </p>

        {/* Bilingual Product Title: e.g. রক্তজবা — Roktojoba */}
        <h3 className="font-serif text-base sm:text-lg text-brand-black group-hover:text-brand-crimson transition-colors duration-200 font-medium line-clamp-1">
          {getBilingualTitle()}
        </h3>
        
        {/* Price formatted in Bangladeshi Taka (৳) */}
        <p className="font-sans text-sm font-semibold text-brand-crimson pt-0.5">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
