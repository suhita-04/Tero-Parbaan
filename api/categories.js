import { getDb, ensureTables, verifyAdmin } from './_db.js';

const DEFAULT_CATEGORIES = ['Saree', 'Blouse', 'Kurti', 'Stole'];
const DEFAULT_SAREE_SUBCATEGORIES = ['Shuti', 'Handloom', 'Muslin', 'Silk'];

function addUniqueCaseInsensitive(list, seen, value) {
  const trimmed = String(value || '').trim();
  if (!trimmed) return;
  const key = trimmed.toLowerCase();
  if (!seen.has(key)) {
    seen.add(key);
    list.push(trimmed);
  }
}

async function getMergedCategoriesPayload(sql) {
  const categories = [];
  const catSeen = new Set();
  const subcategories = [];
  const subSeen = new Set();
  const subcategoriesByParent = {};
  const parentSubSeen = {};

  const ensureParentList = (parent) => {
    const p = String(parent || '').trim();
    if (!p) return null;
    // Match canonical category casing if already known
    const canonical =
      categories.find((c) => c.toLowerCase() === p.toLowerCase()) || p;
    if (!subcategoriesByParent[canonical]) {
      subcategoriesByParent[canonical] = [];
      parentSubSeen[canonical] = new Set();
    }
    return canonical;
  };

  // 1. Seed defaults
  for (const cat of DEFAULT_CATEGORIES) {
    addUniqueCaseInsensitive(categories, catSeen, cat);
  }
  const sareeKey = ensureParentList('Saree');
  for (const sub of DEFAULT_SAREE_SUBCATEGORIES) {
    addUniqueCaseInsensitive(subcategories, subSeen, sub);
    addUniqueCaseInsensitive(subcategoriesByParent[sareeKey], parentSubSeen[sareeKey], sub);
  }

  // 2. Saved categories table rows
  const savedRows = await sql`
    SELECT type, name, parent_category FROM categories ORDER BY id ASC
  `;
  for (const row of savedRows) {
    if (row.type === 'category') {
      addUniqueCaseInsensitive(categories, catSeen, row.name);
      ensureParentList(row.name);
    } else if (row.type === 'subcategory') {
      addUniqueCaseInsensitive(subcategories, subSeen, row.name);
      const parentName = ensureParentList(row.parent_category || 'Saree');
      if (parentName) {
        addUniqueCaseInsensitive(
          subcategoriesByParent[parentName],
          parentSubSeen[parentName],
          row.name
        );
      }
    }
  }

  // 3. Distinct categories & subcategories already used in products
  const productRows = await sql`
    SELECT DISTINCT category, subcategory FROM products
  `;
  for (const row of productRows) {
    if (row.category) {
      addUniqueCaseInsensitive(categories, catSeen, row.category);
      const parentName = ensureParentList(row.category);
      if (row.subcategory && parentName) {
        addUniqueCaseInsensitive(subcategories, subSeen, row.subcategory);
        addUniqueCaseInsensitive(
          subcategoriesByParent[parentName],
          parentSubSeen[parentName],
          row.subcategory
        );
      }
    }
  }

  return { categories, subcategories, subcategoriesByParent };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await ensureTables();
    const sql = getDb();

    // GET /api/categories — public
    if (req.method === 'GET') {
      const payload = await getMergedCategoriesPayload(sql);
      return res.status(200).json({ ok: true, ...payload });
    }

    // Admin auth required for POST
    if (!verifyAdmin(req)) {
      return res.status(401).json({ ok: false, error: 'Unauthorized' });
    }

    // POST /api/categories — add new category or subcategory
    if (req.method === 'POST') {
      const { type, name, parent_category } = req.body || {};
      const cleanName = String(name || '').trim();
      const cleanParent = type === 'subcategory' ? String(parent_category || '').trim() : '';

      if (type !== 'category' && type !== 'subcategory') {
        return res.status(400).json({ ok: false, error: "type must be 'category' or 'subcategory'" });
      }
      if (!cleanName) {
        return res.status(400).json({ ok: false, error: 'name is required' });
      }

      await sql`
        INSERT INTO categories (type, name, parent_category)
        VALUES (${type}, ${cleanName}, ${cleanParent})
        ON CONFLICT (type, name, parent_category) DO NOTHING
      `;

      const payload = await getMergedCategoriesPayload(sql);
      return res.status(201).json({
        ok: true,
        ...payload,
        created: { type, name: cleanName, parent_category: cleanParent },
      });
    }

    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (err) {
    console.error('[categories]', err);
    return res.status(500).json({ ok: false, error: err.message || 'Server error' });
  }
}
