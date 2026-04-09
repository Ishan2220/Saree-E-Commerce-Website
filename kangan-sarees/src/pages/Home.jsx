import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadCatalogFromStorage } from "../utils/catalogStorage";
import ProductCard from "../components/ProductCard";
import ClientCarousel from "../components/ClientCarousel";
import FeaturedBanner from "../components/FeaturedBanner";
import BrandStory from "../components/BrandStory";
import Testimonials from "../components/Testimonials";
import useScrollReveal from "../hooks/useScrollReveal";

const Home = () => {
  const [productsData, setProductsData] = useState([]);
  
  // Use the new scroll reveal hook
  useScrollReveal();

  useEffect(() => {
    // Load dynamic data to ensure best sellers show up
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProductsData(loadCatalogFromStorage());
  }, []);

  // Filter bestsellers from dynamic data
  const featuredOnHome = productsData.filter(p => p.isTopSelling).slice(0, 4);

  return (
    <div className="fade-in">
      {/* 1. Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}>
          <div className="container" style={styles.heroContent}>
            <span className="section-label" style={{ color: "var(--color-gold-light)" }}>Established 2000</span>
            <h1 style={styles.heroTitle}>Elegance in Every Drape.</h1>
            <p style={styles.heroSubtitle}>
              Experience Kolhapur&apos;s most trusted destination for premium sarees,
              traditional craftsmanship, and timeless ethnic fashion.
            </p>
            <div style={styles.actionGroup}>
              <Link to="/products" className="btn-primary">Explore Collection</Link>
              <Link to="/contact" className="btn-outline-white">Visit Showroom</Link>
            </div>
          </div>
        </div>
        <div style={styles.scrollIndicator}>
          <div style={styles.scrollChevron}></div>
        </div>
      </section>

      {/* 2. Featured Collections Slider (EDITORAL) */}
      <FeaturedBanner />

      {/* 3. Luxury Featured Products Grid (BEST SELLERS) */}
      <section className="container" style={styles.sectionPadding}>
        <div style={styles.sectionHeader} className="reveal">
          <span className="section-label">Curated Selection</span>
          <h2 className="section-title-lg">Bestsellers of the Season</h2>
          <div className="gold-divider center" />
        </div>
        
        {featuredOnHome.length > 0 ? (
          <div style={styles.grid}>
            {featuredOnHome.map((p) => (
              <div key={p.id} className="reveal stagger-child">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>Discover our premium handpicked essentials.</p>
        )}

        <div style={styles.viewAllContainer}>
          <Link to="/products" className="btn-outline-gold">View Full Collection</Link>
        </div>
      </section>

      {/* 4. Brand Story Section */}
      <BrandStory />

      {/* 5. Why Choose Us (Redesigned with Premium Glassmorphism) */}
      <section style={styles.whyUsSection}>
        <div className="container">
          <div style={styles.sectionHeader} className="reveal">
            <span className="section-label" style={{ color: "rgba(255,255,255,0.7)" }}>The Kangan Promise</span>
            <h2 className="section-title-lg light">Unmatched Shopping Experience</h2>
            <div className="gold-divider center" style={{ background: "var(--color-gold)" }} />
          </div>

          <div style={styles.featuresGrid}>
            {[
              {
                title: "25,000 sq ft Showroom",
                text: "Step into Kolhapur's largest fully air-conditioned retail space designed for luxury and comfort.",
                icon: "🏛️"
              },
              {
                title: "Exquisite Variety",
                text: "From bridal Paithanis to designer gowns, explore 10,000+ handpicked pieces under one roof.",
                icon: "✨"
              },
              {
                title: "Generational Trust",
                text: "Serving families across 10+ districts since 2000 with honesty, quality, and legacy.",
                icon: "🤝"
              }
            ].map((f, i) => (
              <div 
                key={i} 
                className="glass-card reveal stagger-child" 
                style={styles.featureBox}
              >
                <div style={styles.featureIcon}>{f.icon}</div>
                <h3 style={styles.featureTitle}>{f.title}</h3>
                <p style={styles.featureText}>{f.text}</p>
                <div style={styles.cardAccent}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <Testimonials />

      {/* 7. Client Carousel */}
      <ClientCarousel />
      
      <style>{injectStyles}</style>
    </div>
  );
};

const styles = {
  hero: {
    backgroundImage: `url('/images/kk-hero.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    position: "relative",
    display: "flex",
    alignItems: "center",
    marginTop: "-69px", // Offset for fixed navbar
    backgroundAttachment: "fixed",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(74, 0, 17, 0.45) 0%, rgba(74, 0, 17, 0.25) 50%, rgba(74, 0, 17, 0.6) 100%)",
    display: "flex",
    alignItems: "center",
    paddingTop: "60px",
  },
  heroContent: {
    color: "#ffffff",
    maxWidth: "800px",
    zIndex: 1,
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: "clamp(3rem, 7vw, 5.5rem)",
    lineHeight: "1",
    marginBottom: "24px",
    fontFamily: "var(--font-heading)",
    fontWeight: "700",
    textShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },
  heroSubtitle: {
    fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
    marginBottom: "48px",
    color: "rgba(255, 255, 255, 0.95)",
    fontFamily: "var(--font-body)",
    fontWeight: "400",
    lineHeight: "1.6",
    maxWidth: "600px",
  },
  actionGroup: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  scrollIndicator: {
    position: "absolute",
    bottom: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
  },
  scrollChevron: {
    width: "30px",
    height: "30px",
    borderBottom: "2px solid rgba(255,255,255,0.8)",
    borderRight: "2px solid rgba(255,255,255,0.8)",
    transform: "rotate(45deg)",
    animation: "scrollChevron 2s infinite",
  },
  sectionPadding: {
    padding: "var(--section-padding)",
  },
  whyUsSection: {
    backgroundColor: "var(--color-dark)",
    backgroundImage: "linear-gradient(to bottom, var(--color-dark), #300008)",
    padding: "var(--section-padding)",
    color: "#ffffff",
    position: "relative",
    overflow: "hidden",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "64px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "32px",
  },
  viewAllContainer: {
    textAlign: "center",
    marginTop: "64px",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "40px",
  },
  featureBox: {
    padding: "60px 40px",
    textAlign: "center",
  },
  featureIcon: {
    fontSize: "3.5rem",
    marginBottom: "30px",
    display: "block",
    filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.3))",
  },
  featureTitle: {
    color: "var(--color-gold)",
    fontSize: "1.75rem",
    marginBottom: "20px",
    fontWeight: "700",
    fontFamily: "var(--font-heading)",
    letterSpacing: "0.02em",
  },
  featureText: {
    color: "rgba(255,255,255,0.8)",
    lineHeight: "1.9",
    fontSize: "1rem",
    fontWeight: "300",
  },
  cardAccent: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "40px",
    height: "2px",
    backgroundColor: "var(--color-gold)",
    opacity: 0.5,
  }
};

const injectStyles = `
  @media (max-width: 768px) {
    .heroTitle { font-size: 3rem !important; }
    .actionGroup { width: 100%; }
    .actionGroup a { width: 100%; text-align: center; }
  }
  .glass-card:hover .featureIcon { transform: scale(1.1) rotate(5deg); transition: transform 0.4s ease; }
`;

export default Home;