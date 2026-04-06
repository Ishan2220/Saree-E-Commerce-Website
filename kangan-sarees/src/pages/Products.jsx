import { useEffect, useMemo, useState, useRef } from "react";
import ProductCard from "../components/ProductCard";
import CategoryCards from "../components/CategoryCards";
import { deriveCategoryCards } from "../utils/productModel";
import {
  CATALOG_UPDATED_EVENT,
  loadCatalogFromStorage,
} from "../utils/catalogStorage";

const Products = () => {
  const [productsData, setProductsData] = useState(loadCatalogFromStorage);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const showcaseRef = useRef(null);

  const handleCategorySelect = (catName) => {
    setSelectedCategory(catName);
    setTimeout(() => {
      showcaseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  useEffect(() => {
    const sync = () => setProductsData(loadCatalogFromStorage());
    window.addEventListener(CATALOG_UPDATED_EVENT, sync);
    return () => window.removeEventListener(CATALOG_UPDATED_EVENT, sync);
  }, []);

  const categoryCards = useMemo(
    () => deriveCategoryCards(productsData),
    [productsData]
  );

  const displayProducts = useMemo(() => {
    if (selectedCategory) {
      return productsData.filter((p) => p.category === selectedCategory);
    }
    return productsData.filter((p) => p.isTopSelling);
  }, [productsData, selectedCategory]);

  const sectionTitle = selectedCategory
    ? selectedCategory
    : "Top Selling Collection";

  const sectionTagline = selectedCategory
    ? `${displayProducts.length} piece${displayProducts.length === 1 ? "" : "s"} in this category`
    : "Handpicked favorites from our showroom";

  return (
    <div className="fade-in">
      <div style={styles.header}>
        <div className="container" style={styles.headerContent}>
          <h1 style={styles.title}>Our Collection</h1>
          <p style={styles.subtitle}>
            Krishna Kangan Sarees — craftsmanship, texture, and occasion-perfect
            pieces curated for you.
          </p>
        </div>
      </div>

      <div className="container" style={styles.pageContent}>
        <CategoryCards
          categories={categoryCards}
          selectedName={selectedCategory}
          onSelect={handleCategorySelect}
        />

        <section
          ref={showcaseRef}
          className="products-showcase-section"
          aria-label={sectionTitle}
          style={styles.showcase}
        >
          <header style={styles.showcaseHeader}>
            <h2 style={styles.showcaseTitle}>{sectionTitle}</h2>
            <p style={styles.showcaseTagline}>{sectionTagline}</p>
            <div style={styles.showcaseRule} aria-hidden />
          </header>

          <div
            key={selectedCategory ?? "top-selling"}
            style={styles.grid}
            className="products-showcase-grid"
          >
            {displayProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {displayProducts.length === 0 && (
            <div style={styles.empty}>
              {selectedCategory ? (
                <>
                  <p>No pieces in this category yet.</p>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                    style={styles.resetBtn}
                  >
                    Back to top selling
                  </button>
                </>
              ) : (
                <>
                  <p>
                    No top-selling pieces are highlighted yet. Explore a category
                    above, or visit our showroom for the full range.
                  </p>
                </>
              )}
            </div>
          )}
        </section>
      </div>

      <style>{`
        .products-showcase-grid {
          animation: showcaseFade 0.4s ease;
        }
        @keyframes showcaseFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  header: {
    backgroundColor: "var(--color-dark)",
    color: "var(--color-secondary)",
    padding: "80px 0",
    textAlign: "center",
  },
  headerContent: {
    maxWidth: "800px",
  },
  title: {
    color: "var(--color-primary)",
    fontSize: "3rem",
    marginBottom: "15px",
  },
  subtitle: {
    fontSize: "1.1rem",
    opacity: 0.88,
    lineHeight: 1.65,
  },
  pageContent: {
    padding: "56px 20px 88px",
  },
  showcase: {
    marginTop: "8px",
  },
  showcaseHeader: {
    marginBottom: "36px",
    textAlign: "left",
  },
  showcaseTitle: {
    fontFamily: "var(--font-heading)",
    fontSize: "clamp(1.6rem, 3.5vw, 2.1rem)",
    color: "var(--color-dark)",
    fontWeight: 600,
    letterSpacing: "0.03em",
    margin: "0 0 10px",
  },
  showcaseTagline: {
    fontSize: "0.95rem",
    color: "var(--color-text-muted)",
    margin: 0,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  showcaseRule: {
    height: "2px",
    width: "56px",
    background: "linear-gradient(90deg, var(--color-primary), transparent)",
    marginTop: "18px",
    borderRadius: "1px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "clamp(28px, 4vw, 40px)",
  },
  empty: {
    textAlign: "center",
    padding: "64px 20px",
    fontSize: "1.05rem",
    color: "var(--color-text-muted)",
    lineHeight: 1.65,
    maxWidth: "480px",
    margin: "0 auto",
  },
  resetBtn: {
    marginTop: "22px",
    padding: "12px 28px",
    backgroundColor: "transparent",
    border: "1px solid var(--color-primary)",
    color: "var(--color-dark)",
    borderRadius: "999px",
    fontFamily: "var(--font-body)",
    fontSize: "0.85rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
};

export default Products;
