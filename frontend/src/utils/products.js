/**
 * Normalize a Neon DB product row into the shape expected by storefront components.
 */
export function normalizeApiProduct(p) {
  return {
    id: `db-${p.id}`,
    _dbId: p.id,
    title: { en: p.title_en, bn: p.title_bn || p.title_en },
    category: p.category,
    subcategory: p.subcategory || '',
    price: p.price,
    fabric: { en: p.fabric || '', bn: p.fabric || '' },
    description: { en: p.description || '', bn: p.description || '' },
    image: p.image_url || '',
    media_type: p.media_type === 'video' ? 'video' : 'image',
    mediaType: p.media_type === 'video' ? 'video' : 'image',
    inStock: p.in_stock,
    isFromDb: true,
  };
}

/**
 * Determine whether a product/cart item represents a video asset.
 */
export function isVideoMedia(item) {
  return (item?.mediaType || item?.media_type) === 'video';
}
