import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();

  // If cart is empty, provide a default mock item for testing checkout immediately
  const activeItems = cartItems.length > 0 ? cartItems : [
    {
      id: 1,
      title: 'Royal Crimson Mulberry Silk Saree',
      size: 'Free Size',
      color: 'Crimson Red',
      price: 240.0,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
    }
  ];

  const calculatedTotal = cartItems.length > 0 ? totalPrice : 240.0;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Dhaka',
    notes: '',
    paymentMethod: 'Cash on Delivery',
  });

  const [placedOrder, setPlacedOrder] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) return;

    const orderSummary = {
      orderId: `TP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: formData.fullName,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city}`,
      paymentMethod: formData.paymentMethod,
      items: activeItems,
      total: calculatedTotal,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setPlacedOrder(orderSummary);
    clearCart();
  };

  return (
    <div className="bg-brand-cream min-h-screen py-8 sm:py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 sm:mb-10 text-xs uppercase tracking-wider text-brand-stone font-sans">
          <Link to="/" className="hover:text-brand-charcoal">Home</Link>
          <span className="mx-2">&bull;</span>
          <Link to="/cart" className="hover:text-brand-charcoal">Bag</Link>
          <span className="mx-2">&bull;</span>
          <span className="text-brand-red">Checkout</span>
        </div>

        {placedOrder ? (
          /* Order Confirmation Screen */
          <div className="max-w-2xl mx-auto bg-white border border-brand-border p-5 sm:p-8 md:p-12 text-center space-y-5 sm:space-y-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-brand-red-soft text-brand-red flex items-center justify-center font-serif text-2xl sm:text-3xl">
              &check;
            </div>

            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-red font-sans font-medium mb-1">
                Order Confirmed
              </p>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-charcoal font-medium">
                Thank You, {placedOrder.customer}
              </h1>
              <p className="font-mono text-xs sm:text-sm text-brand-stone mt-2">
                Order Reference: <strong className="text-brand-charcoal">{placedOrder.orderId}</strong>
              </p>
            </div>

            <div className="w-12 h-[1px] bg-brand-border mx-auto my-2"></div>

            <p className="text-xs sm:text-sm text-brand-stone font-sans max-w-md mx-auto leading-relaxed">
              Your bespoke parcel is being prepared. Our boutique concierge will contact you at <strong>{placedOrder.phone}</strong> before dispatch.
            </p>

            {/* Order Recap Card */}
            <div className="bg-brand-cream border border-brand-border p-4 sm:p-5 text-left text-xs font-sans space-y-2.5 sm:space-y-3">
              <div className="flex justify-between border-b border-brand-border pb-2 font-medium text-brand-charcoal">
                <span>Payment Mode</span>
                <span className="text-brand-red">{placedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border pb-2 text-brand-stone">
                <span>Delivery Address</span>
                <span className="text-brand-charcoal max-w-[200px] sm:max-w-xs text-right truncate">{placedOrder.address}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border pb-2 text-brand-stone">
                <span>Ordered Pieces</span>
                <span className="text-brand-charcoal">{placedOrder.items.length} item(s)</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-semibold text-brand-charcoal">
                <span className="font-serif text-base">Total Due on Delivery</span>
                <span>${placedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                to="/"
                className="bg-brand-red hover:bg-brand-red-hover text-brand-cream border border-brand-red px-6 sm:px-8 py-3.5 text-xs font-sans font-medium tracking-[0.16em] uppercase transition-all duration-300 text-center"
              >
                Return to Storefront
              </Link>
              <Link
                to="/admin"
                className="bg-white hover:bg-brand-cream text-brand-charcoal border border-brand-border px-6 sm:px-8 py-3.5 text-xs font-sans font-medium tracking-[0.16em] uppercase transition-all duration-300 text-center"
              >
                Inspect in Admin Portal
              </Link>
            </div>
          </div>
        ) : (
          /* Checkout Grid: Stacks cleanly on mobile, 2 columns on lg */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Minimalist Checkout Form */}
            <div className="lg:col-span-7 bg-white border border-brand-border p-5 sm:p-8 lg:p-10 order-2 lg:order-1">
              
              <div className="mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-brand-border">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-red font-sans font-medium mb-1">
                  Step 1 &bull; Delivery Destination
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-charcoal font-medium">
                  Delivery Details
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-charcoal font-medium mb-1.5">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ananya Sen"
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-brand-cream border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-charcoal font-medium mb-1.5">
                    Contact Phone Number * (Required for delivery)
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+880 1711-000000"
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-brand-cream border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-charcoal font-medium mb-1.5">
                    Delivery Address *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House / Apartment, Road No., Area / Sector"
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-brand-cream border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-charcoal font-medium mb-1.5">
                    City / Region
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Dhaka, Chittagong, Sylhet"
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-brand-cream border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>

                {/* Delivery Notes */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-charcoal font-medium mb-1.5">
                    Special Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Gift wrapping requested, Call 30 mins prior"
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-brand-cream border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>

                {/* Payment Method Selection: Defaults to Cash on Delivery (COD) */}
                <div className="pt-3 sm:pt-4 border-t border-brand-border">
                  <label className="block text-xs uppercase tracking-wider text-brand-charcoal font-medium mb-2 sm:mb-3">
                    Payment Method (Default)
                  </label>

                  <div className="p-4 sm:p-5 bg-brand-cream border-2 border-brand-red/80 flex items-start space-x-3">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={formData.paymentMethod === 'Cash on Delivery'}
                      onChange={() => {}}
                      className="mt-1 accent-brand-red cursor-pointer flex-shrink-0"
                    />
                    <label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm sm:text-base text-brand-charcoal font-medium">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-brand-red bg-brand-red-soft px-2 py-0.5 font-medium border border-brand-red/30">
                          Recommended
                        </span>
                      </div>
                      <p className="text-xs text-brand-stone font-sans mt-1 leading-relaxed">
                        No advance payment needed. Inspect your luxury package and pay in cash or digital wallet upon doorstep delivery.
                      </p>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 sm:py-4 bg-brand-red hover:bg-brand-red-hover text-brand-cream border border-brand-red text-xs font-sans font-medium tracking-[0.16em] uppercase transition-all duration-300 text-center"
                >
                  Place Cash on Delivery Order (${calculatedTotal.toFixed(2)})
                </button>
              </form>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 bg-white border border-brand-border p-5 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 order-1 lg:order-2">
              <div className="pb-3 sm:pb-4 border-b border-brand-border flex justify-between items-baseline">
                <h3 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
                  Order Summary
                </h3>
                <span className="text-xs text-brand-stone font-sans">
                  {activeItems.length} {activeItems.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-brand-border/60 max-h-64 sm:max-h-72 overflow-y-auto space-y-3">
                {activeItems.map((item, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 flex gap-3 sm:gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-18 sm:w-16 sm:h-20 object-cover bg-brand-cream-warm flex-shrink-0"
                    />
                    <div className="flex-1 text-xs font-sans">
                      <h4 className="font-serif text-sm text-brand-charcoal font-medium line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-brand-stone mt-0.5">
                        {item.color} &bull; {item.size} &bull; Qty: {item.quantity}
                      </p>
                      <p className="font-medium text-brand-charcoal mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="pt-3 sm:pt-4 border-t border-brand-border space-y-2 text-xs text-brand-stone font-sans">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-brand-charcoal font-medium">${calculatedTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nationwide Courier</span>
                  <span className="text-brand-red font-medium">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span>COD Handling Fee</span>
                  <span className="text-brand-stone font-medium">$0.00</span>
                </div>
                <div className="flex justify-between pt-2.5 sm:pt-3 border-t border-brand-border text-sm sm:text-base text-brand-charcoal font-semibold">
                  <span className="font-serif text-base sm:text-lg">Total Amount</span>
                  <span>${calculatedTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Assurance Callout */}
              <div className="p-3.5 sm:p-4 bg-brand-cream border border-brand-border text-[10px] sm:text-[11px] text-brand-stone space-y-1.5 leading-relaxed">
                <p className="font-semibold text-brand-charcoal uppercase tracking-wider text-[9px] sm:text-[10px]">
                  Tero Parbon Boutique Assurance
                </p>
                <p>
                  &bull; Certified authentic handloom craftsmanship from master weavers.
                </p>
                <p>
                  &bull; Dispatched in branded keepsake boxes with tamper-evident seals.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
