import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import { MOCK_PRODUCTS } from '../data/mockProducts';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';

  const filteredProducts = selectedCategory === 'all'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase());

  const categoryTabs = [
    { label: 'All Collections', value: 'all' },
    { label: 'Sarees', value: 'sarees' },
    { label: 'Kurtis', value: 'kurtis' },
    { label: 'Blouses', value: 'blouses' },
  ];

  return (
    <div className="bg-brand-cream min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-red font-sans font-medium mb-1.5 sm:mb-2">
            The Atelier Collection
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-charcoal capitalize font-normal">
            {selectedCategory === 'all' ? 'All Collections' : selectedCategory}
          </h1>
          <div className="w-12 h-[1px] bg-brand-border mx-auto my-3 sm:my-4"></div>
        </div>

        {/* Responsive Category Filter Tabs */}
        <div className="flex justify-start sm:justify-center items-center space-x-4 sm:space-x-8 lg:space-x-10 mb-8 sm:mb-14 border-b border-brand-border pb-3 sm:pb-4 overflow-x-auto no-scrollbar">
          {categoryTabs.map((tab) => {
            const isActive = selectedCategory.toLowerCase() === tab.value.toLowerCase();
            return (
              <Link
                key={tab.value}
                to={tab.value === 'all' ? '/shop' : `/shop?category=${tab.value}`}
                className={`text-[11px] sm:text-xs uppercase tracking-boutique transition-all pb-2 border-b-2 whitespace-nowrap flex-shrink-0 ${isActive
                  ? 'text-brand-red border-brand-red font-semibold'
                  : 'text-brand-stone hover:text-brand-charcoal border-transparent'
                  }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Responsive 1 / 2 / 3 column ProductGrid */}
        <ProductGrid products={filteredProducts} />

      </div>
    </div>
  );
}
