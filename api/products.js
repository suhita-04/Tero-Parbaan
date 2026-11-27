import { getDb, ensureTables, verifyAdmin } from './_db.js';

function normalizeMediaPayload(mediaItems, mediaUrls, imageUrl, mediaType) {
  const sourceArray = Array.isArray(mediaItems)
    ? mediaItems
    : Array.isArray(mediaUrls)
      ? mediaUrls
      : null;

  let normalizedItems = [];
  if (sourceArray) {
    normalizedItems = sourceArray
      .filter((item) => item && String(item.url || '').trim())
      .map((item) => ({
        url: String(item.url).trim(),
        media_type: item.media_type === 'video' ? 'video' : 'image',
      }));
  } else if (imageUrl && String(imageUrl).trim()) {
    normalizedItems = [
      {
        url: String(imageUrl).trim(),
        media_type: mediaType === 'video' ? 'video' : 'image',
      },
    ];
  }

  const primaryUrl = normalizedItems[0]?.url || (imageUrl ? String(imageUrl).trim() : '') || '';
  const primaryType =
    normalizedItems[0]?.media_type || (mediaType === 'video' ? 'video' : 'image');

  return {
    mediaUrls: normalizedItems,
    imageUrl: primaryUrl || null,
    mediaType: primaryType,
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
      return res.status(200).json({ ok: true, products });
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
      return res.status(201).json({ ok: true, product });
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
      return res.status(200).json({ ok: true, product });
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
