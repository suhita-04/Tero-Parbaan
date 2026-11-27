/**
 * Normalize a Neon DB product row into the shape expected by storefront components.
 */
export function normalizeApiProduct(p) {
  const discountPrice =
    p.discount_price !== undefined && p.discount_price !== null && Number(p.discount_price) > 0
      ? Number(p.discount_price)
      : null;

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
    image: p.image_url || '',
    media_type: p.media_type === 'video' ? 'video' : 'image',
    mediaType: p.media_type === 'video' ? 'video' : 'image',
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
