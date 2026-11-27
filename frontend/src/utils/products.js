/**
 * Extract normalized [{ url, media_type }] array from a DB product row.
 */
export function extractProductMediaItems(p) {
  if (Array.isArray(p?.media_urls) && p.media_urls.length > 0) {
    const valid = p.media_urls
      .filter((item) => item && String(item.url || '').trim())
      .map((item) => ({
        url: String(item.url).trim(),
        media_type: item.media_type === 'video' ? 'video' : 'image',
      }));
    if (valid.length > 0) return valid;
  }

  if (p?.image_url) {
    return [
      {
        url: p.image_url,
        media_type: p.media_type === 'video' ? 'video' : 'image',
      },
    ];
  }

  return [];
}

/**
 * Normalize a Neon DB product row into the shape expected by storefront components.
 */
export function normalizeApiProduct(p) {
  const discountPrice =
    p.discount_price !== undefined && p.discount_price !== null && Number(p.discount_price) > 0
      ? Number(p.discount_price)
      : null;

  const mediaItems = extractProductMediaItems(p);
  const primaryMedia = mediaItems[0] || {
    url: p.image_url || '',
    media_type: p.media_type === 'video' ? 'video' : 'image',
  };

  return {
    id: `db-${p.id}`,
    _dbId: p.id,
    title: { en: p.title_en, bn: p.title_bn || p.title_en },
    category: p.category,
    subcategory: p.subcategory || '',
    price: Number(p.price) || 0,
    discount_price: discountPrice,
    discountPrice,
    fabric: { en: p.fabric || '', bn: p.fabric || '' },
    description: { en: p.description || '', bn: p.description || '' },
    image: primaryMedia.url || '',
    media_type: primaryMedia.media_type,
    mediaType: primaryMedia.media_type,
    mediaItems,
    in_stock: p.in_stock !== false,
    inStock: p.in_stock !== false,
    isFromDb: true,
  };
}

/**
 * Determine whether a product/cart item represents a video asset.
 */
export function isVideoMedia(item) {
  return (item?.mediaType || item?.media_type) === 'video';
}

/**
 * Check whether a product has an active discount/offer price lower than its regular price.
 */
export function hasDiscount(product) {
  const regular = Number(product?.price || 0);
  const offer = Number(product?.discountPrice ?? product?.discount_price ?? 0);
  return offer > 0 && offer < regular;
}

/**
 * Effective unit price (uses offer price when discounted).
 */
export function getEffectivePrice(product) {
  return hasDiscount(product)
    ? Number(product.discountPrice ?? product.discount_price)
    : Number(product?.price || 0);
}

/**
 * Check whether a product is out of stock.
 */
export function isOutOfStock(product) {
  return product?.inStock === false || product?.in_stock === false;
}

/**
 * Translate built-in categories while preserving custom category names verbatim.
 */
export function translateCategoryLabel(t, category) {
  if (!category) return '';
  const key = `cat_${String(category).trim().toLowerCase()}`;
  const translated = t(key);
  return translated === key ? category : translated;
}

/**
 * Translate built-in subcategories while preserving custom subcategory names verbatim.
 */
export function translateSubcategoryLabel(t, subcategory) {
  if (!subcategory) return '';
  const key = `sub_${String(subcategory).trim().toLowerCase()}`;
  const translated = t(key);
  return translated === key ? subcategory : translated;
}
