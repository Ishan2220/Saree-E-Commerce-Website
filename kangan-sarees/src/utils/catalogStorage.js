import defaultProductsData from "../data/products";
import { normalizeProductsArray } from "./productModel";

/** Stored JSON array of products */
export const CATALOG_STORAGE_KEY = "kangan_products";

const SEED_VERSION_KEY = "kangan_catalog_seed_version";

/**
 * Bump this number whenever `products.js` default catalog changes (images, items).
 * If the saved version is older, the app clears the old saved catalog and replaces it
 * with bundled defaults (new image paths from /public/images/).
 */
export const CATALOG_SEED_VERSION = 8;

export function loadCatalogFromStorage() {
  const storedVersion = localStorage.getItem(SEED_VERSION_KEY);
  const saved = localStorage.getItem(CATALOG_STORAGE_KEY);

  let result = defaultProductsData;

  const versionMatches = storedVersion === String(CATALOG_SEED_VERSION);

  if (versionMatches && saved) {
    try {
      result = normalizeProductsArray(JSON.parse(saved), defaultProductsData);
    } catch {
      localStorage.removeItem(CATALOG_STORAGE_KEY);
      result = defaultProductsData;
    }
  } else {
    // First visit, or seed updated in code — use bundled defaults
    result = defaultProductsData;
    localStorage.setItem(SEED_VERSION_KEY, String(CATALOG_SEED_VERSION));
  }

  localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(result));
  return result;
}

/** Replace saved catalog with `products.js` defaults (admin tool). */
export function resetCatalogToDefaults() {
  localStorage.setItem(SEED_VERSION_KEY, String(CATALOG_SEED_VERSION));
  const copy = defaultProductsData.map((p) => ({ ...p }));
  localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(copy));
  return copy;
}

export const CATALOG_UPDATED_EVENT = "kangan-catalog-updated";

export function notifyCatalogUpdated() {
  window.dispatchEvent(new Event(CATALOG_UPDATED_EVENT));
}
