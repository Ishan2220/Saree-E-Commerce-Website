import { useState, useEffect } from "react";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import AdminForm from "../components/AdminForm";
import {
  subscribeToCatalog,
  resetCatalogToDefaults,
} from "../utils/catalogStorage";
import { normalizeProduct } from "../utils/productModel";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    const unsub = subscribeToCatalog(setProducts);
    return () => unsub();
  }, []);

  const handleResetToDefaults = async () => {
    if (
      !window.confirm(
        "Replace the entire catalog with the default list from the app? Any products you added or edited in the browser will be lost."
      )
    ) {
      return;
    }
    setLoadingAction(true);
    await resetCatalogToDefaults();
    setLoadingAction(false);
    showSuccess("Catalog reset to defaults. Collection page updated.");
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsFormVisible(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoadingAction(true);
      try {
        await deleteDoc(doc(db, "products", String(id)));
        showSuccess("Product deleted successfully!");
      } catch (err) {
        console.error("Delete failed", err);
      }
      setLoadingAction(false);
    }
  };

  const handleSaveForm = async (raw) => {
    const product = normalizeProduct(raw);
    if (!product) return;

    setLoadingAction(true);
    try {
      await setDoc(doc(db, "products", String(product.id)), product);
      if (editingProduct) {
        showSuccess("Product updated successfully!");
      } else {
        showSuccess("New product added successfully!");
      }
      setIsFormVisible(false);
    } catch (err) {
      console.error("Save failed", err);
    }
    setLoadingAction(false);
  };

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="fade-in" style={styles.page}>
      <div style={styles.header}>
        <div className="container">
          <h1 style={styles.title}>Catalog management</h1>
          <p style={styles.subtitle}>
            Kangan Sarees — products sync to the storefront catalog
            (no pricing; enquiry-led).
          </p>
        </div>
      </div>

      <div className="container" style={styles.content}>
        {successMessage && (
          <div style={styles.successBanner}>✓ {successMessage}</div>
        )}

        {isFormVisible ? (
          <AdminForm
            key={editingProduct?.id ?? "new"}
            initialData={editingProduct}
            onSave={handleSaveForm}
            onCancel={() => setIsFormVisible(false)}
          />
        ) : (
          <div style={styles.panelControls}>
            <div style={styles.panelLeft}>
              <button onClick={handleAddNew} style={styles.addBtn}>
                + Add new product
              </button>
              <button
                type="button"
                onClick={handleResetToDefaults}
                style={styles.resetBtn}
              >
                Reset catalog to defaults
              </button>
            </div>
            <p style={styles.countText}>Total items: {products.length}</p>
          </div>
        )}

        {!isFormVisible && (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Image</th>
                  <th style={styles.th}>Product</th>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Subcategory</th>
                  <th style={styles.th}>Top selling</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} style={styles.tr}>
                    <td style={styles.td}>
                      <img
                        src={p.image}
                        alt={p.name}
                        style={styles.thumb}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/50";
                        }}
                      />
                    </td>
                    <td style={styles.td}>
                      <strong>{p.name}</strong>
                      <div style={styles.metaRow}>
                        {p.fabric && (
                          <span style={styles.meta}>{p.fabric}</span>
                        )}
                        {p.occasion && (
                          <span style={styles.meta}> • {p.occasion}</span>
                        )}
                      </div>
                    </td>
                    <td style={styles.td}>{p.category}</td>
                    <td style={styles.td}>{p.subcategory || "—"}</td>
                    <td style={styles.td}>
                      {p.isTopSelling ? (
                        <span style={styles.badgeTop}>Yes</span>
                      ) : (
                        <span style={styles.badgeMuted}>—</span>
                      )}
                    </td>
                    <td style={styles.tdActions}>
                      <button
                        onClick={() => handleEdit(p)}
                        style={styles.editBtn}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        style={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        textAlign: "center",
                        padding: "30px",
                        color: "#888",
                      }}
                    >
                      No products found. Start adding some!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: "var(--color-bg)",
    minHeight: "80vh",
  },
  header: {
    backgroundColor: "var(--color-dark)",
    color: "var(--color-secondary)",
    padding: "160px 0 80px",
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    color: "#ffffff",
    fontSize: "2.5rem",
    marginBottom: "10px",
    fontFamily: "var(--font-heading)",
  },
  subtitle: {
    fontSize: "1rem",
    opacity: 0.85,
    maxWidth: "520px",
    margin: "0 auto",
    lineHeight: 1.55,
  },
  content: {
    maxWidth: "1120px",
    margin: "0 auto",
    padding: "0 20px 80px 20px",
  },
  successBanner: {
    backgroundColor: "#e8f4ea",
    color: "#1e4620",
    padding: "14px 18px",
    borderRadius: "10px",
    marginBottom: "20px",
    fontWeight: "600",
    textAlign: "center",
    border: "1px solid #c3e6cb",
  },
  panelControls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "15px",
  },
  panelLeft: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "12px",
  },
  addBtn: {
    backgroundColor: "var(--color-primary)",
    color: "#ffffff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(212, 163, 115, 0.3)",
    transition: "transform 0.2s ease",
    fontFamily: "var(--font-body)",
  },
  resetBtn: {
    padding: "11px 18px",
    backgroundColor: "transparent",
    border: "1px solid rgba(58, 47, 40, 0.35)",
    color: "var(--color-text-main)",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "0.85rem",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    transition: "border-color 0.2s ease, background-color 0.2s ease",
  },
  countText: {
    color: "var(--color-text-muted)",
    fontWeight: "600",
  },
  tableWrapper: {
    backgroundColor: "#fff",
    borderRadius: "14px",
    overflowX: "auto",
    boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
    border: "1px solid rgba(212, 163, 115, 0.12)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  th: {
    backgroundColor: "rgba(212, 163, 115, 0.12)",
    padding: "14px 18px",
    color: "var(--color-dark)",
    fontWeight: "600",
    textTransform: "uppercase",
    fontSize: "0.78rem",
    letterSpacing: "0.08em",
    borderBottom: "1px solid rgba(212, 163, 115, 0.2)",
  },
  tr: {
    borderBottom: "1px solid rgba(58, 47, 40, 0.06)",
    transition: "background-color 0.2s ease",
  },
  td: {
    padding: "14px 18px",
    color: "var(--color-text-main)",
    verticalAlign: "middle",
    fontSize: "0.95rem",
  },
  tdActions: {
    padding: "14px 18px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  thumb: {
    width: "56px",
    height: "56px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  metaRow: {
    fontSize: "0.8rem",
    color: "var(--color-text-muted)",
    marginTop: "4px",
  },
  meta: {
    color: "var(--color-primary)",
  },
  badgeTop: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "0.75rem",
    fontWeight: "700",
    backgroundColor: "rgba(212, 163, 115, 0.25)",
    color: "var(--color-dark)",
  },
  badgeMuted: {
    color: "var(--color-text-muted)",
  },
  editBtn: {
    padding: "6px 12px",
    backgroundColor: "transparent",
    border: "1px solid var(--color-primary)",
    color: "var(--color-primary)",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  deleteBtn: {
    padding: "6px 12px",
    backgroundColor: "rgba(255,0,0,0.05)",
    border: "1px solid rgba(255,0,0,0.3)",
    color: "red",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
};

export default Admin;
