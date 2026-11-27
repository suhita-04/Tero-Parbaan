import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

// ─── Status Badge ────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    Pending:  'bg-yellow-50 text-yellow-700 border-yellow-200',
    Accepted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Rejected: 'bg-red-50 text-red-700 border-red-200',
  };
  return (
    <span className={`inline-block px-2 py-0.5 text-[10px] font-sans font-semibold uppercase tracking-wider border rounded-full ${map[status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
      {status}
    </span>
  );
}

// ─── Product Form ─────────────────────────────────────────────────────────────
function ProductForm({ initial, onSave, onCancel }) {
  const CATEGORIES = ['Saree', 'Blouse', 'Kurti', 'Stole'];
  const SAREE_SUBS = ['Shuti', 'Handloom', 'Muslin', 'Silk'];

  const empty = {
    id: null, title_en: '', title_bn: '', category: 'Saree',
    subcategory: '', price: '', fabric: '', description: '',
    image_url: '', in_stock: true,
  };

  const [form, setForm] = useState(initial || empty);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setSaving(true);
    try {
      await onSave(form);
    } catch (error) {
      setErr(error.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const isSaree = form.category === 'Saree';

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm font-sans">
      {err && <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">{err}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Title (EN) *</label>
          <input required value={form.title_en} onChange={e => set('title_en', e.target.value)}
            placeholder="e.g. Roktojoba Jamdani" className="inp" />
        </div>
        <div>
          <label className="label">Title (বাংলা)</label>
          <input value={form.title_bn} onChange={e => set('title_bn', e.target.value)}
            placeholder="e.g. রক্তজবা জামদানি" className="inp" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="label">Category *</label>
          <select required value={form.category} onChange={e => set('category', e.target.value)} className="inp">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        {isSaree && (
          <div>
            <label className="label">Subcategory</label>
            <select value={form.subcategory} onChange={e => set('subcategory', e.target.value)} className="inp">
              <option value="">— Any —</option>
              {SAREE_SUBS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        )}
        <div>
          <label className="label">Price ৳ *</label>
          <input required type="number" min="0" value={form.price} onChange={e => set('price', e.target.value)}
            placeholder="e.g. 24500" className="inp" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Fabric / Quality</label>
          <input value={form.fabric} onChange={e => set('fabric', e.target.value)}
            placeholder="e.g. 100% Muslin Cotton" className="inp" />
        </div>
        <div>
          <label className="label">Image URL</label>
          <input value={form.image_url} onChange={e => set('image_url', e.target.value)}
            placeholder="https://..." className="inp" />
        </div>
      </div>

      <div>
        <label className="label">Description</label>
        <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)}
          placeholder="Detailed product description..." className="inp resize-none" />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="in_stock" checked={form.in_stock} onChange={e => set('in_stock', e.target.checked)}
          className="w-4 h-4 text-brand-crimson border-brand-border rounded focus:ring-brand-crimson" />
        <label htmlFor="in_stock" className="text-xs text-brand-black font-medium cursor-pointer">In Stock</label>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving}
          className="flex-1 py-2.5 bg-brand-crimson hover:bg-brand-crimson-hover disabled:opacity-60 text-white text-xs uppercase tracking-wider font-medium transition-colors">
          {saving ? 'Saving...' : form.id ? 'Update Product' : 'Add Product'}
        </button>
        <button type="button" onClick={onCancel}
          className="px-5 py-2.5 border border-brand-border text-brand-stone hover:text-brand-black hover:border-brand-black text-xs uppercase tracking-wider transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function ParbondeskDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');

  // Products state
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsErr, setProductsErr] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // Orders state
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersErr, setOrdersErr] = useState('');

  const { adminToken, clearAdminToken } = useAdminAuth();
  const token = adminToken;
  const authHeader = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  const handleLogout = () => {
    clearAdminToken();
    navigate('/parbondesk/login', { replace: true });
  };

  // ── Products API ──
  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    setProductsErr('');
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.ok) setProducts(data.products);
      else setProductsErr(data.error || 'Failed to load products');
    } catch {
      setProductsErr('Network error loading products');
    } finally {
      setProductsLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleSaveProduct = async (form) => {
    const isEdit = !!form.id;
    const res = await fetch('/api/products', {
      method: isEdit ? 'PUT' : 'POST',
      headers: authHeader,
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
      }),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Save failed');
    setShowForm(false);
    setEditProduct(null);
    fetchProducts();
  };

  const handleDeleteProduct = async (id, titleEn) => {
    if (!window.confirm(`Delete "${titleEn}"? This cannot be undone.`)) return;
    const res = await fetch('/api/products', {
      method: 'DELETE',
      headers: authHeader,
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data.ok) fetchProducts();
    else alert(data.error || 'Delete failed');
  };

  // ── Orders API ──
  const fetchOrders = useCallback(async () => {
    setOrdersLoading(true);
    setOrdersErr('');
    try {
      const res = await fetch('/api/orders', { headers: authHeader });
      const data = await res.json();
      if (data.ok) setOrders(data.orders);
      else setOrdersErr(data.error || 'Failed to load orders');
    } catch {
      setOrdersErr('Network error loading orders');
    } finally {
      setOrdersLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (activeTab === 'orders') fetchOrders();
  }, [activeTab, fetchOrders]);

  const handleOrderStatus = async (id, status) => {
    const res = await fetch('/api/orders', {
      method: 'PATCH',
      headers: authHeader,
      body: JSON.stringify({ id, status }),
    });
    const data = await res.json();
    if (data.ok) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    } else {
      alert(data.error || 'Status update failed');
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Top Bar */}
      <header className="bg-[#1A1A1A] text-white border-b border-[#C5A059]/30 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-serif text-lg tracking-widest uppercase text-[#FAF8F5] hover:text-[#C5A059] transition-colors">
              Tero Parbaan
            </Link>
            <span className="text-[9px] uppercase tracking-widest text-[#C5A059]/80 bg-white/5 border border-[#C5A059]/20 px-2 py-0.5 font-sans">
              Operations Desk
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 text-xs font-sans">
            <div className="hidden sm:flex items-center gap-2 text-stone-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Session</span>
            </div>
            <Link to="/" className="text-stone-400 hover:text-white border border-stone-600 hover:border-stone-400 px-2.5 py-1 transition-colors">
              &larr; Storefront
            </Link>
            <button onClick={handleLogout}
              className="text-stone-400 hover:text-white border border-stone-600 hover:border-red-400 hover:text-red-300 px-2.5 py-1 transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="font-serif text-2xl sm:text-3xl text-brand-black font-medium">Admin Dashboard</h1>
          <p className="text-xs text-brand-stone font-sans mt-1">Manage products and customer orders</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-brand-border mb-6 gap-1">
          {['products', 'orders'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 text-xs uppercase tracking-wider font-sans border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-brand-crimson text-brand-crimson font-semibold'
                  : 'border-transparent text-brand-stone hover:text-brand-black'
              }`}>
              {tab === 'products' ? '📦 Products' : '📋 Orders'}
            </button>
          ))}
        </div>

        {/* ─── PRODUCTS TAB ─── */}
        {activeTab === 'products' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-brand-black">Product Catalog</h2>
              {!showForm && (
                <button onClick={() => { setShowForm(true); setEditProduct(null); }}
                  className="px-4 py-2 bg-brand-crimson hover:bg-brand-crimson-hover text-white text-xs uppercase tracking-wider font-sans transition-colors">
                  + Add Product
                </button>
              )}
            </div>

            {/* Add / Edit Form */}
            {showForm && (
              <div className="bg-white border border-brand-border p-5 sm:p-6 shadow-sm">
                <h3 className="font-serif text-lg text-brand-black mb-4">
                  {editProduct ? `Edit: ${editProduct.title_en}` : 'New Product'}
                </h3>
                <style>{`.inp { width:100%; padding:0.5rem 0.75rem; background:#FAF8F5; border:1px solid #E5E0D8; font-size:0.75rem; color:#1A1A1A; outline:none; }
                  .inp:focus { border-color:#B91C1C; }
                  .label { display:block; font-size:0.65rem; text-transform:uppercase; letter-spacing:0.1em; color:#1A1A1A; font-weight:600; margin-bottom:0.375rem; }`}
                </style>
                <ProductForm
                  initial={editProduct}
                  onSave={handleSaveProduct}
                  onCancel={() => { setShowForm(false); setEditProduct(null); }}
                />
              </div>
            )}

            {/* Error */}
            {productsErr && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-sans">{productsErr}</div>
            )}

            {/* Loading */}
            {productsLoading && (
              <div className="text-center py-16 text-brand-stone font-sans text-sm">Loading products...</div>
            )}

            {/* Products Table */}
            {!productsLoading && products.length === 0 && (
              <div className="text-center py-16 text-brand-stone font-sans text-sm">
                No products yet. Add your first product above.
              </div>
            )}

            {!productsLoading && products.length > 0 && (
              <div className="bg-white border border-brand-border overflow-x-auto shadow-sm">
                <table className="w-full text-xs font-sans">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-brand-border">
                      {['Image', 'Title', 'Category', 'Price ৳', 'Stock', 'Actions'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-brand-stone font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                        <td className="px-4 py-3">
                          {p.image_url
                            ? <img src={p.image_url} alt={p.title_en} className="w-10 h-12 object-cover border border-brand-border" />
                            : <div className="w-10 h-12 bg-brand-canvas border border-brand-border flex items-center justify-center text-[10px] text-brand-stone">No img</div>
                          }
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-brand-black">{p.title_en}</div>
                          {p.title_bn && <div className="text-brand-stone font-bengali text-[11px]">{p.title_bn}</div>}
                        </td>
                        <td className="px-4 py-3 text-brand-stone">
                          {p.category}{p.subcategory ? ` › ${p.subcategory}` : ''}
                        </td>
                        <td className="px-4 py-3 font-semibold text-brand-black">৳{p.price?.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 text-[10px] border rounded-full ${p.in_stock ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                            {p.in_stock ? 'In Stock' : 'Out'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => { setEditProduct(p); setShowForm(true); }}
                              className="px-2.5 py-1 border border-brand-border text-brand-stone hover:text-brand-black hover:border-brand-black transition-colors text-[10px] uppercase tracking-wider">
                              Edit
                            </button>
                            <button onClick={() => handleDeleteProduct(p.id, p.title_en)}
                              className="px-2.5 py-1 border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-400 transition-colors text-[10px] uppercase tracking-wider">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-4 py-2.5 border-t border-brand-border text-[11px] text-brand-stone font-sans">
                  {products.length} product{products.length !== 1 ? 's' : ''} in catalog
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── ORDERS TAB ─── */}
        {activeTab === 'orders' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-brand-black">Incoming Orders</h2>
              <button onClick={fetchOrders}
                className="px-4 py-2 border border-brand-border text-brand-stone hover:text-brand-black hover:border-brand-black text-xs uppercase tracking-wider font-sans transition-colors">
                ↻ Refresh
              </button>
            </div>

            {ordersErr && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-sans">{ordersErr}</div>
            )}

            {ordersLoading && (
              <div className="text-center py-16 text-brand-stone font-sans text-sm">Loading orders...</div>
            )}

            {!ordersLoading && orders.length === 0 && (
              <div className="text-center py-16 text-brand-stone font-sans text-sm">No orders yet.</div>
            )}

            {!ordersLoading && orders.length > 0 && (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-white border border-brand-border p-5 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-serif text-base text-brand-black font-medium">#{order.id} — {order.customer_name}</span>
                          <StatusBadge status={order.status} />
                        </div>
                        <div className="text-xs text-brand-stone font-sans space-y-0.5">
                          <div>📞 {order.phone}</div>
                          <div>📍 {order.address}</div>
                          <div>🕐 {new Date(order.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-serif text-xl text-brand-crimson font-bold">৳{order.total?.toLocaleString('en-IN')}</div>
                        <div className="text-[10px] text-brand-stone font-sans">Total (COD)</div>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="border-t border-brand-border pt-3 mb-4">
                      <p className="text-[10px] uppercase tracking-wider text-brand-stone font-sans mb-2">Items Ordered</p>
                      <div className="space-y-1.5">
                        {(Array.isArray(order.items) ? order.items : []).map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs font-sans">
                            <span className="text-brand-black">
                              {item.title_en || item.title?.en || item.title || 'Item'}
                              {item.size ? ` (${item.size})` : ''}
                              {' '}&times; {item.quantity || 1}
                            </span>
                            <span className="font-semibold text-brand-black">৳{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Accept / Reject Actions */}
                    {order.status === 'Pending' && (
                      <div className="flex gap-2.5">
                        <button onClick={() => handleOrderStatus(order.id, 'Accepted')}
                          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-wider font-sans font-medium transition-colors">
                          ✓ Accept Order
                        </button>
                        <button onClick={() => handleOrderStatus(order.id, 'Rejected')}
                          className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-wider font-sans font-medium transition-colors">
                          ✕ Reject Order
                        </button>
                      </div>
                    )}
                    {order.status !== 'Pending' && (
                      <div className="text-center text-xs text-brand-stone font-sans pt-1">
                        Order {order.status.toLowerCase()} — no further action needed.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
