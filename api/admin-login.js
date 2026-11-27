export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { password } = req.body || {};

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'parbon2026';

    if (!password || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ ok: false, error: 'Invalid credentials' });
    }

    // Simple token: base64-encoded timestamp + secret prefix
    const token = Buffer.from(`parbondesk:${Date.now()}:${ADMIN_PASSWORD}`).toString('base64');

    return res.status(200).json({ ok: true, token });
  } catch (err) {
    console.error('[admin-login]', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}
