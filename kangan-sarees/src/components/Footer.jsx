import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        {/* Column 1: Brand */}
        <div style={styles.column}>
          <img src="/logo.png" alt="Kangan Sarees Logo" style={styles.brandImage} />
          <p style={styles.text}>
            Kolhapur's premier destination for ethnic fashion. A legacy of 25+ years, 
            blending traditional craftsmanship with contemporary elegance across 25,000 sq ft.
          </p>
          <div style={styles.socials}>
            {[
              { 
                link: "https://www.instagram.com/kangansarees/", 
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                )
              },
              {
                link: "https://www.facebook.com/kangansarees/",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                )
              }
            ].map((s, i) => (
              <a key={i} href={s.link} target="_blank" rel="noopener noreferrer" style={styles.socialIcon} className="social-hover">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div style={styles.column}>
          <h4 style={styles.title}>Collections</h4>
          <Link to="/products" style={styles.link} className="footer-link">Sarees</Link>
          <Link to="/products" style={styles.link} className="footer-link">Lehengas</Link>
          <Link to="/products" style={styles.link} className="footer-link">Designer Gowns</Link>
          <Link to="/products" style={styles.link} className="footer-link">Ready to Wear</Link>
        </div>

        {/* Column 3: Showroom Info */}
        <div style={styles.column}>
          <h4 style={styles.title}>Our Showroom</h4>
          <div style={styles.iconText}>
            <span style={styles.goldIcon}>📍</span>
            <p style={styles.text}>Plot No. 1, Gandhinagar Main Rd, Gandhinagar, Kolhapur - 416119</p>
          </div>
          <div style={styles.iconText}>
            <span style={styles.goldIcon}>📞</span>
            <p style={styles.text}>+91 8767026504 <br/> +91 9011193300</p>
          </div>
          <div style={styles.iconText}>
            <span style={styles.goldIcon}>✉️</span>
            <p style={styles.text}>kangansarees369369@gmail.com</p>
          </div>
        </div>

        {/* Column 4: Store Hours */}
        <div style={styles.column}>
          <h4 style={styles.title}>Store Hours</h4>
          <div style={styles.hoursRow}>
            <span>Mon - Sat:</span>
            <span>10:30 AM - 9:00 PM</span>
          </div>
          <div style={styles.hoursRow}>
            <span>Sunday:</span>
            <span>10:30 AM - 9:00 PM</span>
          </div>
          <div style={styles.hoursNote}>
            * Open all 365 days for your convenience.
          </div>
        </div>
      </div>
      
      <div style={styles.bottomBar}>
        <div className="container" style={styles.bottomContent}>
          <p>&copy; {new Date().getFullYear()} Kangan Sarees. All rights reserved.</p>
          <div style={styles.legalLinks}>
            <Link to="/login" style={styles.adminAccess}>Staff Portal</Link>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          position: relative;
          color: rgba(255,255,255,0.7) !important;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .footer-link:hover {
          color: var(--color-gold) !important;
          padding-left: 8px;
        }
        .social-hover {
          transition: all 0.3s ease;
        }
        .social-hover:hover {
          background: var(--color-gold) !important;
          color: var(--color-dark) !important;
          transform: translateY(-4px);
        }
      `}</style>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "var(--color-dark)",
    color: "#ffffff",
    paddingTop: "100px",
    marginTop: "80px",
    borderTop: "1px solid rgba(201, 169, 110, 0.2)",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "50px",
    paddingBottom: "80px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  brandImage: {
    height: "75px",
    width: "auto",
    objectFit: "contain",
    marginBottom: "8px",
  },
  title: {
    color: "#ffffff",
    fontSize: "1rem",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "2.5px",
    fontWeight: "700",
  },
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "0.9rem",
    lineHeight: "1.8",
    margin: 0,
  },
  iconText: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
  },
  goldIcon: {
    fontSize: "1rem",
    marginTop: "2px",
  },
  link: {
    fontSize: "0.9rem",
    width: "fit-content",
  },
  socials: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  socialIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  hoursRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.85rem",
    paddingBottom: "8px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    color: "rgba(255,255,255,0.9)",
  },
  hoursNote: {
    fontSize: "0.75rem",
    color: "var(--color-gold-light)",
    fontStyle: "italic",
    marginTop: "4px",
  },
  bottomBar: {
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: "25px 0",
    fontSize: "0.8rem",
    color: "rgba(255,255,255,0.4)",
  },
  bottomContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
  },
  legalLinks: {
    display: "flex",
    gap: "20px",
  },
  adminAccess: {
    color: "rgba(255,255,255,0.3)",
    textDecoration: "none",
    fontSize: "0.75rem",
    transition: "color 0.3s ease",
  }
};

export default Footer;
