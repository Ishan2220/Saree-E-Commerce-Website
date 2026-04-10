import { useState } from "react";
import { normalizeProduct } from "../utils/productModel";

const emptyForm = {
  id: "",
  name: "",
  image: "",
  category: "",
  subcategory: "",
  fabric: "",
  occasion: "",
  isTopSelling: false,
};

const AdminForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(() => {
    if (!initialData) return { ...emptyForm };
    const n = normalizeProduct(initialData);
    return n ? { ...emptyForm, ...n } : { ...emptyForm };
  });

  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadingImage(true);
      setError("");

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          // Calculate max dimensions (800px max width/height to stay safely under Firestore 1MB limits)
          const MAX_SIZE = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to JPEG with 0.8 quality
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.8);
          
          setFormData((prev) => ({ ...prev, image: compressedDataUrl }));
          setUploadingImage(false);
        };
        img.onerror = () => {
          setError("Failed to process image.");
          setUploadingImage(false);
        };
      };
      reader.onerror = () => {
        setError("Error reading the image file.");
        setUploadingImage(false);
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.image || !formData.category?.trim()) {
      setError("Name, image, and category are required.");
      return;
    }

    setError("");
    const payload = normalizeProduct({ ...formData });
    if (!payload) return;
    onSave(payload);
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.title}>{initialData ? "Edit product" : "Add new product"}</h2>

      {error && <p style={styles.errorText}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Product name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            placeholder="e.g. Royal Banarasi Silk Saree"
          />
        </div>

        <div style={styles.row}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Category *</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
              placeholder="e.g. Banarasi Sarees"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Subcategory</label>
            <input
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              style={styles.input}
              placeholder="e.g. Bridal (optional)"
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Fabric</label>
            <input
              type="text"
              name="fabric"
              value={formData.fabric}
              onChange={handleChange}
              style={styles.input}
              placeholder="e.g. Pure Silk"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Occasion</label>
            <input
              type="text"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              style={styles.input}
              placeholder="e.g. Wedding"
            />
          </div>
        </div>

        <label style={styles.checkRow}>
          <input
            type="checkbox"
            name="isTopSelling"
            checked={Boolean(formData.isTopSelling)}
            onChange={handleCheckbox}
          />
          <span>Highlight in Top Selling collection</span>
        </label>

        <div style={styles.formGroup}>
          <label style={styles.label}>Product image * (upload file)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={styles.input}
          />
        </div>

        {formData.image && (
          <div style={styles.imagePreviewWrapper}>
            <p style={styles.previewLabel}>Image preview</p>
            <img
              src={formData.image}
              alt="Preview"
              style={styles.imagePreview}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300?text=Invalid+Image";
              }}
            />
          </div>
        )}

        <div style={styles.btnGroup}>
          <button type="button" onClick={onCancel} style={styles.cancelBtn} disabled={uploadingImage}>
            Cancel
          </button>
          <button type="submit" style={{...styles.submitBtn, opacity: uploadingImage ? 0.7 : 1}} disabled={uploadingImage}>
            {uploadingImage ? "Uploading Image..." : "Save product"}
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    backgroundColor: "#fff",
    padding: "32px",
    borderRadius: "16px",
    boxShadow: "0 12px 40px rgba(58, 47, 40, 0.06)",
    border: "1px solid rgba(212, 163, 115, 0.18)",
    marginBottom: "40px",
  },
  title: {
    fontSize: "1.5rem",
    fontFamily: "var(--font-heading)",
    color: "var(--color-dark)",
    marginBottom: "20px",
    borderBottom: "1px solid rgba(212, 163, 115, 0.25)",
    paddingBottom: "12px",
  },
  errorText: {
    color: "#8b2942",
    fontSize: "0.9rem",
    marginBottom: "15px",
    backgroundColor: "rgba(139, 41, 66, 0.06)",
    padding: "12px",
    borderRadius: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  row: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
    minWidth: "200px",
  },
  label: {
    fontSize: "0.8rem",
    fontWeight: "600",
    color: "var(--color-text-main)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  input: {
    padding: "11px 14px",
    border: "1px solid rgba(58, 47, 40, 0.18)",
    borderRadius: "8px",
    fontSize: "1rem",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  checkRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "0.95rem",
    color: "var(--color-dark)",
    cursor: "pointer",
    marginTop: "4px",
  },
  imagePreviewWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginTop: "8px",
  },
  previewLabel: {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "var(--color-text-main)",
  },
  imagePreview: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid rgba(58, 47, 40, 0.1)",
  },
  btnGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  cancelBtn: {
    padding: "11px 22px",
    backgroundColor: "transparent",
    border: "1px solid var(--color-dark)",
    color: "var(--color-dark)",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontFamily: "var(--font-body)",
  },
  submitBtn: {
    padding: "11px 22px",
    backgroundColor: "var(--color-dark)",
    border: "none",
    color: "var(--color-secondary)",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontFamily: "var(--font-body)",
  },
};

export default AdminForm;
