import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useStoreSettings } from '../../context/StoreSettingsContext';
import ProductMedia from '../../components/product/ProductMedia';

const ORDER_STAGES = ['Pending', 'Confirmed', 'Shipped', 'Delivered'];
const ALL_ORDER_STATUSES = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Rejected'];
const REVENUE_STATUSES = new Set(['Confirmed', 'Shipped', 'Delivered']);

function normalizeBdPhone(rawPhone) {
  const trimmed = String(rawPhone || '').trim();
  const digits = trimmed.replace(/\D/g, '');
  if (!digits) return { tel: '', wa: '' };

  let wa = digits;
  if (digits.startsWith('880')) {
    wa = digits;
  } else if (digits.startsWith('0')) {
    wa = `88${digits}`;
  } else if (digits.startsWith('1') && digits.length === 10) {
    wa = `880${digits}`;
  } else if (!digits.startsWith('88')) {
    wa = `88${digits}`;
  }

  const tel = trimmed.startsWith('+') ? `+${digits}` : digits;
  return { tel, wa };
}

function buildWhatsAppUrl(order) {
  const { wa } = normalizeBdPhone(order.phone);
  if (!wa) return '#';
  const totalFormatted = Number(order.total || 0).toLocaleString('en-IN');
  const message = `Hello ${order.customer_name}, thank you for shopping with Tero Parbaan! Your order #${order.id} (Total: ৳${totalFormatted}, COD) has been received and we are confirming your delivery details.`;
  return `https://wa.me/${wa}?text=${encodeURIComponent(message)}`;
}

