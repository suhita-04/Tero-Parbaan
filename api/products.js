import { getDb, ensureTables, verifyAdmin } from './_db.js';

function parseMaybeJsonArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;
    try {
      const parsed = JSON.parse(trimmed);
      if (typeof parsed === 'string') {
        const parsedTwice = JSON.parse(parsed);
        return Array.isArray(parsedTwice) ? parsedTwice : null;
      }
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }
  return null;
}

function coerceMediaEntry(item, fallbackType = 'image') {
  if (!item) return null;
  if (typeof item === 'string') {
    const clean = item.trim();
    if (!clean || clean.startsWith('blob:')) return null;
    return { url: clean, media_type: fallbackType === 'video' ? 'video' : 'image' };
  }
  const rawUrl = item.url ?? item.src ?? item.image_url ?? item.image ?? '';
  const cleanUrl = String(rawUrl || '').trim();
  if (!cleanUrl || cleanUrl.startsWith('blob:')) return null;
  const typeVal = item.media_type ?? item.mediaType ?? fallbackType;
  return {
    url: cleanUrl,
    media_type: typeVal === 'video' ? 'video' : 'image',
  };
}

function normalizeMediaPayload(mediaItems, mediaUrls, imageUrl, mediaType) {
  const sourceArray =
    parseMaybeJsonArray(mediaItems) ?? parseMaybeJsonArray(mediaUrls);

  let normalizedItems = [];
  if (sourceArray) {
    normalizedItems = sourceArray
      .map((item) => coerceMediaEntry(item, 'image'))
      .filter(Boolean);
  } else if (imageUrl && String(imageUrl).trim()) {
    const single = coerceMediaEntry(
      { url: imageUrl, media_type: mediaType },
      mediaType
    );
    if (single) normalizedItems = [single];
  }

  const cleanFallbackUrl = String(imageUrl || '').trim();
  const safeFallbackUrl =
    cleanFallbackUrl && !cleanFallbackUrl.startsWith('blob:') ? cleanFallbackUrl : '';
  const primaryUrl = normalizedItems[0]?.url || safeFallbackUrl || '';
  const primaryType =
    normalizedItems[0]?.media_type || (mediaType === 'video' ? 'video' : 'image');

  return {
    mediaUrls: normalizedItems,
    imageUrl: primaryUrl || null,
    mediaType: primaryType,
  };
}

function normalizeDbProductRow(row) {
  if (!row) return row;
  const { mediaUrls, imageUrl, mediaType } = normalizeMediaPayload(
    null,
    row.media_urls,
    row.image_url,
    row.media_type
  );
  return {
    ...row,
    media_urls: mediaUrls,
    image_url: imageUrl,
    media_type: mediaType,
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await ensureTables();
    const sql = getDb();

    // GET /api/products — public
    if (req.method === 'GET') {
      const products = await sql`SELECT * FROM products ORDER BY created_at DESC`;
      return res.status(200).json({ ok: true, products: products.map(normalizeDbProductRow) });
    }

    // All write operations require admin auth
    if (!verifyAdmin(req)) {
      return res.status(401).json({ ok: false, error: 'Unauthorized' });
    }

    // POST — create new product
    if (req.method === 'POST') {
      const {
        title_en,
        title_bn,
        category,
        subcategory,
        price,
        discount_price,
        fabric,
        description,
        image_url,
        media_type,
        media_items,
        media_urls,
        in_stock,
      } = req.body || {};
      if (!title_en || !category || !price) {
        return res.status(400).json({ ok: false, error: 'title_en, category, and price are required' });
      }
      const { mediaUrls, imageUrl, mediaType } = normalizeMediaPayload(
        media_items,
        media_urls,
        image_url,
        media_type
      );
      const normalizedDiscountPrice =
        discount_price !== undefined && discount_price !== null && discount_price !== '' && Number(discount_price) > 0
          ? Number(discount_price)
          : null;
      const [product] = await sql`
        INSERT INTO products (title_en, title_bn, category, subcategory, price, discount_price, fabric, description, image_url, media_type, media_urls, in_stock)
        VALUES (${title_en}, ${title_bn || null}, ${category}, ${subcategory || null}, ${Number(price)}, ${normalizedDiscountPrice},
                ${fabric || null}, ${description || null}, ${imageUrl}, ${mediaType}, ${JSON.stringify(mediaUrls)}::jsonb, ${in_stock !== false})
        RETURNING *
      `;
      return res.status(201).json({ ok: true, product: normalizeDbProductRow(product) });
    }

    // PUT — update product
    if (req.method === 'PUT') {
      const {
        id,
        title_en,
        title_bn,
        category,
        subcategory,
        price,
        discount_price,
        fabric,
        description,
        image_url,
        media_type,
        media_items,
        media_urls,
        in_stock,
      } = req.body || {};
      if (!id) return res.status(400).json({ ok: false, error: 'id is required' });
      const { mediaUrls, imageUrl, mediaType } = normalizeMediaPayload(
        media_items,
        media_urls,
        image_url,
        media_type
      );
      const normalizedDiscountPrice =
        discount_price !== undefined && discount_price !== null && discount_price !== '' && Number(discount_price) > 0
          ? Number(discount_price)
          : null;
      const [product] = await sql`
        UPDATE products SET
          title_en = ${title_en},
          title_bn = ${title_bn || null},
          category = ${category},
          subcategory = ${subcategory || null},
          price = ${Number(price)},
          discount_price = ${normalizedDiscountPrice},
          fabric = ${fabric || null},
          description = ${description || null},
          image_url = ${imageUrl},
          media_type = ${mediaType},
          media_urls = ${JSON.stringify(mediaUrls)}::jsonb,
          in_stock = ${in_stock !== false}
        WHERE id = ${Number(id)}
        RETURNING *
      `;
      if (!product) return res.status(404).json({ ok: false, error: 'Product not found' });
      return res.status(200).json({ ok: true, product: normalizeDbProductRow(product) });
    }

    // DELETE — remove product
    if (req.method === 'DELETE') {
      const { id } = req.body || {};
      if (!id) return res.status(400).json({ ok: false, error: 'id is required' });
      await sql`DELETE FROM products WHERE id = ${Number(id)}`;
      return res.status(200).json({ ok: true, deleted: id });
    }

    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (err) {
    console.error('[products]', err);
    return res.status(500).json({ ok: false, error: err.message || 'Server error' });
  }
}
