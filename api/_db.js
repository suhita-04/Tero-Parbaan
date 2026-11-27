import { neon } from '@neondatabase/serverless';

let _sql = null;
let _tablesReady = false;

export function getDb() {
  if (!_sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    _sql = neon(process.env.DATABASE_URL);
  }
  return _sql;
}

export async function ensureTables() {
  if (_tablesReady) return;

  const sql = getDb();

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id             SERIAL PRIMARY KEY,
      title_en       TEXT NOT NULL,
      title_bn       TEXT,
      category       TEXT NOT NULL,
      subcategory    TEXT,
      price          INTEGER NOT NULL,
      discount_price INTEGER,
      fabric         TEXT,
      description    TEXT,
      image_url      TEXT,
      media_type     TEXT DEFAULT 'image',
      in_stock       BOOLEAN DEFAULT TRUE,
      created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    ALTER TABLE products
    ADD COLUMN IF NOT EXISTS media_type TEXT DEFAULT 'image'
  `;

  await sql`
    ALTER TABLE products
    ADD COLUMN IF NOT EXISTS discount_price INTEGER
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS store_settings (
      id                     INTEGER PRIMARY KEY DEFAULT 1,
      dhaka_delivery         INTEGER DEFAULT 80,
      outside_dhaka_delivery INTEGER DEFAULT 150,
      notice_text            TEXT DEFAULT '',
      notice_active          BOOLEAN DEFAULT FALSE
    )
  `;

  await sql`
    INSERT INTO store_settings (id) VALUES (1)
    ON CONFLICT (id) DO NOTHING
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id            SERIAL PRIMARY KEY,
      customer_name TEXT NOT NULL,
      phone         TEXT NOT NULL,
      address       TEXT NOT NULL,
      items         JSONB NOT NULL,
      total         INTEGER NOT NULL,
      status        TEXT DEFAULT 'Pending',
      created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  _tablesReady = true;
}
