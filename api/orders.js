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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await ensureTables();
    const sql = getDb();

    // POST /api/orders — public, submit new order from checkout
    if (req.method === 'POST') {
      const { customer_name, phone, address, items, total } = req.body || {};
      if (!customer_name || !phone || !address || !items || !total) {
        return res.status(400).json({ ok: false, error: 'customer_name, phone, address, items, and total are required' });
      }
      const [order] = await sql`
        INSERT INTO orders (customer_name, phone, address, items, total)
        VALUES (${customer_name}, ${phone}, ${address}, ${JSON.stringify(items)}, ${Number(total)})
        RETURNING *
      `;
      return res.status(201).json({ ok: true, order });
    }

    // Admin-only routes below
    if (!verifyAdmin(req)) {
      return res.status(401).json({ ok: false, error: 'Unauthorized' });
    }

    // GET /api/orders — admin: list all orders
    if (req.method === 'GET') {
      const orders = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
      return res.status(200).json({ ok: true, orders });
    }

    // PATCH /api/orders — admin: update order status
    if (req.method === 'PATCH') {
      const { id, status } = req.body || {};
      if (!id || !status) return res.status(400).json({ ok: false, error: 'id and status are required' });
      const VALID_STATUSES = ['Pending', 'Accepted', 'Rejected'];
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ ok: false, error: `status must be one of: ${VALID_STATUSES.join(', ')}` });
      }
      const [order] = await sql`
        UPDATE orders SET status = ${status} WHERE id = ${Number(id)} RETURNING *
      `;
      if (!order) return res.status(404).json({ ok: false, error: 'Order not found' });
      return res.status(200).json({ ok: true, order });
    }

    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (err) {
    console.error('[orders]', err);
    return res.status(500).json({ ok: false, error: err.message || 'Server error' });
  }
}
