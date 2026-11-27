import React from 'react';
import ProductCard from './ProductCard';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { useLanguage } from '../../context/LanguageContext';

export default function ProductGrid({ products = MOCK_PRODUCTS }) {
  const { t } = useLanguage();

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 bg-white border border-brand-border p-8 max-w-xl mx-auto shadow-sm">
        <p className="font-serif text-lg text-brand-stone">{t('no_items_found')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 xl:gap-14">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
