/**
 * Canonical catalog item (no price — enquiry-only storefront).
 */

function normalizeId(id) {
  if (id === "" || id == null) return Date.now();
  const n = Number(id);
  return Number.isFinite(n) && n > 0 ? n : Date.now();
}

export function normalizeProduct(p) {
  if (!p || typeof p !== "object") return null;
  return {
    id: normalizeId(p.id),
    name: String(p.name ?? ""),
    image: String(p.image ?? ""),
    category: String(p.category ?? "Uncategorized"),
    subcategory: p.subcategory != null && p.subcategory !== "" ? String(p.subcategory) : "",
    fabric: p.fabric != null && p.fabric !== "" ? String(p.fabric) : "",
    occasion: p.occasion != null && p.occasion !== "" ? String(p.occasion) : "",
    isTopSelling: Boolean(p.isTopSelling),
  };
}

export function normalizeProductsArray(arr, fallback) {
  if (!Array.isArray(arr) || arr.length === 0) return fallback;
  const out = arr.map(normalizeProduct).filter(Boolean);
  return out.length ? out : fallback;
}

/** One card per distinct category; image = first product image in that category. */
export function deriveCategoryCards(products) {
  if (!Array.isArray(products)) return [];
  const firstImageByCategory = new Map();
  for (const p of products) {
    const cat = p.category?.trim() || "Uncategorized";
    if (!firstImageByCategory.has(cat)) {
      firstImageByCategory.set(cat, p.image || "");
    }
  }
  return [...firstImageByCategory.entries()]
    .sort(([a], [b]) => {
      if (a === "Home Decor") return 1;
      if (b === "Home Decor") return -1;
      return a.localeCompare(b);
    })
    .map(([name, image]) => ({ name, image }));
}
