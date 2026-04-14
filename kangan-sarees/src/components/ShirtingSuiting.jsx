import React, { useState } from 'react';

const brands = [
  { name: "Mafatlal",      logo: "M",   subtitle: "Premium Cotton",  image: "/images/ss_mafatlal.png" },
  { name: "Gini",          logo: "G",   subtitle: "Fine Shirting",   image: "/images/ss_gini.png" },
  { name: "Siyaram's",     logo: "S",   subtitle: "Classic Weaves",  image: "/images/ss_siyaram.png" },
  { name: "Raymond",       logo: "R",   subtitle: "Luxury Suiting",  image: "/images/ss_raymond.png" },
  { name: "Birla Century", logo: "BC",  subtitle: "Superior Fabric", image: "/images/ss_birla_century.png" },
  { name: "Don & Julio",   logo: "D&J", subtitle: "Italian Style",   image: "/images/ss_don_julio.png" },
  { name: "Linen Club",    logo: "LC",  subtitle: "Pure Linen",      image: "/images/ss_linen_club.png" },
  { name: "Solino",        logo: "So",  subtitle: "Giza Cotton & Linen", image: "/images/ss_solino.png" },
];

/* ─── Main Component ─── */

const ShirtingSuiting = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);

  return (
    <section className="shirting-section">
      <div className="container" style={{ padding: "0 24px" }}>
        {/* Section Header */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: "56px" }}>
          <span className="section-label">Premium Brands</span>
          <h2 className="section-title-lg">Shirting &amp; Suiting</h2>
          <div className="gold-divider center" />
          <p style={{ marginTop: "16px", opacity: 0.7, maxWidth: "560px", margin: "16px auto 0", fontSize:"1rem", lineHeight:"1.7" }}>
            Curated from India&apos;s most trusted fabric houses — elevated craftsmanship in every thread.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="shirting-grid">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="reveal stagger-child shirting-card"
              onClick={() => setSelectedBrand(brand)}
            >
              {/* Image Area */}
              <div className="shirting-img-wrap">
                <img
                  src={brand.image}
                  alt={`${brand.name} fabric`}
                  className="shirting-img"
                  loading="lazy"
                />
                <div className="shirting-img-overlay" />
              </div>

              {/* Card Footer */}
              <div className="shirting-footer">
                <div className="shirting-footer-top">
                  <div>
                    <h3 className="shirting-name">{brand.name}</h3>
                    <span className="shirting-subtitle">{brand.subtitle}</span>
                  </div>
                  <div className="shirting-badge">{brand.logo}</div>
                </div>
                <div className="shirting-cta">Explore &rarr;</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedBrand && (
        <div style={styles.overlay} onClick={() => setSelectedBrand(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setSelectedBrand(null)}>×</button>
            {/* Modal preview */}
            <div style={styles.modalPreview}>
              <img src={selectedBrand.image} alt={selectedBrand.name} style={styles.modalImg} />
              <div style={styles.modalImgOverlay} />
              <div style={styles.modalBrandName}>{selectedBrand.name}</div>
            </div>
            <div style={{ padding: "32px 36px 40px" }}>
              <span style={{ display:"block", fontSize:"0.7rem", letterSpacing:"0.2em", color:"var(--color-gold)", textTransform:"uppercase", marginBottom:"8px" }}>{selectedBrand.subtitle}</span>
              <h3 style={{ fontFamily:"var(--font-heading)", fontSize:"2rem", color:"var(--color-dark)", marginBottom:"14px" }}>{selectedBrand.name}</h3>
              <p style={{ color:"var(--color-text-muted)", lineHeight:"1.7", marginBottom:"28px" }}>
                Our <strong style={{color:"var(--color-dark)"}}>{selectedBrand.name}</strong> collection will be available online soon.
                Visit our showroom in Kolhapur to experience the complete range of premium shirting and suiting fabrics in person.
              </p>
              <button className="btn-primary" onClick={() => setSelectedBrand(null)}>Back to Collection</button>
            </div>
          </div>
        </div>
      )}

      <style>{css}</style>
    </section>
  );
};

const styles = {
  overlay: {
    position:"fixed", top:0, left:0, width:"100%", height:"100%",
    backgroundColor:"rgba(0,0,0,0.65)", backdropFilter:"blur(6px)",
    display:"flex", alignItems:"center", justifyContent:"center",
    zIndex:1000, padding:"20px", animation:"fadeIn 0.3s ease-out",
  },
  modal: {
    backgroundColor:"#ffffff", borderRadius:"20px", maxWidth:"480px", width:"100%",
    position:"relative", boxShadow:"0 30px 60px rgba(0,0,0,0.25)",
    animation:"zoomIn 0.3s cubic-bezier(0.25,0.8,0.25,1)", overflow:"hidden",
  },
  closeBtn: {
    position:"absolute", top:"14px", right:"18px", background:"rgba(255,255,255,0.15)",
    backdropFilter:"blur(4px)", borderRadius:"50%", width:"34px", height:"34px",
    border:"none", fontSize:"1.4rem", color:"#fff", cursor:"pointer",
    zIndex:10, display:"flex", alignItems:"center", justifyContent:"center",
    lineHeight:"1", transition:"background 0.3s",
  },
  modalPreview: {
    width:"100%", height:"200px", position:"relative", overflow:"hidden",
  },
  modalImg: {
    width:"100%", height:"100%", objectFit:"cover",
    filter:"brightness(1.05) contrast(1.05) saturate(0.9) sepia(0.1)",
  },
  modalImgOverlay: {
    position:"absolute", inset:0,
    background:"linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 100%)",
  },
  modalBrandName: {
    position:"absolute", bottom:"16px", left:"24px",
    color:"#fff", fontSize:"1.8rem", fontFamily:"var(--font-heading)",
    fontWeight:700, textShadow:"0 2px 8px rgba(0,0,0,0.5)", zIndex:2,
  },
};

