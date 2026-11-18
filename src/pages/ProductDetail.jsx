import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  // Find product from mock products or default to first
  const product = MOCK_PRODUCTS.find((p) => p.id === Number(id)) || MOCK_PRODUCTS[0];

  const [selectedSize, setSelectedSize] = useState(product.defaultSize || 'Free Size');
  const [selectedColor, setSelectedColor] = useState(product.defaultColor || 'Standard');

  const availableColors = [product.defaultColor || 'Natural', 'Deep Maroon', 'Vintage Cream'].filter(Boolean);
  const availableSizes = product.category === 'sarees' 
    ? ['Free Size', 'Custom Fall & Pico'] 
    : ['XS', 'S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    addToCart(product, { size: selectedSize, color: selectedColor });
  };

  return (
    <div className="bg-brand-cream min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Breadcrumb */}
        <nav className="mb-8 text-xs uppercase tracking-wider text-brand-stone font-sans">
          <Link to="/" className="hover:text-brand-charcoal">Home</Link>
          <span className="mx-2">&bull;</span>
          <Link to="/shop" className="hover:text-brand-charcoal">Collection</Link>
          <span className="mx-2">&bull;</span>
          <span className="text-brand-red">{product.title}</span>
        </nav>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Product Image Column */}
          <div className="lg:col-span-7 bg-white border border-brand-border p-4">
            <div className="aspect-[4/5] relative overflow-hidden bg-brand-cream-warm">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
              {product.tag && (
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-widest text-brand-red px-3 py-1 font-sans border border-brand-border/60">
                  {product.tag}
                </span>
              )}
            </div>
          </div>

          {/* Product Details & Selection Column */}
          <div className="lg:col-span-5 bg-white border border-brand-border p-8 lg:p-10 space-y-8">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-brand-red font-sans font-medium block mb-2">
                {product.category} &bull; Tero Parbon Exclusive
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-normal leading-tight mb-4">
                {product.title}
              </h1>
              <p className="font-sans text-2xl text-brand-charcoal font-medium">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-sm text-brand-stone font-sans leading-relaxed">
              {product.description}
            </p>

            <div className="w-full h-[1px] bg-brand-border"></div>

            {/* Color Variations */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-brand-charcoal font-medium mb-3">
                Select Shade: <span className="font-semibold text-brand-red">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-xs font-sans tracking-wide border transition-all ${
                      selectedColor === color
                        ? 'border-brand-red bg-brand-red-soft text-brand-red font-medium'
                        : 'border-brand-border hover:border-brand-charcoal bg-white text-brand-stone'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing / Specifications */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-brand-charcoal font-medium mb-3">
                Option: <span className="font-semibold text-brand-red">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs font-sans tracking-wide border transition-all ${
                      selectedSize === size
                        ? 'border-brand-red bg-brand-red-soft text-brand-red font-medium'
                        : 'border-brand-border hover:border-brand-charcoal bg-white text-brand-stone'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-4 bg-brand-red hover:bg-brand-red-hover text-brand-cream border border-brand-red text-xs font-sans font-medium tracking-[0.16em] uppercase transition-all duration-300"
              >
                Add to Shopping Bag
              </button>

              <Link
                to="/checkout"
                className="w-full block text-center py-4 bg-white hover:bg-brand-cream text-brand-charcoal hover:text-brand-red border border-brand-border hover:border-brand-red text-xs font-sans font-medium tracking-[0.16em] uppercase transition-all duration-300"
              >
                Proceed to Cash on Delivery
              </Link>
            </div>

            {/* Textile Attributes & Care */}
            <div className="pt-6 border-t border-brand-border">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-brand-charcoal mb-3">
                Boutique Craftsmanship & Specifications
              </h4>
              <ul className="space-y-2 text-xs text-brand-stone leading-relaxed">
                <li className="flex items-start">
                  <span className="text-brand-red mr-2">&bull;</span>
                  <span>Pure handloom artisan craftsmanship from Bengal.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-2">&bull;</span>
                  <span>Complimentary insured shipping nationwide with Cash on Delivery option.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-red mr-2">&bull;</span>
                  <span>Dry clean only. Packaged with luxury archival wrap.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
