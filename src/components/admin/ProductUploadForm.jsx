import React, { useState } from 'react';

const AVAILABLE_SIZES = ['Free Size', 'XS', 'S', 'M', 'L', 'XL'];
const AVAILABLE_COLORS = ['Crimson Red', 'Vintage Cream', 'Deep Maroon', 'Midnight Indigo', 'Muted Gold'];

export default function ProductUploadForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    basePrice: '',
    discountPrice: '',
    category: 'sarees',
    imageFile: null,
    imagePreview: null,
  });

  const [selectedSizes, setSelectedSizes] = useState(['Free Size']);
  const [selectedColors, setSelectedColors] = useState(['Crimson Red']);
  const [successMessage, setSuccessMessage] = useState(false);

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.basePrice) return;

    const newProduct = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      basePrice: parseFloat(formData.basePrice),
      discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
      price: formData.discountPrice ? parseFloat(formData.discountPrice) : parseFloat(formData.basePrice),
      category: formData.category,
      sizes: selectedSizes,
      colors: selectedColors,
      image: formData.imagePreview || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      tag: 'New Arrival',
    };

    if (onProductAdded) {
      onProductAdded(newProduct);
    }

    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3500);

    // Reset form
    setFormData({
      title: '',
      description: '',
      basePrice: '',
      discountPrice: '',
      category: 'sarees',
      imageFile: null,
      imagePreview: null,
    });
    setSelectedSizes(['Free Size']);
    setSelectedColors(['Crimson Red']);
  };

  return (
    <div className="bg-white border border-brand-border p-4 sm:p-6 lg:p-8 w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 mb-6 border-b border-brand-border gap-2">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
            New Product Publication
          </h3>
          <p className="text-xs text-brand-stone font-sans mt-0.5">
            Add a new handcrafted piece to the Tero Parbon storefront catalog.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[10px] uppercase tracking-widest text-brand-red bg-brand-red-soft px-3 py-1 font-sans border border-brand-red/20 font-medium">
          Draft &bull; Live Preview
        </span>
      </div>

      {successMessage && (
        <div className="mb-6 p-3 sm:p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans flex items-center justify-between">
          <span>&check; Product successfully published to mock inventory!</span>
          <span className="text-[10px] uppercase font-semibold hidden sm:inline">Ready for display</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        {/* Title & Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-brand-charcoal font-medium mb-1.5">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Royal Handloom Jamdani Saree"
              className="w-full px-3.5 py-2.5 bg-brand-cream border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:border-brand-red transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-brand-charcoal font-medium mb-1.5">
              Collection Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-brand-cream border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:border-brand-red transition-colors"
            >
              <option value="sarees">Sarees</option>
              <option value="kurtis">Kurtis</option>
              <option value="blouses">Blouses</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-brand-charcoal font-medium mb-1.5">
            Garment Description & Fabric Details
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the weave technique, silk purity, embroidery, and drape..."
            className="w-full px-3.5 py-2.5 bg-brand-cream border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:border-brand-red transition-colors"
          />
        </div>

        {/* Pricing: Base Price & Discount Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-brand-charcoal font-medium mb-1.5">
              Base Price (USD $) *
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.basePrice}
              onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
              placeholder="240.00"
              className="w-full px-3.5 py-2.5 bg-brand-cream border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:border-brand-red transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-brand-charcoal font-medium mb-1.5">
              Discount Price (Optional USD $)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.discountPrice}
              onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
              placeholder="Leave empty if regular price"
              className="w-full px-3.5 py-2.5 bg-brand-cream border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:border-brand-red transition-colors"
            />
          </div>
        </div>

        {/* Sizing Pills */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-brand-charcoal font-medium mb-2">
            Available Sizing Variations
          </label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_SIZES.map((size) => {
              const active = selectedSizes.includes(size);
              return (
                <button
                  type="button"
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-1.5 text-xs font-sans tracking-wide border transition-all ${
                    active
                      ? 'bg-brand-red text-white border-brand-red font-medium'
                      : 'bg-brand-cream text-brand-stone border-brand-border hover:border-brand-charcoal'
                  }`}
                >
                  {size} {active && '✓'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Palette Variations */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-brand-charcoal font-medium mb-2">
            Available Color Variations
          </label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_COLORS.map((color) => {
              const active = selectedColors.includes(color);
              return (
                <button
                  type="button"
                  key={color}
                  onClick={() => toggleColor(color)}
                  className={`px-3 py-1.5 text-xs font-sans tracking-wide border transition-all ${
                    active
                      ? 'bg-brand-red text-white border-brand-red font-medium'
                      : 'bg-brand-cream text-brand-stone border-brand-border hover:border-brand-charcoal'
                  }`}
                >
                  {color} {active && '✓'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Image Upload Area */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-brand-charcoal font-medium mb-1.5">
            Editorial Product Photography
          </label>
          
          <div className="border border-dashed border-brand-border p-4 sm:p-6 bg-brand-cream text-center flex flex-col items-center justify-center space-y-2 sm:space-y-3">
            {formData.imagePreview ? (
              <div className="relative">
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="w-28 h-36 sm:w-32 sm:h-40 object-cover border border-brand-border"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, imageFile: null, imagePreview: null })}
                  className="mt-2 text-[10px] text-brand-red uppercase tracking-wider underline block mx-auto"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <>
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-brand-stone stroke-[1.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="text-xs text-brand-stone font-sans">
                  <label htmlFor="file-upload" className="cursor-pointer text-brand-red hover:underline font-medium">
                    Upload an image
                  </label>
                  <span> or drag and drop</span>
                </div>
                <p className="text-[10px] text-brand-stone/80 uppercase tracking-wider">
                  PNG, JPG, WEBP up to 10MB
                </p>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </>
            )}
          </div>
        </div>

        {/* Responsive Submit Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:space-x-4 border-t border-brand-border">
          <button
            type="button"
            onClick={() => {
              setFormData({
                title: '',
                description: '',
                basePrice: '',
                discountPrice: '',
                category: 'sarees',
                imageFile: null,
                imagePreview: null,
              });
            }}
            className="py-3 px-4 text-xs uppercase tracking-wider font-sans font-medium text-brand-stone hover:text-brand-charcoal text-center transition-colors"
          >
            Clear Fields
          </button>

          <button
            type="submit"
            className="bg-brand-red hover:bg-brand-red-hover text-brand-cream border border-brand-red px-6 sm:px-8 py-3.5 text-xs font-sans font-medium tracking-[0.16em] uppercase transition-all duration-300 text-center"
          >
            Publish to Catalog
          </button>
        </div>
      </form>
    </div>
  );
}