const css = `
  /* ─── Section ─── */
  .shirting-section {
    background: linear-gradient(180deg, var(--color-cream) 0%, var(--color-bg-soft) 100%);
    padding: var(--section-padding) 0;
    position: relative;
  }

  /* ─── Grid ─── */
  .shirting-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
    padding: 8px 0 4px;
  }

  /* ─── Card ─── */
  .shirting-card {
    background: #ffffff;
    border-radius: 18px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid rgba(201,169,110,0.12);
    box-shadow: 0 2px 16px rgba(62,39,35,0.07), 0 1px 4px rgba(62,39,35,0.04);
    transition: transform 0.42s cubic-bezier(0.25,0.8,0.25,1),
                box-shadow 0.42s cubic-bezier(0.25,0.8,0.25,1),
                border-color 0.42s ease;
    display: flex;
    flex-direction: column;
    will-change: transform;
  }

  .shirting-card:hover {
    transform: translateY(-10px) scale(1.01);
    box-shadow: 0 20px 50px rgba(62,39,35,0.16), 0 0 0 1.5px var(--color-gold);
    border-color: var(--color-gold);
  }

  /* ─── Image Wrapper ─── */
  .shirting-img-wrap {
    width: 100%;
    aspect-ratio: 3 / 4;
    position: relative;
    overflow: hidden;
    background: #f0ece5;
  }

  /* ─── Img with warm CSS filter ─── */
  .shirting-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Warm luxury tone: slight sepia + contrast lift + subtle saturation pull */
    filter: brightness(1.06) contrast(1.08) saturate(0.88) sepia(0.12);
    transition: transform 0.6s cubic-bezier(0.25,0.8,0.25,1),
                filter 0.6s ease;
    display: block;
  }

  .shirting-card:hover .shirting-img {
    transform: scale(1.06);
    filter: brightness(1.12) contrast(1.08) saturate(0.92) sepia(0.08);
  }

  /* ─── Vignette overlay on photo cards ─── */
  .shirting-img-overlay {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.22) 100%),
      linear-gradient(to top, rgba(44,20,10,0.45) 0%, transparent 55%);
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  .shirting-card:hover .shirting-img-overlay {
    opacity: 0.75;
  }

  /* ─── Footer ─── */
  .shirting-footer {
    padding: 20px 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-top: 1px solid rgba(201,169,110,0.1);
    background: linear-gradient(to bottom, #ffffff, #fdf9f6);
    flex-grow: 1;
  }

  .shirting-footer-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .shirting-name {
    font-family: var(--font-heading) !important;
    font-size: 1.25rem !important;
    font-weight: 700 !important;
    color: var(--color-dark) !important;
    margin: 0 0 3px !important;
    line-height: 1.2;
    transition: color 0.3s ease;
  }

  .shirting-card:hover .shirting-name {
    color: var(--color-primary) !important;
  }

  .shirting-subtitle {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: var(--color-gold);
    font-weight: 600;
    display: block;
  }

  .shirting-badge {
    flex-shrink: 0;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--color-bg-soft);
    border: 1.5px solid rgba(201,169,110,0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-heading);
    font-weight: 700;
    color: var(--color-primary);
    font-size: 0.8rem;
    transition: all 0.35s ease;
  }

  .shirting-card:hover .shirting-badge {
    background: var(--color-gold);
    border-color: var(--color-gold);
    color: #ffffff;
    transform: rotate(8deg) scale(1.1);
  }

  .shirting-cta {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-text-muted);
    opacity: 0;
    transform: translateY(6px);
    transition: all 0.35s ease;
    padding-top: 2px;
    border-top: 1px solid rgba(201,169,110,0.15);
  }

  .shirting-card:hover .shirting-cta {
    opacity: 1;
    transform: translateY(0);
    color: var(--color-primary);
  }

  /* ─── Responsive ─── */
  @media (max-width: 1200px) {
    .shirting-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }
  }
  @media (max-width: 860px) {
    .shirting-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
  }
  @media (max-width: 500px) {
    .shirting-grid { grid-template-columns: 1fr; gap: 18px; }
  }
`;

export default ShirtingSuiting;
