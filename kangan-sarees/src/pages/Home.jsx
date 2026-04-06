import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}>
          <div className="container" style={styles.heroContent}>
            <h1 className="heroTitle" style={styles.heroTitle}>25 Years of Trust.</h1>
            <p className="heroSubtitle" style={styles.heroSubtitle}>Welcome to Krishna Kangan Sarees — Kolhapur&apos;s trusted destination for premium sarees and apparel. Unmatched variety and timeless craftsmanship.</p>
            <div className="actionGroup" style={styles.actionGroup}>
               <Link to="/products" className="btn-primary" style={styles.heroBtn}>View Collection</Link>
               <Link to="/contact" className="btn-secondary" style={styles.heroBtnOutline}>Visit Store</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container" style={styles.featuredSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Curated For You</h2>
          <p style={styles.sectionSubtitle}>Handpicked masterpieces from our showroom</p>
          <div style={styles.divider}></div>
        </div>
        <div style={styles.grid}>
          {products.slice(0, 3).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div style={styles.viewAllContainer}>
           <Link to="/products" style={styles.viewAllLink}>View Full Collection &rarr;</Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={styles.featuresWrapper}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={{...styles.sectionTitle, color: "var(--color-primary)"}}>Why Choose Us?</h2>
            <div style={{...styles.divider, backgroundColor: "var(--color-secondary)"}}></div>
          </div>
          <div style={styles.featuresGrid}>
            <div style={styles.featureBox}>
              <h3 style={styles.featureTitle}>The 20,000 sq ft Flagship</h3>
              <p style={styles.featureText}>Experience Kolhapur's largest and most premium air-conditioned shopping environment, built to provide unparalleled comfort.</p>
            </div>
            <div style={styles.featureBox}>
              <h3 style={styles.featureTitle}>District's No.1 Variety</h3>
              <p style={styles.featureText}>From pure bridal Paithanis to Raymond suiting and handloom fabrics, explore endless high-quality choices under one roof.</p>
            </div>
            <div style={styles.featureBox}>
              <h3 style={styles.featureTitle}>25+ Years of Trust</h3>
              <p style={styles.featureText}>Since 2000, our honest pricing and premium quality have earned the loyalty of families traveling from across 10+ districts.</p>
            </div>
          </div>
        </div>
      </section>
      
      <style>{injectGlobalBtns}</style>
    </div>
  );
};

const styles = {
  hero: {
    backgroundImage: `url('/images/kk-hero.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "85vh",
    position: "relative",
  },
  heroOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(58, 47, 40, 0.4)", // Dark brown overlay preserved perfectly
    display: "flex",
    alignItems: "center",
  },
  heroContent: {
    color: "var(--color-secondary)",
    maxWidth: "700px",
  },
  heroTitle: {
    color: "var(--color-secondary)",
    fontSize: "4rem",
    lineHeight: "1.1",
    marginBottom: "20px",
  },
  heroSubtitle: {
    fontSize: "1.3rem",
    marginBottom: "40px",
    opacity: 0.9,
    fontFamily: "var(--font-body)",
  },
  actionGroup: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  heroBtn: {
    display: "inline-block",
  },
  heroBtnOutline: {
    display: "inline-block",
    padding: "12px 30px",
    border: "2px solid var(--color-primary)",
    color: "var(--color-secondary)",
    textTransform: "uppercase",
    letterSpacing: "1px",
    borderRadius: "4px",
    transition: "var(--transition-smooth)",
    fontWeight: "500",
  },
  featuredSection: {
    padding: "100px 20px",
  },
  featuresWrapper: {
    backgroundColor: "var(--color-dark)",
    padding: "100px 20px",
    color: "var(--color-secondary)",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "60px",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    marginBottom: "10px",
  },
  sectionSubtitle: {
    color: "var(--color-text-muted)",
    fontSize: "1.1rem",
    marginBottom: "20px",
  },
  divider: {
    width: "60px",
    height: "2px",
    backgroundColor: "var(--color-primary)",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "40px",
  },
  viewAllContainer: {
    textAlign: "center",
    marginTop: "60px",
  },
  viewAllLink: {
    color: "var(--color-dark)",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontSize: "0.9rem",
    fontWeight: "600",
    borderBottom: "1px solid var(--color-dark)",
    paddingBottom: "5px",
    transition: "var(--transition-smooth)",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "40px",
    textAlign: "center",
  },
  featureBox: {
    padding: "30px",
    border: "1px solid rgba(212, 163, 115, 0.2)",
    borderRadius: "8px",
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  featureTitle: {
    color: "var(--color-primary)",
    fontSize: "1.4rem",
    marginBottom: "15px",
  },
  featureText: {
    opacity: 0.8,
    lineHeight: "1.7",
  }
};

const injectGlobalBtns = `
.btn-secondary:hover {
  background-color: var(--color-primary);
  color: #fff !important;
}
@media (max-width: 768px) {
  .heroTitle {
    font-size: 2.5rem !important;
  }
  .heroSubtitle {
    font-size: 1.1rem !important;
  }
  .actionGroup {
    flex-direction: column;
    width: 100%;
  }
  .actionGroup a {
    text-align: center;
    width: 100%;
  }
}
`;

export default Home;