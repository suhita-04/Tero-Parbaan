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
      id            SERIAL PRIMARY KEY,
      title_en      TEXT NOT NULL,
      title_bn      TEXT,
      category      TEXT NOT NULL,
      subcategory   TEXT,
      price         INTEGER NOT NULL,
      fabric        TEXT,
      description   TEXT,
      image_url     TEXT,
      in_stock      BOOLEAN DEFAULT TRUE,
      created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
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
