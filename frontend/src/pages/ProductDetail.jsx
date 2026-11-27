import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const BLOUSE_KURTI_SIZES = ['34', '36', '38', '40', '42'];

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { t, formatPrice, getLocalizedField, language } = useLanguage();

  // Find product from mock products or default to first
  const product = MOCK_PRODUCTS.find((p) => p.id === Number(id)) || MOCK_PRODUCTS[0];

  const categoryLower = product.category?.toLowerCase() || '';
  const isBlouseOrKurti = categoryLower === 'blouse' || categoryLower === 'kurti';
  const isSaree = categoryLower === 'saree';
  const isStole = categoryLower === 'stole';

  // State for conditional sizing
  const [selectedSize, setSelectedSize] = useState(isBlouseOrKurti ? '38' : 'Free Size');
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Bilingual title helper
  const getBilingualTitle = () => {
    if (!product.title) return '';
    if (typeof product.title === 'string') return product.title;
    const bnName = product.title.bn?.split('—')[0]?.trim() || '';
    const enName = product.title.en?.split('—')[0]?.trim() || '';
    if (bnName && enName && bnName !== enName) {
      return `${bnName} — ${enName}`;
    }
    return product.title[language] || product.title.bn || product.title.en || '';
  };

  const localizedDesc = getLocalizedField(product.description, '');
  const localizedFabric = getLocalizedField(product.fabric, '');
  const localizedWeave = getLocalizedField(product.weave, '');
  const localizedCare = getLocalizedField(product.care, '');
  const localizedTag = getLocalizedField(product.tag, product.category);

  const categoryLabel = t(`cat_${categoryLower}`);
  const subcategoryLabel = product.subcategory ? t(`sub_${product.subcategory.toLowerCase()}`) : null;

  const handleAddToCart = () => {
    const sizeToPass = isBlouseOrKurti ? selectedSize : t('pdp_free_size');
    addToCart(product, {
      size: sizeToPass,
      color: subcategoryLabel || categoryLabel,
    });

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2200);
  };

  return (
    <div className="bg-brand-canvas min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Navigation Breadcrumb */}
        <nav className="mb-6 sm:mb-8 text-xs uppercase tracking-wider text-brand-stone font-sans flex items-center flex-wrap gap-1.5">
          <Link to="/" className="hover:text-brand-black transition-colors">{t('pdp_breadcrumb_home')}</Link>
          <span className="text-brand-border-gold">&bull;</span>
          <Link to="/shop" className="hover:text-brand-black transition-colors">{t('pdp_breadcrumb_shop')}</Link>
          <span className="text-brand-border-gold">&bull;</span>
          <Link
            to={`/shop?category=${product.category.toLowerCase()}`}
            className="hover:text-brand-black transition-colors"
          >
            {categoryLabel}
          </Link>
          {product.subcategory && (
            <>
              <span className="text-brand-border-gold">&bull;</span>
              <Link
                to={`/shop?category=sarees&sub=${product.subcategory.toLowerCase()}`}
                className="hover:text-brand-black transition-colors"
              >
                {subcategoryLabel}
              </Link>
            </>
          )}
          <span className="text-brand-border-gold">&bull;</span>
          <span className="text-brand-crimson font-medium truncate max-w-[200px] sm:max-w-xs">{getBilingualTitle()}</span>
        </nav>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Large 3:4 Product Image Column */}
          <div className="lg:col-span-7 bg-white border border-brand-border p-3 sm:p-5 shadow-gold-subtle relative">
            <div className="aspect-[3/4] relative overflow-hidden bg-brand-canvas group">
              <img
                src={product.image}
                alt={getBilingualTitle()}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              {localizedTag && (
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[10px] uppercase tracking-widest text-brand-crimson px-3 py-1 font-sans border border-brand-border-gold">
                  {localizedTag}
                </span>
              )}
            </div>
          </div>

          {/* Product Details & Purchase Actions Column */}
          <div className="lg:col-span-5 bg-white border border-brand-border p-6 sm:p-8 lg:p-10 space-y-6 shadow-gold-subtle">
            
            {/* Header: Category Badge, Title, Price */}
            <div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-brand-crimson font-sans font-medium block mb-2">
                {categoryLabel} {subcategoryLabel ? `• ${subcategoryLabel}` : ''} • {t('pdp_atelier_tag')}
              </span>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-brand-black font-normal leading-tight mb-3">
                {getBilingualTitle()}
              </h1>

              <div className="flex items-baseline space-x-3">
                <p className="font-sans text-2xl sm:text-3xl text-brand-crimson font-bold">
                  {formatPrice(product.price)}
                </p>
                <span className="text-xs uppercase tracking-wider text-brand-stone font-sans">
                  (COD Available)
                </span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-brand-border"></div>

            {/* Description Narrative */}
            <p className="text-sm text-brand-stone font-sans font-light leading-relaxed">
              {localizedDesc}
            </p>

            {/* Conditional Sizing Section */}
            {isBlouseOrKurti ? (
              /* Numeric Size Selector for Blouse and Kurti */
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-sans font-medium text-brand-black">
                    {t('pdp_select_size')}
                  </span>
                  <span className="text-[11px] text-brand-crimson hover:underline cursor-pointer font-sans">
                    {t('pdp_size_guide')}
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {BLOUSE_KURTI_SIZES.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 text-xs font-sans font-medium uppercase tracking-wider transition-all border ${
                          isSelected
                            ? 'bg-brand-crimson text-white border-brand-crimson shadow-sm'
                            : 'bg-transparent text-brand-black border-brand-border hover:border-brand-gold hover:bg-brand-canvas'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-brand-stone font-sans italic">
                  * Tailored boutique fit. Select standard bust measurement in inches.
                </p>
              </div>
            ) : isSaree ? (
              /* Drape Specs for Saree */
              <div className="bg-brand-canvas border border-brand-border-gold p-4 space-y-1">
                <span className="text-xs uppercase tracking-wider font-sans font-medium text-brand-crimson block">
                  {t('pdp_saree_dimensions')}
                </span>
                <p className="text-xs text-brand-black font-sans leading-relaxed">
                  {t('pdp_saree_dimensions_text')}
                </p>
              </div>
            ) : isStole ? (
              /* Drape Specs for Stole */
              <div className="bg-brand-canvas border border-brand-border-gold p-4 space-y-1">
                <span className="text-xs uppercase tracking-wider font-sans font-medium text-brand-crimson block">
                  {t('pdp_stole_dimensions')}
                </span>
                <p className="text-xs text-brand-black font-sans leading-relaxed">
                  {t('pdp_stole_dimensions_text')}
                </p>
              </div>
            ) : null}

            {/* Add to Shopping Bag Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={addedAnimation}
                className={`w-full py-4 text-xs font-sans font-medium uppercase tracking-[0.18em] transition-all duration-300 flex items-center justify-center space-x-2 border ${
                  addedAnimation
                    ? 'bg-emerald-800 border-emerald-800 text-white'
                    : 'bg-brand-crimson hover:bg-brand-crimson-hover border-brand-crimson text-white hover:-translate-y-0.5 active:translate-y-0 shadow-sm'
                }`}
              >
                {addedAnimation ? (
                  <span>{t('pdp_added_success')}</span>
                ) : (
                  <>
                    <svg className="w-4 h-4 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span>{t('pdp_add_to_bag')}</span>
                  </>
                )}
              </button>
            </div>

            {/* Garment Specifications Details */}
            <div className="pt-4 border-t border-brand-border space-y-3.5 text-xs font-sans">
              {localizedFabric && (
                <div className="flex justify-between items-start py-1 border-b border-brand-border/60">
                  <span className="text-brand-stone uppercase tracking-wider">{t('pdp_fabric_label')}:</span>
                  <span className="text-brand-black font-medium text-right ml-4">{localizedFabric}</span>
                </div>
              )}
              {localizedWeave && (
                <div className="flex justify-between items-start py-1 border-b border-brand-border/60">
                  <span className="text-brand-stone uppercase tracking-wider">{t('pdp_weave_label')}:</span>
                  <span className="text-brand-black font-medium text-right ml-4">{localizedWeave}</span>
                </div>
              )}
              {localizedCare && (
                <div className="flex justify-between items-start py-1 border-b border-brand-border/60">
                  <span className="text-brand-stone uppercase tracking-wider">{t('pdp_care_label')}:</span>
                  <span className="text-brand-black font-medium text-right ml-4">{localizedCare}</span>
                </div>
              )}
            </div>

            {/* Delivery Reassurance & WhatsApp Direct Inquiry */}
            <div className="pt-3 border-t border-brand-border space-y-3">
              <div className="flex items-start space-x-3 text-xs text-brand-stone">
                <span className="text-brand-crimson text-sm mt-0.5">✦</span>
                <div>
                  <p className="font-medium text-brand-black uppercase tracking-wider">{t('pdp_shipping_badge')}</p>
                  <p className="font-light text-[11px] leading-relaxed mt-0.5">{t('pdp_shipping_desc')}</p>
                </div>
              </div>

              {/* Quick WhatsApp Inquiry Link for this Product */}
              <div className="pt-1">
                <a
                  href={`https://wa.me/8801700000000?text=${encodeURIComponent(
                    `Hello Tero Parbaan, I would like to inquire about: ${getBilingualTitle()} (${formatPrice(product.price)})`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-sans font-medium text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 border border-emerald-200 transition-colors w-full justify-center"
                >
                  <span>💬</span>
                  <span>{t('whatsapp_inquire')} for this Piece</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
