import React, { useState } from 'react';

const INITIAL_ORDERS = [
  {
    id: 'TP-2026-081',
    customerName: 'Ananya Sen',
    phone: '+880 1711-234567',
    address: 'Dhanmondi Road 8/A, Dhaka',
    items: 'Royal Mulberry Silk Saree (Free Size &bull; Crimson Red)',
    total: 240.0,
    status: 'Pending',
    date: 'Today, 2:15 PM',
    paymentMethod: 'Cash on Delivery',
  },
  {
    id: 'TP-2026-082',
    customerName: 'Meera Rahman',
    phone: '+880 1819-876543',
    address: 'Gulshan 2, Avenue 4, Dhaka',
    items: 'Traditional Jamdani Saree + Bespoke Zardozi Blouse',
    total: 335.0,
    status: 'Confirmed',
    date: 'Today, 11:40 AM',
    paymentMethod: 'Cash on Delivery',
  },
  {
    id: 'TP-2026-083',
    customerName: 'Dr. Farhana Chowdhury',
    phone: '+880 1912-345678',
    address: 'Uttara Sector 7, Dhaka',
    items: 'Chanderi Gold Tunic Kurti (M &bull; Ivory Beige) x 2',
    total: 170.0,
    status: 'Delivered',
    date: 'Yesterday, 4:20 PM',
    paymentMethod: 'Cash on Delivery',
  },
];

export default function OrderTable() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Confirmed':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-stone-50 text-stone-800 border-stone-200';
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className="bg-white border border-brand-border w-full min-w-0">
      {/* Table Header Controls */}
      <div className="p-4 sm:p-6 border-b border-brand-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
            Customer Orders & Fulfillment
          </h3>
          <p className="text-xs text-brand-stone font-sans mt-0.5">
            Monitor real-time Cash on Delivery orders placed across the boutique storefront.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-brand-stone font-sans">
          <span>
            Total Orders: <strong className="text-brand-charcoal">{orders.length}</strong>
          </span>
          <span className="text-[10px] bg-brand-cream border border-brand-border px-2 py-0.5 text-brand-stone hidden sm:inline-block">
            Swipe table on mobile &rarr;
          </span>
        </div>
      </div>

      {/* Orders Table Container: Horizontally scrollable without breaking mobile layout */}
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[680px] text-left border-collapse">
          <thead>
            <tr className="border-b border-brand-border bg-brand-cream/80 text-[11px] uppercase tracking-wider font-sans font-medium text-brand-stone">
              <th className="py-3.5 px-4 sm:px-6">Order ID</th>
              <th className="py-3.5 px-4 sm:px-6">Customer Name</th>
              <th className="py-3.5 px-4 sm:px-6">Delivery Details</th>
              <th className="py-3.5 px-4 sm:px-6">Total Amount</th>
              <th className="py-3.5 px-4 sm:px-6">Order Status</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border/60 text-sm font-sans">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-brand-cream/40 transition-colors cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                {/* Order ID */}
                <td className="py-4 px-4 sm:px-6 font-mono text-xs font-semibold text-brand-charcoal whitespace-nowrap">
                  {order.id}
                  <span className="block text-[10px] text-brand-stone font-sans font-normal mt-0.5">
                    {order.date}
                  </span>
                </td>

                {/* Customer Name */}
                <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                  <div className="font-medium text-brand-charcoal">{order.customerName}</div>
                  <div className="text-xs text-brand-stone">{order.phone}</div>
                </td>

                {/* Address & Items */}
                <td className="py-4 px-4 sm:px-6">
                  <div className="text-xs text-brand-charcoal max-w-[220px] truncate">{order.items}</div>
                  <div className="text-[11px] text-brand-stone max-w-[220px] truncate mt-0.5">{order.address}</div>
                </td>

                {/* Total */}
                <td className="py-4 px-4 sm:px-6 font-serif text-base text-brand-charcoal whitespace-nowrap">
                  ${order.total.toFixed(2)}
                  <span className="block text-[10px] text-brand-stone font-sans">
                    {order.paymentMethod}
                  </span>
                </td>

                {/* Status */}
                <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                  <span
                    className={`inline-block px-2.5 py-1 text-[11px] font-sans uppercase tracking-wider border rounded-none font-medium ${getStatusBadge(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="text-xs py-1 px-2 border border-brand-border bg-white text-brand-charcoal focus:outline-none focus:border-brand-red"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Order Detail Modal / Flyout */}
      {selectedOrder && (
        <div className="p-4 sm:p-6 bg-brand-cream border-t border-brand-border">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-serif text-base sm:text-lg text-brand-charcoal font-medium">
              Order Details &bull; <span className="font-mono">{selectedOrder.id}</span>
            </h4>
            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="text-xs uppercase tracking-wider text-brand-stone hover:text-brand-red"
            >
              Close Details &times;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-sans text-brand-stone bg-white p-4 border border-brand-border">
            <div>
              <p className="uppercase tracking-wider font-semibold text-brand-charcoal mb-1">Customer</p>
              <p className="text-brand-charcoal">{selectedOrder.customerName}</p>
              <p>{selectedOrder.phone}</p>
            </div>
            <div>
              <p className="uppercase tracking-wider font-semibold text-brand-charcoal mb-1">Shipping Address</p>
              <p>{selectedOrder.address}</p>
              <p className="text-brand-red font-medium mt-1">Payment: {selectedOrder.paymentMethod}</p>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <p className="uppercase tracking-wider font-semibold text-brand-charcoal mb-1">Ordered Line Items</p>
              <p className="text-brand-charcoal">{selectedOrder.items}</p>
              <p className="font-serif text-sm text-brand-charcoal font-medium mt-1">
                Total: ${selectedOrder.total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
