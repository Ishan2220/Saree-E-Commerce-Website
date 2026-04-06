import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div style={styles.column}>
          <img src="/logo.png" alt="Kangan Sarees Logo" style={styles.brandImage} />
          <p style={styles.text}>Kolhapur's No.1 recognized saree and apparel destination. 25+ years of trusted service, amazing variety, and affordable pricing.</p>
          <div style={styles.socials}>
            <a href="https://www.instagram.com/kangansarees/" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
              <span style={styles.socialIcon}>IG</span>
            </a>
          </div>
        </div>
        <div style={styles.column}>
          <h4 style={styles.title}>Explore</h4>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/about" style={styles.link}>About Us</Link>
          <Link to="/products" style={styles.link}>Collections</Link>
          <Link to="/contact" style={styles.link}>Our Showroom</Link>
        </div>
        <div style={styles.column}>
          <h4 style={styles.title}>Contact Us</h4>
          <p style={styles.text}>+91 9011193300</p>
          <p style={styles.text}>kangansarees2000@gmail.com</p>
          <p style={styles.text}>Gandhinagar, Kolhapur</p>
        </div>
      </div>
      <div style={styles.bottomBar}>
        <p>
          &copy; {new Date().getFullYear()} Kangan Sarees. All rights reserved by versiss.
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "var(--color-dark)",
    color: "var(--color-secondary)",
    paddingTop: "60px",
    marginTop: "80px",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "40px",
    paddingBottom: "60px",
    borderBottom: "1px solid rgba(250, 237, 205, 0.1)",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  brandImage: {
    height: "50px",
    width: "auto",
    objectFit: "contain",
    marginBottom: "10px",
  },
  title: {
    color: "var(--color-primary)",
    fontSize: "1.2rem",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
  text: {
    color: "var(--color-secondary)",
    opacity: 0.8,
    lineHeight: "1.8",
  },
  link: {
    color: "var(--color-secondary)",
    opacity: 0.8,
    transition: "var(--transition-smooth)",
    width: "fit-content",
  },
  socials: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
  },
  socialIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "rgba(212, 163, 115, 0.2)",
    color: "var(--color-primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "var(--transition-smooth)",
  },
  bottomBar: {
    textAlign: "center",
    padding: "20px",
    fontSize: "0.9rem",
    color: "var(--color-secondary)",
    opacity: 0.6,
  },
  adminLink: {
    color: "var(--color-secondary)",
    opacity: 0.3,
    textDecoration: "none",
    fontSize: "0.85rem",
    marginLeft: "10px",
    transition: "opacity 0.3s ease",
  }
};

export default Footer;
