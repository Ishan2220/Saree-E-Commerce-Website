import { useEffect, useMemo, useState, useRef } from "react";

import CategoryScrollRow from "../components/CategoryScrollRow";
import useScrollReveal from '../hooks/useScrollReveal';
import { subscribeToCatalog } from "../utils/catalogStorage";

// Fixed display order for categories
const CATEGORY_ORDER = [
  "Sarees",
  "Lehengas",
  "Gowns",
  "Fashion & Ready Wear",
  "Home Decor",
];

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const expandedRef = useRef(null);

  useScrollReveal();

  useEffect(() => {
    const unsubscribe = subscribeToCatalog(setProductsData);
    return () => unsubscribe();
  }, []);

  // Group products by category
  const categorizedProducts = useMemo(() => {
    const map = {};
    for (const p of productsData) {
      const cat = p.category?.trim() || "Uncategorized";
      if (!map[cat]) map[cat] = [];
      map[cat].push(p);
    }
    return map;
  }, [productsData]);

  // Ordered list of categories with products
  const orderedCategories = useMemo(() => {
    const inOrder = CATEGORY_ORDER.filter((c) => categorizedProducts[c]?.length);
    const remaining = Object.keys(categorizedProducts).filter(
      (c) => !CATEGORY_ORDER.includes(c)
    );
    return [...inOrder, ...remaining];
  }, [categorizedProducts]);

  const handleViewAll = (catName) => {
    setExpandedCategory(expandedCategory === catName ? null : catName);
    setTimeout(() => {
      expandedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="fade-in">
      {/* Premium Header */}
      <div style={styles.header}>
        <div className="container" style={styles.headerContent}>
          <span className="section-label" style={{ color: "rgba(255,255,255,0.7)" }}>The Kangan Catalog</span>
          <h1 style={styles.title}>Exquisite Collections</h1>
          <div className="gold-divider center" />
          <p style={styles.subtitle}>
            Explore our meticulously curated selection of ethnic wear, 
            where every thread tells a story of elegance and tradition.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={styles.pageContent}>
        {orderedCategories.map((catName, idx) => (
          <div key={catName}>
            <CategoryScrollRow
              categoryName={catName}
              products={categorizedProducts[catName]}
              onViewAll={handleViewAll}
            />
            {idx < orderedCategories.length - 1 && <div style={styles.sectionDivider}></div>}
          </div>
        ))}

        {/* Expanded "View All" Grid */}
        {expandedCategory && categorizedProducts[expandedCategory] && (
          <section ref={expandedRef} style={styles.expandedSection} className="reveal visible">
            <div style={styles.expandedHeader}>
              <div>
                <span className="section-label">Browsing All</span>
                <h2 style={styles.expandedTitle}>
                  {expandedCategory}
                </h2>
              </div>
              <button
                style={styles.collapseBtn}
                onClick={() => setExpandedCategory(null)}
              >
                ✕ Close
              </button>
            </div>
            
            <div style={styles.expandedGrid}>
              {categorizedProducts[expandedCategory].map((p) => (
                <div key={p.id} className="expanded-card-wrap">
                  <div style={styles.expandedCard}>
                    <div style={styles.expandedImgWrap}>
                      <img
                        src={p.image || "/images/placeholder.png"}
                        alt={p.subcategory || p.name}
                        style={styles.expandedImg}
                        loading="lazy"
                        onError={(e) => (e.target.src = "/images/placeholder.png")}
                      />
                    </div>
                    <div style={styles.expandedInfo}>
                      <span style={styles.expandedSub}>{p.subcategory}</span>
                      <h4 style={styles.expandedName}>{p.name}</h4>
                      <button
                        style={styles.expandedEnquire}
                        onClick={(e) => {
                          e.stopPropagation();
                          const categoryText = p.category || p.subcategory || expandedCategory ? ` (${p.category || p.subcategory || expandedCategory})` : "";
                          const msg = `I am interested in ${p.name}${categoryText}`;
                          window.open(`https://wa.me/919371212625?text=${encodeURIComponent(msg)}`, "_blank");
                        }}
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <style>{`
        .expanded-card-wrap {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .expanded-card-wrap:hover {
          transform: translateY(-8px);
        }
      `}</style>
    </div>
  );
};

const styles = {
  header: {
    backgroundColor: "var(--color-dark)",
    backgroundImage: "linear-gradient(to bottom, var(--color-dark), #300008)",
    color: "#ffffff",
    padding: "160px 0 80px",
    textAlign: "center",
  },
  headerContent: {
    maxWidth: "800px",
  },
  title: {
    color: "#ffffff",
    fontSize: "clamp(2.5rem, 5vw, 4rem)",
    marginBottom: "8px",
    fontFamily: "var(--font-heading)",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "rgba(255,255,255,0.85)",
    lineHeight: 1.7,
    maxWidth: "600px",
    margin: "0 auto",
  },
  pageContent: {
    padding: "80px 20px 100px",
  },
  sectionDivider: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(201, 169, 110, 0.3), transparent)",
    margin: "40px 0 80px",
  },
  expandedSection: {
    marginTop: "40px",
    padding: "60px 40px",
    backgroundColor: "var(--color-cream)",
    borderRadius: "24px",
    boxShadow: "0 10px 40px rgba(74, 0, 17, 0.08)",
    border: "1px solid rgba(201, 169, 110, 0.2)",
  },
  expandedHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "48px",
  },
  expandedTitle: {
    fontFamily: "var(--font-heading)",
    fontSize: "2.4rem",
    color: "var(--color-dark)",
    fontWeight: 700,
    margin: 0,
  },
  collapseBtn: {
    background: "none",
    border: "1.5px solid var(--color-primary)",
    color: "var(--color-primary)",
    padding: "10px 28px",
    borderRadius: "30px",
    fontFamily: "var(--font-body)",
    fontSize: "0.85rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  expandedGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "30px",
  },
  expandedCard: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,0.04)",
  },
  expandedImgWrap: {
    aspectRatio: "3 / 4",
    overflow: "hidden",
  },
  expandedImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  },
  expandedInfo: {
    padding: "24px 20px",
    textAlign: "center",
  },
  expandedSub: {
    fontSize: "0.7rem",
    color: "var(--color-gold)",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    fontWeight: "600",
    display: "block",
    marginBottom: "8px",
  },
  expandedName: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "var(--color-dark)",
    fontFamily: "var(--font-heading)",
    margin: "0 0 16px 0",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  expandedEnquire: {
    background: "var(--color-primary)",
    color: "#fff",
    border: "none",
    padding: "10px 24px",
    borderRadius: "24px",
    fontSize: "0.8rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: "100%",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
};

export default Products;
