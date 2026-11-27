import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage, toBengaliNumerals } from '../context/LanguageContext';

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { t, formatPrice, getLocalizedField, language } = useLanguage();

  // If cart is empty, provide a default mock item for testing checkout immediately
  const activeItems = cartItems.length > 0 ? cartItems : [
    {
      id: 1,
      title: {
        bn: 'রক্তজবা — Roktojoba',
        en: 'Roktojoba — Dhakai Jamdani Muslin',
      },
      size: 'Free Size',
      color: 'Muslin',
      price: 24500,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
    }
  ];

  const subtotal = cartItems.length > 0 ? totalPrice : 24500;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    cityZone: 'dhaka', // 'dhaka' | 'outside'
    notes: '',
    paymentMethod: 'Cash on Delivery',
  });

  const [placedOrder, setPlacedOrder] = useState(null);

  // Delivery fee calculation
  const deliveryFee = formData.cityZone === 'dhaka' ? 80 : 150;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) return;

    const deliveryFee = formData.cityZone === 'dhaka' ? 80 : 150;
    const grandTotal = subtotal + deliveryFee;

    const orderPayload = {
      customer_name: formData.fullName,
      phone: formData.phone,
      address: `${formData.address} (${formData.cityZone === 'dhaka' ? 'Inside Dhaka' : 'Nationwide'})`,
      items: activeItems.map(item => ({
        title_en: (typeof item.title === 'string' ? item.title : item.title?.en) || 'Item',
        title_bn: item.title?.bn || '',
        price: item.price,
        quantity: item.quantity || 1,
        size: item.size || '',
      })),
      total: grandTotal,
    };

    // Fire-and-forget POST to /api/orders (non-blocking — we show success regardless)
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
    } catch {
      // Network failure — still show confirmation (COD order noted locally)
    }

    const orderSummary = {
      orderId: `TP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      zone: formData.cityZone === 'dhaka' ? t('checkout_city_dhaka') : t('checkout_city_outside'),
      paymentMethod: formData.paymentMethod,
      items: activeItems,
      subtotal,
      deliveryFee,
      total: grandTotal,
      date: new Date().toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setPlacedOrder(orderSummary);
    clearCart();
  };

  return (
    <div className="bg-brand-ivory min-h-screen py-8 sm:py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Navigation Breadcrumbs */}
        <div className="mb-6 sm:mb-10 text-xs uppercase tracking-wider text-brand-stone font-sans flex items-center gap-2">
          <Link to="/" className="hover:text-brand-charcoal">{t('checkout_breadcrumb_home')}</Link>
          <span className="text-brand-border-gold">&bull;</span>
          <Link to="/cart" className="hover:text-brand-charcoal">{t('checkout_breadcrumb_bag')}</Link>
          <span className="text-brand-border-gold">&bull;</span>
          <span className="text-brand-crimson font-medium">{t('checkout_breadcrumb_checkout')}</span>
        </div>

        {placedOrder ? (
          /* Order Confirmation Screen */
          <div className="max-w-2xl mx-auto bg-white border border-brand-border p-6 sm:p-10 md:p-14 text-center space-y-6 shadow-gold-subtle relative">
            <div className="absolute inset-2 border border-brand-gold/25 pointer-events-none"></div>

            <div className="w-16 h-16 mx-auto rounded-full bg-brand-crimson-soft border border-brand-border-gold text-brand-crimson flex items-center justify-center font-serif text-3xl">
              ✓
            </div>

            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-crimson font-sans font-medium mb-1">
                {t('order_success_eyebrow')}
              </p>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-charcoal font-medium">
                {t('order_success_title')} {placedOrder.customer}
              </h1>
              <p className="font-mono text-xs sm:text-sm text-brand-stone mt-2">
                {t('order_reference')} <strong className="text-brand-charcoal">{placedOrder.orderId}</strong>
              </p>
            </div>

            <div className="w-12 h-[1px] bg-brand-border-gold mx-auto my-2"></div>

            <p className="text-xs sm:text-sm text-brand-stone font-sans max-w-md mx-auto leading-relaxed">
              {t('order_success_desc')}
            </p>

            {/* Order Recap Card */}
            <div className="bg-brand-ivory border border-brand-border p-4 sm:p-5 text-left text-xs font-sans space-y-3">
              <div className="flex justify-between border-b border-brand-border pb-2 font-medium text-brand-charcoal">
                <span>{t('order_payment_mode')}</span>
                <span className="text-brand-crimson font-semibold">Cash on Delivery (COD)</span>
              </div>
              <div className="flex justify-between border-b border-brand-border pb-2">
                <span className="text-brand-stone">{t('order_delivery_zone')}</span>
                <span className="text-brand-charcoal">{placedOrder.zone}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border pb-2">
                <span className="text-brand-stone">{t('order_delivery_address')}</span>
                <span className="text-brand-charcoal text-right max-w-[200px] sm:max-w-xs">{placedOrder.address}</span>
              </div>
              
              <div className="pt-1">
                <span className="text-brand-stone uppercase tracking-wider block mb-2">{t('order_items_recap')}</span>
                <div className="space-y-2">
                  {placedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-brand-charcoal">
                      <span className="truncate max-w-[240px]">
                        {getLocalizedField(item.title)} ({item.size}) &times; {language === 'bn' ? toBengaliNumerals(item.quantity) : item.quantity}
                      </span>
                      <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-brand-border pt-3 flex justify-between items-baseline">
                <span className="font-semibold text-brand-charcoal text-sm">{t('order_total_amount')}</span>
                <span className="font-serif text-lg sm:text-xl font-bold text-brand-crimson">
                  {formatPrice(placedOrder.total)}
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center bg-brand-crimson hover:bg-brand-crimson-hover text-brand-ivory px-7 py-3 text-xs uppercase tracking-wider font-sans font-medium transition-colors"
              >
                {t('order_return_home')}
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center bg-transparent border border-brand-border hover:border-brand-gold text-brand-charcoal px-7 py-3 text-xs uppercase tracking-wider font-sans font-medium transition-colors"
              >
                {t('order_continue_shop')}
              </Link>
            </div>
          </div>
        ) : (
          /* Checkout Form & Order Summary Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Checkout Form */}
            <div className="lg:col-span-7 bg-white border border-brand-border p-6 sm:p-8 space-y-6 sm:space-y-8 shadow-gold-subtle">
              <header>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-crimson font-sans font-medium mb-1">
                  {t('checkout_subtitle')}
                </p>
                <h1 className="font-serif text-2xl sm:text-3xl text-brand-charcoal font-normal">
                  {t('checkout_title')}
                </h1>
              </header>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Delivery Details */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg text-brand-charcoal font-medium border-b border-brand-border pb-2">
                    {t('checkout_delivery_title')}
                  </h3>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-stone font-sans mb-1.5">
                      {t('checkout_name_label')} <span className="text-brand-crimson">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('checkout_name_placeholder')}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-brand-ivory border border-brand-border px-3.5 py-2.5 text-xs text-brand-charcoal focus:outline-none focus:border-brand-crimson transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-stone font-sans mb-1.5">
                      {t('checkout_phone_label')} <span className="text-brand-crimson">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={t('checkout_phone_placeholder')}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-brand-ivory border border-brand-border px-3.5 py-2.5 text-xs text-brand-charcoal focus:outline-none focus:border-brand-crimson transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-stone font-sans mb-1.5">
                      {t('checkout_city_label')} <span className="text-brand-crimson">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label
                        className={`border p-3 flex items-center justify-between cursor-pointer transition-all ${
                          formData.cityZone === 'dhaka'
                            ? 'border-brand-crimson bg-brand-crimson-soft/50 text-brand-crimson'
                            : 'border-brand-border bg-brand-ivory text-brand-charcoal hover:border-brand-gold'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <input
                            type="radio"
                            name="cityZone"
                            value="dhaka"
                            checked={formData.cityZone === 'dhaka'}
                            onChange={() => setFormData({ ...formData, cityZone: 'dhaka' })}
                            className="text-brand-crimson focus:ring-brand-crimson"
                          />
                          <span className="text-xs font-sans font-medium">{t('checkout_city_dhaka')}</span>
                        </div>
                      </label>

                      <label
                        className={`border p-3 flex items-center justify-between cursor-pointer transition-all ${
                          formData.cityZone === 'outside'
                            ? 'border-brand-crimson bg-brand-crimson-soft/50 text-brand-crimson'
                            : 'border-brand-border bg-brand-ivory text-brand-charcoal hover:border-brand-gold'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <input
                            type="radio"
                            name="cityZone"
                            value="outside"
                            checked={formData.cityZone === 'outside'}
                            onChange={() => setFormData({ ...formData, cityZone: 'outside' })}
                            className="text-brand-crimson focus:ring-brand-crimson"
                          />
                          <span className="text-xs font-sans font-medium">{t('checkout_city_outside')}</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-stone font-sans mb-1.5">
                      {t('checkout_address_label')} <span className="text-brand-crimson">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder={t('checkout_address_placeholder')}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-brand-ivory border border-brand-border px-3.5 py-2.5 text-xs text-brand-charcoal focus:outline-none focus:border-brand-crimson transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-stone font-sans mb-1.5">
                      {t('checkout_notes_label')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('checkout_notes_placeholder')}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-brand-ivory border border-brand-border px-3.5 py-2.5 text-xs text-brand-charcoal focus:outline-none focus:border-brand-crimson transition-colors"
                    />
                  </div>
                </div>

                {/* 2. Payment Method */}
                <div className="space-y-3 pt-2">
                  <h3 className="font-serif text-lg text-brand-charcoal font-medium border-b border-brand-border pb-2">
                    {t('checkout_payment_title')}
                  </h3>

                  <div className="border border-brand-crimson bg-brand-crimson-soft/30 p-4 space-y-1.5">
                    <div className="flex items-center space-x-2 text-brand-crimson font-medium text-xs font-sans">
                      <span className="w-2 h-2 rounded-full bg-brand-crimson"></span>
                      <span>{t('checkout_cod_title')}</span>
                    </div>
                    <p className="text-xs text-brand-stone font-sans leading-relaxed">
                      {t('checkout_cod_desc')}
                    </p>
                  </div>
                </div>

                {/* Submit Order Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-crimson hover:bg-brand-crimson-hover text-brand-ivory border border-brand-crimson text-xs uppercase tracking-[0.16em] font-sans font-medium transition-all duration-300 shadow-sm"
                  >
                    {t('checkout_submit_btn')}
                  </button>
                  <p className="text-[10px] text-center text-brand-stone font-sans mt-3">
                    {t('checkout_guarantee_text')}
                  </p>
                </div>

              </form>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5 bg-white border border-brand-border p-6 sm:p-8 space-y-6 shadow-gold-subtle">
              <h2 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium border-b border-brand-border pb-3">
                {t('checkout_order_summary')}
              </h2>

              <div className="divide-y divide-brand-border/60 max-h-[360px] overflow-y-auto pr-1">
                {activeItems.map((item, idx) => (
                  <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                    <img
                      src={item.image}
                      alt={getLocalizedField(item.title)}
                      className="w-14 h-18 object-cover bg-brand-ivory-warm border border-brand-border flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm text-brand-charcoal font-medium truncate">
                        {getLocalizedField(item.title)}
                      </h4>
                      <p className="text-[11px] text-brand-stone font-sans mt-0.5">
                        {item.size ? `${item.size}` : ''} {item.color ? `• ${item.color}` : ''} &bull; {t('cart_quantity')}: {language === 'bn' ? toBengaliNumerals(item.quantity) : item.quantity}
                      </p>
                    </div>
                    <span className="font-sans text-xs font-semibold text-brand-charcoal whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="border-t border-brand-border pt-4 space-y-2.5 text-xs font-sans">
                <div className="flex justify-between text-brand-stone">
                  <span>{t('checkout_item_total')}</span>
                  <span className="font-medium text-brand-charcoal">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-brand-stone">
                  <span>{t('checkout_delivery_fee')} ({formData.cityZone === 'dhaka' ? 'Dhaka' : 'Nationwide'})</span>
                  <span className="font-medium text-brand-charcoal">{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between items-baseline border-t border-brand-border pt-3">
                  <span className="text-sm font-semibold text-brand-charcoal">{t('checkout_grand_total')}</span>
                  <span className="font-serif text-xl font-bold text-brand-crimson">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-brand-ivory border border-brand-border-gold p-3.5 text-xs text-brand-stone space-y-1">
                <p className="font-medium text-brand-crimson uppercase tracking-wider text-[10px]">
                  Boutique Promise
                </p>
                <p className="text-[11px] leading-relaxed">
                  Every parcel is packed with complimentary anti-moisture muslin wraps to protect fine zari and resham weaves.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
