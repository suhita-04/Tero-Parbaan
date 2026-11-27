import { getDb, ensureTables } from './_db.js';

function verifyAdmin(req) {
  const auth = req.headers['authorization'] || '';
  const token = auth.replace('Bearer ', '').trim();
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'parbon2026';
    return decoded.startsWith('parbondesk:') && decoded.endsWith(`:${ADMIN_PASSWORD}`);
  } catch {
    return false;
  }
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
      const { title_en, title_bn, category, subcategory, price, fabric, description, image_url, media_type, in_stock } = req.body || {};
      if (!title_en || !category || !price) {
        return res.status(400).json({ ok: false, error: 'title_en, category, and price are required' });
      }
      const normalizedMediaType = media_type === 'video' ? 'video' : 'image';
      const [product] = await sql`
        INSERT INTO products (title_en, title_bn, category, subcategory, price, fabric, description, image_url, media_type, in_stock)
        VALUES (${title_en}, ${title_bn || null}, ${category}, ${subcategory || null}, ${Number(price)},
                ${fabric || null}, ${description || null}, ${image_url || null}, ${normalizedMediaType}, ${in_stock !== false})
        RETURNING *
      `;
      return res.status(201).json({ ok: true, product });
    }

    // PUT — update product
    if (req.method === 'PUT') {
      const { id, title_en, title_bn, category, subcategory, price, fabric, description, image_url, media_type, in_stock } = req.body || {};
      if (!id) return res.status(400).json({ ok: false, error: 'id is required' });
      const normalizedMediaType = media_type === 'video' ? 'video' : 'image';
      const [product] = await sql`
        UPDATE products SET
          title_en = ${title_en},
          title_bn = ${title_bn || null},
          category = ${category},
          subcategory = ${subcategory || null},
          price = ${Number(price)},
          fabric = ${fabric || null},
          description = ${description || null},
          image_url = ${image_url || null},
          media_type = ${normalizedMediaType},
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
