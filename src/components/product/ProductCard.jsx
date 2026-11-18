import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white border border-brand-border flex flex-col transition-all duration-300 hover:border-brand-red/40">
      
      {/* Image Placeholder / Photography */}
      <Link to={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-brand-cream-warm block">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {product.tag && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[9px] uppercase tracking-widest text-brand-red px-2.5 py-0.5 font-sans border border-brand-border/60">
            {product.tag}
          </span>
        )}
      </Link>

      {/* Ultra-Minimal Content Area */}
      <div className="p-5 flex flex-col flex-grow text-center">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-lg text-brand-charcoal hover:text-brand-red transition-colors font-medium mb-1 line-clamp-1">
            {product.title}
          </h3>
        </Link>
        
        <p className="font-sans text-sm text-brand-stone mb-4">
          ${product.price.toFixed(2)}
        </p>

        {/* Subtle "Add to Cart" Button */}
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="mt-auto w-full py-2.5 text-[11px] uppercase tracking-[0.16em] font-sans font-medium text-brand-charcoal bg-transparent border border-brand-border hover:border-brand-red hover:text-brand-red hover:bg-brand-cream transition-all duration-300 active:scale-[0.99]"
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
}
