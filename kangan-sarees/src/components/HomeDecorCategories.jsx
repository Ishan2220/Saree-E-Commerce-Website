import React, { useState } from 'react';

const subcategories = [
  {
    id: "luxury-bedsheets",
    name: "Luxury Bedsheets",
    tagline: "Sleep in Luxury",
    image: "/images/hd_bedsheets.png"
  },
  {
    id: "doormats",
    name: "Doormats",
    tagline: "First Impression Matters",
    image: "/images/hd_doormats.png"
  },
  {
    id: "carpets",
    name: "Carpets",
    tagline: "Define Your Space",
    image: "/images/hd_carpets.png"
  },
  {
    id: "comforters",
    name: "Comforters",
    tagline: "Ultimate Comfort",
    image: "/images/hd_comforters.png"
  },
  {
    id: "luxury-towels",
    name: "Luxury Towels",
    tagline: "Softness You Deserve",
    image: "/images/hd_towels.png"
  }
];

const HomeDecorCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="home-decor-section reveal">
      <div style={styles.header}>
        <h2 style={styles.title}>Home Decor</h2>
        <p style={{ margin: 0, opacity: 0.8, color: "var(--color-text-muted)", fontSize: "1.05rem" }}>
          Explore our premium lifestyle collection and elevate your living spaces.
        </p>
      </div>

      <div className="hd-grid">
        {subcategories.map((cat, idx) => (
          <div 
            key={cat.id} 
            className="hd-card stagger-child reveal" 
            style={{ animationDelay: `${idx * 0.1}s` }}
            onClick={() => setSelectedCategory(cat)}
          >
            <div className="hd-image-wrapper">
              <img src={cat.image} alt={cat.name} className="hd-image" loading="lazy" />
              <div className="hd-overlay"></div>
            </div>
            <div className="hd-content">
              <span className="hd-tagline">{cat.tagline}</span>
              <h3 className="hd-name">{cat.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div style={styles.modalOverlay} onClick={() => setSelectedCategory(null)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setSelectedCategory(null)}>×</button>
            <div style={{...styles.modalImgWrap, backgroundImage: `url(${selectedCategory.image})`}}>
              <div style={styles.modalImgOverlay}></div>
              <h3 style={styles.modalTitle}>{selectedCategory.name}</h3>
            </div>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "32px", padding: "0 20px", lineHeight: "1.6" }}>
              Our complete catalog for <strong style={{color: "var(--color-dark)"}}>{selectedCategory.name}</strong> will be available online soon. Please visit our showroom to experience the full <em>{selectedCategory.tagline}</em> collection in person.
            </p>
            <button className="btn-primary" onClick={() => setSelectedCategory(null)}>Back to Collections</button>
          </div>
        </div>
      )}

      <style>{injectStyles}</style>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "24px",
  },
  title: {
    fontFamily: "var(--font-heading)",
    fontSize: "clamp(2rem, 3vw, 2.5rem)",
    fontWeight: 700,
    color: "var(--color-dark)",
    margin: "0 0 8px 0",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(5px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
    animation: "fadeIn 0.3s ease-out",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: "var(--radius-card)",
    maxWidth: "450px",
    width: "100%",
    textAlign: "center",
    position: "relative",
    boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
    animation: "zoomIn 0.3s ease-out",
    overflow: "hidden",
    paddingBottom: "40px",
  },
  closeBtn: {
    position: "absolute",
    top: "16px",
    right: "16px",
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(4px)",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    border: "none",
    fontSize: "1.5rem",
    color: "#fff",
    cursor: "pointer",
    lineHeight: "1",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.3s ease",
  },
  modalImgWrap: {
    width: "100%",
    height: "220px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    padding: "30px",
    marginBottom: "24px",
  },
  modalImgOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 100%)",
  },
  modalTitle: {
    position: "relative",
    color: "#fff",
    fontSize: "2.2rem",
    margin: 0,
    fontFamily: "var(--font-heading)",
    zIndex: 2,
    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
  }
};

const injectStyles = `
  .home-decor-section {
    padding: 20px 0;
  }

  .hd-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 24px;
    padding-bottom: 20px;
  }

  .hd-card {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 3 / 4;
    cursor: pointer;
    box-shadow: var(--shadow-card);
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .hd-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .hd-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .hd-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%);
    transition: background 0.5s ease;
  }

  .hd-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 24px 20px;
    color: #ffffff;
    z-index: 2;
    transform: translateY(0);
    transition: transform 0.5s ease;
  }

  .hd-tagline {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--color-gold-light) !important;
    font-weight: 600;
    display: block;
    margin-bottom: 8px;
    opacity: 1;
    transform: translateY(0);
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .hd-name {
    font-size: 1.4rem;
    font-family: var(--font-heading) !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    margin: 0 !important;
    text-shadow: 0 3px 16px rgba(0,0,0,0.7);
    line-height: 1.2;
    transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  /* Hover Effects */
  .hd-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-card-hover);
  }

  .hd-card:hover .hd-image {
    transform: scale(1.12);
    filter: brightness(1.1);
  }

  .hd-card:hover .hd-overlay {
    background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.1) 100%);
  }

  .hd-card:hover .hd-tagline {
    color: var(--color-gold) !important;
  }

  .hd-card:hover .hd-name {
    transform: translateY(-2px);
    color: #ffffff !important;
  }

  /* Responsiveness */
  @media (max-width: 1200px) {
    .hd-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 768px) {
    .hd-grid {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      padding-bottom: 24px;
      -webkit-overflow-scrolling: touch;
      margin-right: -20px; /* Bleed edge */
      padding-right: 20px;
    }
    
    .hd-grid::-webkit-scrollbar {
      display: none;
    }

    .hd-card {
      min-width: 260px;
      scroll-snap-align: start;
      aspect-ratio: auto;
      height: 350px;
    }
  }

  @media (max-width: 480px) {
    .hd-card {
      min-width: 240px;
      height: 320px;
    }
  }
`;

export default HomeDecorCategories;
