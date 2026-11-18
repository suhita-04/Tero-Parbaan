import React from 'react';
import ProductCard from './ProductCard';
import { MOCK_PRODUCTS } from '../../data/mockProducts';

export default function ProductGrid({ products = MOCK_PRODUCTS }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 border border-brand-border bg-white p-8">
        <p className="font-serif text-xl text-brand-stone">No items found in this collection.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
