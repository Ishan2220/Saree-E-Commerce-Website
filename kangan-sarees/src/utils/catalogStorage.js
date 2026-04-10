import { collection, getDocs, doc, setDoc, writeBatch, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import defaultProductsData from "../data/products";
import { normalizeProductsArray } from "./productModel";

export const CATALOG_UPDATED_EVENT = "kangan-catalog-updated";

export function notifyCatalogUpdated() {
  window.dispatchEvent(new Event(CATALOG_UPDATED_EVENT));
}

// Fetch once for initial state
export async function loadCatalogFromStorage() {
  try {
    const q = collection(db, "products");
    const snapshot = await getDocs(q);
    let result = [];
    snapshot.forEach((docSnap) => {
      result.push(docSnap.data());
    });
    
    // Sort logic (assuming descending by ID so newest is top, similar to local storage ordering)
    result.sort((a, b) => b.id - a.id);

    if (result.length === 0) {
      return defaultProductsData;
    }
    return normalizeProductsArray(result, defaultProductsData);
  } catch (err) {
    console.error("Firebase fetch error, falling back to bundled data:", err);
    return defaultProductsData;
  }
}

// Subscribe to real-time updates for the storefront
export function subscribeToCatalog(callback) {
  const q = collection(db, "products");
  return onSnapshot(q, (snapshot) => {
    let result = [];
    snapshot.forEach((docSnap) => {
      result.push(docSnap.data());
    });
    
    result.sort((a, b) => b.id - a.id);

    if (result.length === 0) {
      result = defaultProductsData;
    }
    
    callback(normalizeProductsArray(result, defaultProductsData));
  }, (error) => {
    console.error("Firestore Listen Error:", error);
  });
}

// Admin seed catalog
export async function resetCatalogToDefaults() {
  const copy = defaultProductsData.map((p) => ({ ...p }));
  try {
    const batch = writeBatch(db);
    copy.forEach(p => {
      const ref = doc(db, "products", String(p.id));
      batch.set(ref, p);
    });
    await batch.commit();
  } catch (err) {
    console.error("Batch write failed", err);
  }
  return copy;
}
