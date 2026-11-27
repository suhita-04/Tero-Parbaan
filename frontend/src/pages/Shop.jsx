import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { useLanguage, toBengaliNumerals } from '../context/LanguageContext';
import {
  normalizeApiProduct,
  translateCategoryLabel,
  translateSubcategoryLabel,
} from '../utils/products';

const DEFAULT_CATEGORIES = ['Saree', 'Blouse', 'Kurti', 'Stole'];
const DEFAULT_SAREE_SUBS = ['Shuti', 'Handloom', 'Muslin', 'Silk'];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const { t, language } = useLanguage();

  // API products & categories state — fallback to mock/defaults if DB is empty or unreachable
  const [apiProducts, setApiProducts] = useState(null); // null = not yet fetched
  const [dynamicCategories, setDynamicCategories] = useState(DEFAULT_CATEGORIES);
  const [subcategoriesByParent, setSubcategoriesByParent] = useState({
    Saree: DEFAULT_SAREE_SUBS,
  });

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        if (data.ok && Array.isArray(data.products) && data.products.length > 0) {
          setApiProducts(data.products.map(normalizeApiProduct));
        } else {
          setApiProducts([]); // empty DB → fall back to mock
        }
      })
      .catch(() => setApiProducts([])); // network error → fall back to mock

    fetch('/api/categories')
      .then(r => r.json())
      .then(data => {
        if (data.ok && Array.isArray(data.categories) && data.categories.length > 0) {
          setDynamicCategories(data.categories);
        }
        if (data.ok && data.subcategoriesByParent && typeof data.subcategoriesByParent === 'object') {
          setSubcategoriesByParent(data.subcategoriesByParent);
        }
      })
      .catch(() => {}); // fall back gracefully to default categories
  }, []);

  // Source: DB products if available, otherwise mock catalog
  const SOURCE_PRODUCTS = (apiProducts !== null && apiProducts.length > 0)
    ? apiProducts
    : MOCK_PRODUCTS;
  
  const rawCategory = searchParams.get('category') || 'all';
  const rawSub = searchParams.get('sub') || 'all';
  const searchQuery = searchParams.get('search') || '';

  // Merge API categories with any distinct categories present on active products
  const allCategories = useMemo(() => {
    const seen = new Set();
    const list = [];
    for (const c of [...dynamicCategories, ...SOURCE_PRODUCTS.map(p => p.category)]) {
      const clean = String(c || '').trim();
      if (!clean) continue;
      const key = clean.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        list.push(clean);
      }
    }
    return list;
  }, [dynamicCategories, SOURCE_PRODUCTS]);

  // Normalize category parameter for matching (supports built-in plurals + custom categories)
  const getNormalizedCategory = (cat) => {
    const c = String(cat || '').trim().toLowerCase();
    if (!c || c === 'all') return 'all';
    if (c === 'saree' || c === 'sarees') return 'Saree';
    if (c === 'blouse' || c === 'blouses') return 'Blouse';
    if (c === 'kurti' || c === 'kurtis') return 'Kurti';
    if (c === 'stole' || c === 'stoles') return 'Stole';
    const matched = allCategories.find((item) => item.toLowerCase() === c);
    return matched || cat;
  };

  const selectedCategory = getNormalizedCategory(rawCategory);
  const selectedSub = rawSub.toLowerCase();

  // Primary category configuration
  const MAIN_CATEGORIES = [
    { label: t('cat_all'), value: 'all' },
    ...allCategories.map((cat) => ({
      label: translateCategoryLabel(t, cat),
      value: cat,
    })),
  ];

  // Subcategories for the currently selected category
  const activeSubcategories = useMemo(() => {
    if (selectedCategory === 'all') return [];
    const matchedParentKey = Object.keys(subcategoriesByParent).find(
      (k) => k.toLowerCase() === selectedCategory.toLowerCase()
    );
    const fromApi = matchedParentKey ? subcategoriesByParent[matchedParentKey] : [];
    const fromProducts = SOURCE_PRODUCTS
      .filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase() && p.subcategory)
      .map((p) => p.subcategory);

    const seen = new Set();
    const combined = [];
    for (const sub of [...(selectedCategory === 'Saree' ? DEFAULT_SAREE_SUBS : []), ...fromApi, ...fromProducts]) {
      const clean = String(sub || '').trim();
      if (!clean) continue;
      const key = clean.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        combined.push(clean);
      }
    }
    return combined;
  }, [selectedCategory, subcategoriesByParent, SOURCE_PRODUCTS]);

  // Filter products based on category, subcategory, and optional search query
  const filteredProducts = SOURCE_PRODUCTS.filter((product) => {
    // 1. Category Filter
    if (selectedCategory !== 'all') {
      const matchesCategory = product.category?.toLowerCase() === selectedCategory.toLowerCase();
      if (!matchesCategory) return false;

      // 2. Subcategory Filter
      if (selectedSub !== 'all') {
        if (product.subcategory?.toLowerCase() !== selectedSub) return false;
      }
    }

    // 3. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const bnTitle = product.title?.bn?.toLowerCase() || '';
      const enTitle = product.title?.en?.toLowerCase() || '';
      const descBn = product.description?.bn?.toLowerCase() || '';
      const descEn = product.description?.en?.toLowerCase() || '';
      const fabric = (product.fabric?.en || '') + ' ' + (product.fabric?.bn || '');
      const weave = (product.weave?.en || '') + ' ' + (product.weave?.bn || '');

      const matchesSearch =
        bnTitle.includes(q) ||
        enTitle.includes(q) ||
        descBn.includes(q) ||
        descEn.includes(q) ||
        fabric.toLowerCase().includes(q) ||
        weave.toLowerCase().includes(q);

      if (!matchesSearch) return false;
    }

    return true;
  });

  // Calculate dynamic header title
  const getHeaderTitle = () => {
    if (searchQuery) {
      return language === 'bn' ? `অনুসন্ধান: "${searchQuery}"` : `Search: "${searchQuery}"`;
    }
    if (selectedCategory === 'all') return t('cat_all');
    if (selectedSub !== 'all') {
      const subLabel = translateSubcategoryLabel(t, rawSub);
      const catLabel = translateCategoryLabel(t, selectedCategory);
      return selectedCategory === 'Saree' && language === 'bn'
        ? `${subLabel} শাড়ি`
        : `${subLabel} ${catLabel}`;
    }
    return translateCategoryLabel(t, selectedCategory);
  };

  const countDisplay = language === 'bn' ? toBengaliNumerals(filteredProducts.length) : filteredProducts.length;

  return (
    <div className="bg-brand-canvas min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header Title & Counter */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-crimson font-sans font-medium mb-1.5">
            {t('atelier_collection')}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-black capitalize font-normal">
            {getHeaderTitle()}
          </h1>
          <div className="w-10 h-[1px] bg-brand-gold mx-auto my-3 sm:my-4"></div>
          <p className="text-xs sm:text-sm text-brand-stone font-sans font-light">
            {t('showing_items')} {countDisplay} {t('handcrafted_designs')}
          </p>
        </div>

        {/* 1. Sleek, Minimalist Primary Category Filter Tabs */}
        <div className="flex justify-start sm:justify-center items-center space-x-6 sm:space-x-10 mb-6 border-b border-brand-border pb-3 overflow-x-auto no-scrollbar">
          {MAIN_CATEGORIES.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.value.toLowerCase();
            const targetUrl = cat.value === 'all' ? '/shop' : `/shop?category=${encodeURIComponent(cat.value.toLowerCase())}`;
            return (
              <Link
                key={cat.value}
                to={targetUrl}
                className={`text-[11px] sm:text-xs uppercase tracking-boutique transition-all pb-2 border-b-2 whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? 'text-brand-crimson border-brand-crimson font-semibold'
                    : 'text-brand-stone hover:text-brand-black hover:border-brand-gold border-transparent'
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>

        {/* 2. Nested Subcategory Pills (Visible whenever active category has subcategories) */}
        {activeSubcategories.length > 0 && (
          <div className="flex justify-start sm:justify-center items-center space-x-2 sm:space-x-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
            <span className="text-[10px] uppercase tracking-wider text-brand-stone font-sans mr-1 hidden sm:inline-block">
              {t('sub_weave_type')}
            </span>
            <Link
              to={`/shop?category=${encodeURIComponent(selectedCategory.toLowerCase())}`}
              className={`text-[10px] sm:text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-sm transition-all whitespace-nowrap border ${
                selectedSub === 'all'
                  ? 'bg-brand-crimson text-white border-brand-crimson font-medium shadow-sm'
                  : 'bg-white text-brand-stone hover:text-brand-black border-brand-border hover:border-brand-gold'
              }`}
            >
              {selectedCategory === 'Saree' ? t('sub_all') : t('cat_all')}
            </Link>
            {activeSubcategories.map((sub) => {
              const isActive = selectedSub === sub.toLowerCase();
              const subTargetUrl = `/shop?category=${encodeURIComponent(selectedCategory.toLowerCase())}&sub=${encodeURIComponent(sub.toLowerCase())}`;
              return (
                <Link
                  key={sub}
                  to={subTargetUrl}
                  className={`text-[10px] sm:text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-sm transition-all whitespace-nowrap border ${
                    isActive
                      ? 'bg-brand-crimson text-white border-brand-crimson font-medium shadow-sm'
                      : 'bg-white text-brand-stone hover:text-brand-black border-brand-border hover:border-brand-gold'
                  }`}
                >
                  {translateSubcategoryLabel(t, sub)}
                </Link>
              );
            })}
          </div>
        )}

        {/* 3. Airy 3-Column Boutique Product Grid */}
        <ProductGrid products={filteredProducts} />

      </div>
    </div>
  );
}
