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

const DEFAULT_SETTINGS = {
  id: 1,
  dhaka_delivery: 80,
  outside_dhaka_delivery: 150,
  notice_text: '',
  notice_active: false,
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await ensureTables();
    const sql = getDb();

    // GET /api/settings — public
    if (req.method === 'GET') {
      const [settings] = await sql`SELECT * FROM store_settings WHERE id = 1`;
      return res.status(200).json({ ok: true, settings: settings || DEFAULT_SETTINGS });
    }

    // Admin-only write operations
    if (!verifyAdmin(req)) {
      return res.status(401).json({ ok: false, error: 'Unauthorized' });
    }

    // PUT /api/settings — admin: update store settings
    if (req.method === 'PUT') {
      const {
        dhaka_delivery,
        outside_dhaka_delivery,
        notice_text,
        notice_active,
      } = req.body || {};

      const dhakaFee = Math.max(0, Number(dhaka_delivery ?? DEFAULT_SETTINGS.dhaka_delivery) || 0);
      const outsideFee = Math.max(0, Number(outside_dhaka_delivery ?? DEFAULT_SETTINGS.outside_dhaka_delivery) || 0);
      const noticeText = typeof notice_text === 'string' ? notice_text.trim() : '';
      const noticeActive = Boolean(notice_active);

      const [settings] = await sql`
        INSERT INTO store_settings (id, dhaka_delivery, outside_dhaka_delivery, notice_text, notice_active)
        VALUES (1, ${dhakaFee}, ${outsideFee}, ${noticeText}, ${noticeActive})
        ON CONFLICT (id) DO UPDATE SET
          dhaka_delivery = EXCLUDED.dhaka_delivery,
          outside_dhaka_delivery = EXCLUDED.outside_dhaka_delivery,
          notice_text = EXCLUDED.notice_text,
          notice_active = EXCLUDED.notice_active
        RETURNING *
      `;

      return res.status(200).json({ ok: true, settings });
    }

    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (err) {
    console.error('[settings]', err);
    return res.status(500).json({ ok: false, error: err.message || 'Server error' });
  }
}