// ─── Status Badge ────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    Pending:   'bg-amber-50 text-amber-700 border-amber-200',
    Confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
    Shipped:   'bg-violet-50 text-violet-700 border-violet-200',
    Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Accepted:  'bg-emerald-50 text-emerald-700 border-emerald-200',
    Rejected:  'bg-red-50 text-red-700 border-red-200',
  };
  return (
    <span className={`inline-block px-2 py-0.5 text-[10px] font-sans font-semibold uppercase tracking-wider border rounded-full ${map[status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
      {status}
    </span>
  );
}

// ─── 4-Stage Order Progress Bar ──────────────────────────────────────────────
function OrderProgressBar({ status }) {
  if (status === 'Rejected') {
    return (
      <div className="mb-4 px-3 py-2 bg-red-50/70 border border-red-200 text-red-700 text-[11px] font-sans">
        Order marked as <strong>Rejected</strong>.
      </div>
    );
  }

  const currentIdx = ORDER_STAGES.indexOf(status);

  return (
    <div className="mb-4 py-2.5 px-3 bg-[#FAF8F5] border border-brand-border/80">
      <div className="grid grid-cols-4 gap-2">
        {ORDER_STAGES.map((stage, idx) => {
          const isCompleted = currentIdx >= idx;
          const isCurrent = currentIdx === idx;
          return (
            <div key={stage} className="space-y-1.5">
              <div
                className={`h-1 w-full rounded-full transition-colors ${
                  isCompleted ? 'bg-brand-crimson' : 'bg-brand-border'
                }`}
              />
              <div className={`text-[10px] uppercase tracking-wider font-sans text-center ${
                isCurrent
                  ? 'text-brand-crimson font-semibold'
                  : isCompleted
                    ? 'text-brand-black font-medium'
                    : 'text-brand-stone'
              }`}>
                {stage}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Print-Ready Courier Slip / Invoice ──────────────────────────────────────
function PrintOrderMemo({ order }) {
  if (!order) return null;

  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <div id="print-memo-slip" className="hidden print:block bg-white text-black p-6 max-w-2xl mx-auto font-sans">
      {/* Slip Header */}
      <div className="border-b-2 border-black pb-4 mb-5 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/Tero-Parbaan_logo.png"
            alt="Tero Parbaan"
            className="h-11 w-11 rounded-full object-cover shrink-0 border border-stone-300"
          />
          <div>
            <h1 className="font-serif text-3xl font-semibold tracking-wide text-black">
              Tero Parbaan <span className="font-bengali text-xl font-normal ml-1">তেরোপার্বণ</span>
            </h1>
            <p className="text-[11px] uppercase tracking-[0.2em] text-stone-600 mt-1">
              Dhaka Boutique Showroom &bull; Courier Dispatch &amp; Invoice Memo
            </p>
          </div>
        </div>
        <div className="text-right text-xs">
          <div className="font-bold text-base">Order #{order.id}</div>
          <div className="text-stone-600 mt-0.5">
            {new Date(order.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
          </div>
          <div className="uppercase tracking-wider text-[10px] font-semibold mt-1">
            Status: {order.status}
          </div>
        </div>
      </div>

      {/* Recipient / Shipping Info */}
      <div className="border border-stone-300 p-4 mb-5 grid grid-cols-2 gap-4 text-xs">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold mb-1">Recipient</p>
          <p className="font-semibold text-sm text-black">{order.customer_name}</p>
          <p className="mt-1 font-medium">Phone: {order.phone}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold mb-1">Delivery Address</p>
          <p className="text-black leading-relaxed">{order.address}</p>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full text-xs border-collapse mb-5">
        <thead>
          <tr className="border-y border-black bg-stone-100">
            <th className="py-2 px-2 text-left uppercase tracking-wider text-[10px] font-semibold">Item</th>
            <th className="py-2 px-2 text-center uppercase tracking-wider text-[10px] font-semibold">Qty</th>
            <th className="py-2 px-2 text-right uppercase tracking-wider text-[10px] font-semibold">Amount (৳)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200">
          {items.map((item, idx) => (
            <tr key={idx}>
              <td className="py-2 px-2">
                {item.title_en || item.title?.en || item.title || 'Item'}
                {item.size ? ` (${item.size})` : ''}
              </td>
              <td className="py-2 px-2 text-center">{item.quantity || 1}</td>
              <td className="py-2 px-2 text-right font-medium">
                ৳{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals & Payment */}
      <div className="border-t-2 border-black pt-3 flex items-center justify-between text-sm">
        <div>
          <span className="text-xs uppercase tracking-wider text-stone-600">Payment Mode: </span>
          <strong className="text-xs">Cash on Delivery (COD)</strong>
        </div>
        <div className="text-right">
          <span className="text-xs uppercase tracking-wider text-stone-600 mr-3">Total Payable:</span>
          <strong className="text-lg">৳{Number(order.total || 0).toLocaleString('en-IN')}</strong>
        </div>
      </div>

      <p className="mt-8 pt-3 border-t border-dashed border-stone-300 text-center text-[10px] text-stone-500 uppercase tracking-widest">
        Thank you for choosing Tero Parbaan &bull; Printed {new Date().toLocaleDateString('en-US', { dateStyle: 'medium' })}
      </p>
    </div>
  );
}

// ─── Cloudinary Direct Upload Helper ──────────────────────────────────────────
function uploadToCloudinary(file, onProgress) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    return Promise.reject(
      new Error('Cloudinary is not configured. Check VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.')
    );
  }

  return new Promise((resolve, reject) => {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      try {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && res.secure_url) {
          resolve({
            secure_url: res.secure_url,
            media_type: res.resource_type === 'video' ? 'video' : 'image',
          });
        } else {
          reject(new Error(res.error?.message || `Upload failed (${xhr.status})`));
        }
      } catch {
        reject(new Error('Invalid response from Cloudinary'));
      }
    };

    xhr.onerror = () => reject(new Error('Network error while uploading media'));
    xhr.send(formData);
  });
}

// ─── Product Form ─────────────────────────────────────────────────────────────
function ProductForm({ initial, onSave, onCancel }) {
  const CATEGORIES = ['Saree', 'Blouse', 'Kurti', 'Stole'];
  const SAREE_SUBS = ['Shuti', 'Handloom', 'Muslin', 'Silk'];
  const fileInputRef = useRef(null);

  const empty = {
    id: null, title_en: '', title_bn: '', category: 'Saree',
    subcategory: '', price: '', discount_price: '', fabric: '', description: '',
    image_url: '', media_type: 'image', in_stock: true,
  };

  const [form, setForm] = useState(
    initial
      ? {
          ...empty,
          ...initial,
          discount_price: initial.discount_price ?? '',
          media_type: initial.media_type === 'video' ? 'video' : 'image',
        }
      : empty
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [err, setErr] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleFileUpload = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setErr('Please choose an image or video file.');
      return;
    }

    setErr('');
    setUploading(true);
    setUploadProgress(0);

    try {
      const { secure_url, media_type } = await uploadToCloudinary(file, setUploadProgress);
      setForm(f => ({ ...f, image_url: secure_url, media_type }));
    } catch (uploadErr) {
      setErr(uploadErr.message || 'Media upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploading) return;
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

      <div className={`grid grid-cols-1 ${isSaree ? 'sm:grid-cols-4' : 'sm:grid-cols-3'} gap-4`}>
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
        <div>
          <label className="label">Offer / Discount Price ৳</label>
          <input type="number" min="0" value={form.discount_price} onChange={e => set('discount_price', e.target.value)}
            placeholder="Optional offer price" className="inp" />
        </div>
      </div>

      <div>
        <label className="label">Fabric / Quality</label>
        <input value={form.fabric} onChange={e => set('fabric', e.target.value)}
          placeholder="e.g. 100% Muslin Cotton" className="inp" />
      </div>

      {/* Direct Photo / Video Upload via Cloudinary */}
      <div>
        <label className="label">Product Photo or Video (Upload from Gallery / Computer)</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
            e.target.value = '';
          }}
          className="hidden"
        />

        {!form.image_url || uploading ? (
          <div
            role="button"
            tabIndex={0}
            onClick={() => !uploading && fileInputRef.current?.click()}
            onKeyDown={e => {
              if ((e.key === 'Enter' || e.key === ' ') && !uploading) {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-sm p-6 text-center transition-colors cursor-pointer ${
              isDragging
                ? 'border-brand-crimson bg-red-50/50'
                : 'border-brand-border bg-[#FAF8F5] hover:border-brand-crimson/60'
            } ${uploading ? 'pointer-events-none opacity-85' : ''}`}
          >
            {uploading ? (
              <div className="space-y-2.5 max-w-xs mx-auto">
                <div className="flex items-center justify-center gap-2 text-xs font-medium text-brand-crimson">
                  <span className="w-3.5 h-3.5 border-2 border-brand-crimson border-t-transparent rounded-full animate-spin" />
                  <span>Uploading to Cloudinary... {uploadProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-brand-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-crimson transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-brand-black">
                  Click to choose photo/video from device gallery or drag &amp; drop here
                </p>
                <p className="text-[11px] text-brand-stone">
                  Supports JPG, PNG, WebP, MP4, MOV &bull; Uploads directly to Cloudinary
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-[#FAF8F5] border border-brand-border p-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-28 h-36 bg-white border border-brand-border overflow-hidden flex-shrink-0">
              {form.media_type === 'video' ? (
                <video
                  src={form.image_url}
                  controls
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={form.image_url}
                  alt={form.title_en || 'Product preview'}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-semibold">
                  {form.media_type === 'video' ? 'Video Ready' : 'Photo Ready'}
                </span>
              </div>
              <p className="text-[11px] text-brand-stone break-all line-clamp-2">
                Uploaded and ready to save with this product.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 border border-brand-border bg-white text-brand-black hover:border-brand-crimson hover:text-brand-crimson text-[11px] uppercase tracking-wider transition-colors"
                >
                  Replace Media
                </button>
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, image_url: '', media_type: 'image' }))}
                  className="px-3 py-1.5 border border-red-200 bg-white text-red-600 hover:bg-red-50 text-[11px] uppercase tracking-wider transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}
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
        <button type="submit" disabled={saving || uploading}
          className="flex-1 py-2.5 bg-brand-crimson hover:bg-brand-crimson-hover disabled:opacity-60 text-white text-xs uppercase tracking-wider font-medium transition-colors">
          {uploading ? 'Wait for upload...' : saving ? 'Saving...' : form.id ? 'Update Product' : 'Add Product'}
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
  const [togglingStockId, setTogglingStockId] = useState(null);

  // Orders state
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersErr, setOrdersErr] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [printOrder, setPrintOrder] = useState(null);

  // Store Settings state
  const { setStoreSettings } = useStoreSettings();
  const [settingsForm, setSettingsForm] = useState({
    dhaka_delivery: 80,
    outside_dhaka_delivery: 150,
    notice_text: '',
    notice_active: false,
  });
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState('');
  const [settingsErr, setSettingsErr] = useState('');

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
    const discountNum =
      form.discount_price !== '' && form.discount_price !== null && form.discount_price !== undefined
        ? Number(form.discount_price)
        : null;
    const res = await fetch('/api/products', {
      method: isEdit ? 'PUT' : 'POST',
      headers: authHeader,
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        discount_price: discountNum && discountNum > 0 ? discountNum : null,
      }),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Save failed');
    setShowForm(false);
    setEditProduct(null);
    fetchProducts();
  };

  const handleToggleStock = async (product) => {
    setTogglingStockId(product.id);
    const nextStock = !product.in_stock;
    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: authHeader,
        body: JSON.stringify({
          ...product,
          in_stock: nextStock,
        }),
      });
      const data = await res.json();
      if (data.ok && data.product) {
        setProducts(prev => prev.map(p => (p.id === product.id ? data.product : p)));
      } else {
        alert(data.error || 'Failed to update stock status');
      }
    } catch {
      alert('Network error updating stock status');
    } finally {
      setTogglingStockId(null);
    }
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

  // ── Settings API ──
  const fetchSettings = useCallback(async () => {
    setSettingsLoading(true);
    setSettingsErr('');
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.ok && data.settings) {
        const next = {
          dhaka_delivery: Number(data.settings.dhaka_delivery ?? 80),
          outside_dhaka_delivery: Number(data.settings.outside_dhaka_delivery ?? 150),
          notice_text: data.settings.notice_text || '',
          notice_active: Boolean(data.settings.notice_active),
        };
        setSettingsForm(next);
        setStoreSettings(next);
      } else {
        setSettingsErr(data.error || 'Failed to load settings');
      }
    } catch {
      setSettingsErr('Network error loading settings');
    } finally {
      setSettingsLoading(false);
    }
  }, [setStoreSettings]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSettingsSaving(true);
    setSettingsMsg('');
    setSettingsErr('');
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: authHeader,
        body: JSON.stringify({
          dhaka_delivery: Number(settingsForm.dhaka_delivery || 0),
          outside_dhaka_delivery: Number(settingsForm.outside_dhaka_delivery || 0),
          notice_text: settingsForm.notice_text,
          notice_active: Boolean(settingsForm.notice_active),
        }),
      });
      const data = await res.json();
      if (data.ok && data.settings) {
        const next = {
          dhaka_delivery: Number(data.settings.dhaka_delivery),
          outside_dhaka_delivery: Number(data.settings.outside_dhaka_delivery),
          notice_text: data.settings.notice_text || '',
          notice_active: Boolean(data.settings.notice_active),
        };
        setSettingsForm(next);
        setStoreSettings(next);
        setSettingsMsg('Store settings saved and published live.');
      } else {
        setSettingsErr(data.error || 'Failed to save settings');
      }
    } catch {
      setSettingsErr('Network error saving settings');
    } finally {
      setSettingsSaving(false);
    }
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

  // Load orders on mount so KPI summary cards are always populated
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Trigger window.print() after PrintOrderMemo mounts in the DOM
  useEffect(() => {
    if (!printOrder) return;
    const handleAfterPrint = () => setPrintOrder(null);
    window.addEventListener('afterprint', handleAfterPrint);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.print();
      });
    });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [printOrder]);

  const handleOrderStatus = async (id, status) => {
    setUpdatingOrderId(id);
    try {
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
    } catch {
      alert('Network error updating order status');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // ── Overview KPI Calculations ──
  const kpis = useMemo(() => {
    const todayKey = new Date().toDateString();
    let todaysOrders = 0;
    let pendingOrders = 0;
    let totalRevenue = 0;

    for (const order of orders) {
      if (order.created_at && new Date(order.created_at).toDateString() === todayKey) {
        todaysOrders += 1;
      }
      if (order.status === 'Pending') {
        pendingOrders += 1;
      }
      if (REVENUE_STATUSES.has(order.status)) {
        totalRevenue += Number(order.total) || 0;
      }
    }

    const outOfStockProducts = products.filter(p => p.in_stock === false).length;

    return [
      {
        label: "Today's Orders",
        value: todaysOrders.toLocaleString('en-IN'),
        sub: 'Placed today',
        accent: 'border-t-brand-black',
      },
      {
        label: 'Pending Orders',
        value: pendingOrders.toLocaleString('en-IN'),
        sub: 'Awaiting confirmation',
        accent: 'border-t-amber-500',
        valueClass: pendingOrders > 0 ? 'text-amber-700' : 'text-brand-black',
      },
      {
        label: 'Total Revenue',
        value: `৳${totalRevenue.toLocaleString('en-IN')}`,
        sub: 'Confirmed / Shipped / Delivered',
        accent: 'border-t-brand-crimson',
        valueClass: 'text-brand-crimson',
      },
      {
        label: 'Out-of-Stock Products',
        value: outOfStockProducts.toLocaleString('en-IN'),
        sub: 'Needs restock',
        accent: 'border-t-[#C5A059]',
        valueClass: outOfStockProducts > 0 ? 'text-brand-crimson' : 'text-brand-black',
      },
    ];
  }, [orders, products]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="min-h-screen bg-[#FAF8F5] print:hidden">
        {/* Top Bar */}
        <header className="bg-[#1A1A1A] text-white border-b border-[#C5A059]/30 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2.5 font-serif text-lg tracking-widest uppercase text-[#FAF8F5] hover:text-[#C5A059] transition-colors">
                <img
                  src="/Tero-Parbaan_logo.png"
                  alt="Tero Parbaan"
                  className="h-8 w-8 rounded-full object-cover shrink-0 border border-[#C5A059]/40"
                />
                <span>Tero Parbaan</span>
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
            <p className="text-xs text-brand-stone font-sans mt-1">Manage products, track orders, and print courier memos</p>
          </div>

          {/* Overview KPI Cards */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-7">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className={`bg-white border border-brand-border border-t-2 ${kpi.accent} p-4 shadow-sm`}
              >
                <p className="text-[10px] uppercase tracking-widest text-brand-stone font-sans font-semibold">
                  {kpi.label}
                </p>
                <p className={`font-serif text-2xl sm:text-3xl font-semibold mt-1.5 ${kpi.valueClass || 'text-brand-black'}`}>
                  {kpi.value}
                </p>
                <p className="text-[11px] text-brand-stone font-sans mt-1">
                  {kpi.sub}
                </p>
              </div>
            ))}
          </section>

          {/* Tab Switcher */}
          <div className="flex border-b border-brand-border mb-6 gap-1 overflow-x-auto no-scrollbar">
            {[
              { id: 'products', label: '📦 Products' },
              { id: 'orders', label: `📋 Orders (${orders.length})` },
              { id: 'settings', label: '⚙️ Settings' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 text-xs uppercase tracking-wider font-sans border-b-2 whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'border-brand-crimson text-brand-crimson font-semibold'
                    : 'border-transparent text-brand-stone hover:text-brand-black'
                }`}>
                {tab.label}
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
                    key={editProduct?.id || 'new'}
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
                        {['Media', 'Title', 'Category', 'Price ৳', 'Stock', 'Actions'].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-brand-stone font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border">
                      {products.map(p => (
                        <tr key={p.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                          <td className="px-4 py-3">
                            {p.image_url
                              ? <ProductMedia item={p} alt={p.title_en} className="w-10 h-12 object-cover border border-brand-border" />
                              : <div className="w-10 h-12 bg-brand-canvas border border-brand-border flex items-center justify-center text-[10px] text-brand-stone">No media</div>
                            }
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-brand-black">{p.title_en}</div>
                            {p.title_bn && <div className="text-brand-stone font-bengali text-[11px]">{p.title_bn}</div>}
                          </td>
                          <td className="px-4 py-3 text-brand-stone">
                            {p.category}{p.subcategory ? ` › ${p.subcategory}` : ''}
                          </td>
                          <td className="px-4 py-3 font-semibold text-brand-black">
                            {p.discount_price && Number(p.discount_price) > 0 && Number(p.discount_price) < Number(p.price) ? (
                              <div className="flex items-center gap-1.5">
                                <span className="text-brand-crimson">৳{Number(p.discount_price).toLocaleString('en-IN')}</span>
                                <span className="text-[11px] text-brand-stone line-through font-normal">
                                  ৳{Number(p.price).toLocaleString('en-IN')}
                                </span>
                              </div>
                            ) : (
                              <span>৳{p.price?.toLocaleString('en-IN')}</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              role="switch"
                              aria-checked={Boolean(p.in_stock)}
                              disabled={togglingStockId === p.id}
                              onClick={() => handleToggleStock(p)}
                              title="Click to toggle stock status"
                              className="inline-flex items-center gap-2 disabled:opacity-60 cursor-pointer group"
                            >
                              <span
                                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                  p.in_stock ? 'bg-emerald-600' : 'bg-stone-300'
                                }`}
                              >
                                <span
                                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                                    p.in_stock ? 'translate-x-4' : 'translate-x-1'
                                  }`}
                                />
                              </span>
                              <span className={`text-[10px] uppercase tracking-wider font-medium ${
                                p.in_stock ? 'text-emerald-700' : 'text-red-600'
                              }`}>
                                {togglingStockId === p.id ? 'Saving...' : p.in_stock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </button>
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
                  {orders.map(order => {
                    const { tel } = normalizeBdPhone(order.phone);
                    const waUrl = buildWhatsAppUrl(order);
                    const isUpdating = updatingOrderId === order.id;

                    const nextStageMap = {
                      Pending: { status: 'Confirmed', label: '✓ Confirm Order', cls: 'bg-blue-600 hover:bg-blue-700 text-white' },
                      Confirmed: { status: 'Shipped', label: '🚚 Mark Shipped', cls: 'bg-violet-600 hover:bg-violet-700 text-white' },
                      Shipped: { status: 'Delivered', label: '✓ Mark Delivered', cls: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
                    };
                    const nextAction = nextStageMap[order.status];

                    return (
                      <div key={order.id} className="bg-white border border-brand-border p-5 shadow-sm">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="font-serif text-base text-brand-black font-medium">#{order.id} — {order.customer_name}</span>
                              <StatusBadge status={order.status} />
                            </div>
                            <div className="text-xs text-brand-stone font-sans space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span>📞 {order.phone}</span>
                                {tel && (
                                  <a
                                    href={`tel:${tel}`}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium bg-[#FAF8F5] border border-brand-border text-brand-black hover:border-brand-crimson hover:text-brand-crimson transition-colors"
                                  >
                                    Call
                                  </a>
                                )}
                                {waUrl !== '#' && (
                                  <a
                                    href={waUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors"
                                  >
                                    WhatsApp
                                  </a>
                                )}
                              </div>
                              <div>📍 {order.address}</div>
                              <div>🕐 {new Date(order.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-serif text-xl text-brand-crimson font-bold">৳{Number(order.total || 0).toLocaleString('en-IN')}</div>
                            <div className="text-[10px] text-brand-stone font-sans">Total (COD)</div>
                          </div>
                        </div>

                        {/* 4-Stage Progress Bar */}
                        <OrderProgressBar status={order.status} />

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

                        {/* Order Controls: Status Dropdown, Quick Next Action, Print Memo */}
                        <div className="border-t border-brand-border pt-3 flex flex-wrap items-center justify-between gap-2.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <label className="text-[10px] uppercase tracking-wider text-brand-stone font-sans font-semibold">
                              Status:
                            </label>
                            <select
                              value={order.status}
                              disabled={isUpdating}
                              onChange={(e) => handleOrderStatus(order.id, e.target.value)}
                              className="px-2.5 py-1.5 bg-[#FAF8F5] border border-brand-border text-xs font-sans text-brand-black focus:outline-none focus:border-brand-crimson disabled:opacity-60"
                            >
                              {ALL_ORDER_STATUSES.map(st => (
                                <option key={st} value={st}>{st}</option>
                              ))}
                            </select>

                            {nextAction && (
                              <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() => handleOrderStatus(order.id, nextAction.status)}
                                className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-sans font-medium transition-colors disabled:opacity-60 ${nextAction.cls}`}
                              >
                                {nextAction.label}
                              </button>
                            )}

                            {order.status === 'Pending' && (
                              <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() => handleOrderStatus(order.id, 'Rejected')}
                                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-[11px] uppercase tracking-wider font-sans font-medium transition-colors disabled:opacity-60"
                              >
                                ✕ Reject
                              </button>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => setPrintOrder(order)}
                            className="px-3.5 py-1.5 border border-brand-border bg-[#FAF8F5] hover:border-brand-black text-brand-black text-[11px] uppercase tracking-wider font-sans font-medium transition-colors"
                          >
                            🖨 Print Memo
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ─── SETTINGS TAB ─── */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-5">
              <div>
                <h2 className="font-serif text-xl text-brand-black">Store Settings</h2>
                <p className="text-xs text-brand-stone font-sans mt-0.5">
                  Configure live delivery charges and optional storefront announcement banner
                </p>
              </div>

              {settingsErr && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-sans">{settingsErr}</div>
              )}
              {settingsMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans">{settingsMsg}</div>
              )}

              {settingsLoading ? (
                <div className="text-center py-12 text-brand-stone font-sans text-sm">Loading settings...</div>
              ) : (
                <form onSubmit={handleSaveSettings} className="bg-white border border-brand-border p-5 sm:p-6 shadow-sm space-y-5 text-sm font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-brand-black font-semibold mb-1.5">
                        Dhaka Delivery Charge (৳)
                      </label>
                      <input
                        type="number"
                        min="0"
                        required
                        value={settingsForm.dhaka_delivery}
                        onChange={(e) => setSettingsForm(s => ({ ...s, dhaka_delivery: e.target.value }))}
                        className="w-full px-3 py-2 bg-[#FAF8F5] border border-brand-border text-xs text-brand-black focus:outline-none focus:border-brand-crimson"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-brand-black font-semibold mb-1.5">
                        Outside Dhaka Delivery Charge (৳)
                      </label>
                      <input
                        type="number"
                        min="0"
                        required
                        value={settingsForm.outside_dhaka_delivery}
                        onChange={(e) => setSettingsForm(s => ({ ...s, outside_dhaka_delivery: e.target.value }))}
                        className="w-full px-3 py-2 bg-[#FAF8F5] border border-brand-border text-xs text-brand-black focus:outline-none focus:border-brand-crimson"
                      />
                    </div>
                  </div>

                  <div className="border-t border-brand-border pt-4 space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-brand-black font-semibold">
                          Storefront Notice Banner
                        </label>
                        <p className="text-[11px] text-brand-stone mt-0.5">
                          Show a crimson announcement strip at the very top of the storefront
                        </p>
                      </div>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={settingsForm.notice_active}
                        onClick={() => setSettingsForm(s => ({ ...s, notice_active: !s.notice_active }))}
                        className="inline-flex items-center gap-2 cursor-pointer flex-shrink-0"
                      >
                        <span
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            settingsForm.notice_active ? 'bg-brand-crimson' : 'bg-stone-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                              settingsForm.notice_active ? 'translate-x-4' : 'translate-x-1'
                            }`}
                          />
                        </span>
                        <span className="text-[11px] uppercase tracking-wider font-medium text-brand-black">
                          {settingsForm.notice_active ? 'Active' : 'Off'}
                        </span>
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      value={settingsForm.notice_text}
                      onChange={(e) => setSettingsForm(s => ({ ...s, notice_text: e.target.value }))}
                      placeholder="e.g. Eid Special: Complimentary Dhaka delivery on orders above ৳5,000!"
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-brand-border text-xs text-brand-black focus:outline-none focus:border-brand-crimson resize-none"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={settingsSaving}
                      className="px-6 py-2.5 bg-brand-crimson hover:bg-brand-crimson-hover disabled:opacity-60 text-white text-xs uppercase tracking-wider font-medium transition-colors"
                    >
                      {settingsSaving ? 'Saving...' : 'Save Store Settings'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Print-Only Courier Slip / Invoice */}
      <PrintOrderMemo order={printOrder} />
    </>
  );
}
