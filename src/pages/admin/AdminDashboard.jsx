import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductUploadForm from '../../components/admin/ProductUploadForm';
import OrderTable from '../../components/admin/OrderTable';
import { MOCK_PRODUCTS } from '../../data/mockProducts';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [productsList, setProductsList] = useState(MOCK_PRODUCTS);
  const [isMobileSidebarCollapsed, setIsMobileSidebarCollapsed] = useState(false);

  const handleProductAdded = (newProduct) => {
    setProductsList((prev) => [newProduct, ...prev]);
  };

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Secure Top Bar */}
      <header className="bg-brand-charcoal text-white border-b border-brand-charcoal/80 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="font-serif text-lg sm:text-xl tracking-widest uppercase text-brand-cream">
                Tero Parbon
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-brand-stone bg-white/10 px-2 py-0.5 font-sans">
                Admin Console
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6 text-xs font-sans">
            <div className="hidden md:flex items-center space-x-2 text-stone-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Encrypted Session (Boutique Tier)</span>
            </div>

            <Link
              to="/"
              className="text-stone-300 hover:text-white border border-stone-600 hover:border-stone-400 px-2.5 py-1 text-xs transition-colors"
            >
              &larr; <span className="hidden xs:inline">View</span> Storefront
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace with Responsive Stacked/Collapsible Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Sidebar Menu: Collapsible / Segmented Control on Mobile, Sticky on Desktop */}
          <aside className="lg:col-span-3 bg-white border border-brand-border p-4 sm:p-6 space-y-4 sm:space-y-6 w-full">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-red font-sans font-medium mb-0.5">
                  Workspace
                </p>
                <h2 className="font-serif text-lg sm:text-xl text-brand-charcoal font-medium">
                  Atelier Management
                </h2>
              </div>

              {/* Mobile collapse toggle button */}
              <button
                type="button"
                onClick={() => setIsMobileSidebarCollapsed(!isMobileSidebarCollapsed)}
                className="lg:hidden text-xs text-brand-stone hover:text-brand-charcoal border border-brand-border px-2 py-1 flex items-center gap-1 font-sans"
                aria-label="Toggle workspace details"
              >
                <span>{isMobileSidebarCollapsed ? 'Expand Info' : 'Collapse'}</span>
                <span className="text-[10px]">{isMobileSidebarCollapsed ? '▼' : '▲'}</span>
              </button>
            </div>

            {/* Navigation Tabs: Responsive 2-column strip on Mobile, Vertical list on Desktop */}
            <nav className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-1 text-sm font-sans">
              {/* Products Tab */}
              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className={`flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 transition-colors text-left border ${
                  activeTab === 'products'
                    ? 'bg-brand-red-soft text-brand-red font-semibold border-brand-red/40 lg:border-l-2 lg:border-brand-red'
                    : 'text-brand-stone hover:text-brand-charcoal hover:bg-brand-cream border-brand-border lg:border-transparent'
                }`}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <svg className="w-4 h-4 stroke-[1.5] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="text-xs sm:text-sm">Products</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 bg-white border border-brand-border text-brand-charcoal font-medium">
                  {productsList.length}
                </span>
              </button>

              {/* Orders Tab */}
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 transition-colors text-left border ${
                  activeTab === 'orders'
                    ? 'bg-brand-red-soft text-brand-red font-semibold border-brand-red/40 lg:border-l-2 lg:border-brand-red'
                    : 'text-brand-stone hover:text-brand-charcoal hover:bg-brand-cream border-brand-border lg:border-transparent'
                }`}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <svg className="w-4 h-4 stroke-[1.5] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="text-xs sm:text-sm">Orders</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-800 font-medium whitespace-nowrap">
                  3 New
                </span>
              </button>
            </nav>

            {/* Collapsible Info Section on Mobile */}
            <div className={`${isMobileSidebarCollapsed ? 'hidden lg:block' : 'block'} pt-4 lg:pt-6 border-t border-brand-border space-y-3`}>
              <div className="p-3 bg-brand-cream text-xs text-brand-stone space-y-1">
                <p className="font-semibold text-brand-charcoal">Cash on Delivery Verification</p>
                <p className="text-[11px] leading-relaxed">
                  All customer orders default to COD. Call customers to verify deliveries before printing shipping labels.
                </p>
              </div>

              <div className="text-[11px] text-brand-stone font-sans">
                Storefront Version: <strong className="text-brand-charcoal">v1.2.0 (Boutique)</strong>
              </div>
            </div>
          </aside>

          {/* Main Workspace Content (min-w-0 prevents overflow on mobile when containing tables) */}
          <main className="lg:col-span-9 w-full min-w-0 space-y-6 sm:space-y-8">
            {activeTab === 'products' ? (
              <div className="space-y-6 sm:space-y-8 w-full min-w-0">
                {/* Product Upload Form */}
                <ProductUploadForm onProductAdded={handleProductAdded} />

                {/* Existing Catalog Preview */}
                <div className="bg-white border border-brand-border p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 pb-4 border-b border-brand-border gap-2">
                    <h3 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
                      Current Catalog Overview ({productsList.length} items)
                    </h3>
                    <span className="text-xs text-brand-stone font-sans">
                      Live in Storefront
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {productsList.map((product) => (
                      <div
                        key={product.id}
                        className="border border-brand-border bg-brand-cream p-3 flex flex-col justify-between"
                      >
                        <div className="aspect-[4/5] bg-white overflow-hidden mb-3">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-brand-red font-medium">
                            {product.category}
                          </span>
                          <h4 className="font-serif text-sm text-brand-charcoal font-medium line-clamp-1">
                            {product.title}
                          </h4>
                          <p className="font-sans text-xs text-brand-stone font-medium mt-1">
                            ${product.price ? product.price.toFixed(2) : product.basePrice?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <OrderTable />
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
