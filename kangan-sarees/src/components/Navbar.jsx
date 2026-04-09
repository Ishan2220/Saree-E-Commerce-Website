import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const USER_KEY = "kangan_user";

function readUserFromStorage() {
  const saved = localStorage.getItem(USER_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(readUserFromStorage);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onAuthOrStorage = () => setUser(readUserFromStorage());
    window.addEventListener("storage", onAuthOrStorage);
    window.addEventListener("kangan-auth", onAuthOrStorage);
    return () => {
      window.removeEventListener("storage", onAuthOrStorage);
      window.removeEventListener("kangan-auth", onAuthOrStorage);
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event("kangan-auth"));
    window.location.href = "/";
  };

  const navStyle = {
    ...styles.nav,
    backgroundColor: isHome && !scrolled ? "transparent" : "var(--color-dark)",
    boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.2)" : "none",
    borderBottom: scrolled ? "1px solid rgba(201, 169, 110, 0.2)" : "none",
  };

  return (
    <>
      <div style={styles.topStrip}></div>
      <nav style={navStyle}>
        <style>{injectCSS}</style>
        <div className="container" style={styles.container}>
          <div style={styles.logoContainer}>
            <Link to="/" style={styles.logoLink} className="logo-fade-in">
              <img src="/logo.png" alt="Kangan Sarees Logo" className="navbar-logo" style={styles.logoImage} />
            </Link>
          </div>
          
          <div 
            className="hamburger-icon"
            style={styles.hamburger} 
            onClick={() => setIsOpen(!isOpen)}
          >
            <div style={{ ...styles.line, ...(isOpen ? styles.lineOpen1 : {}) }}></div>
            <div style={{ ...styles.line, ...(isOpen ? styles.lineOpen2 : {}) }}></div>
            <div style={{ ...styles.line, ...(isOpen ? styles.lineOpen3 : {}) }}></div>
          </div>

          <div className={`nav-links ${isOpen ? "open" : ""}`} style={styles.links}>
            <Link to="/" style={{ ...styles.link, ...(isActive("/") ? styles.activeLink : {}) }}>Home</Link>
            <Link to="/about" style={{ ...styles.link, ...(isActive("/about") ? styles.activeLink : {}) }}>About</Link>
            <Link to="/products" style={{ ...styles.link, ...(isActive("/products") ? styles.activeLink : {}) }}>Collection</Link>
            <Link to="/contact" style={{ ...styles.link, ...(isActive("/contact") ? styles.activeLink : {}) }}>Showroom</Link>
            {user?.role === "admin" && (
              <Link to="/admin" style={{ ...styles.link, ...(isActive("/admin") ? styles.activeLink : {}) }}>Admin</Link>
            )}
            
            <div style={styles.authWrapper}>
              {user ? (
                <>
                  <span style={styles.greetingText}>Hi, {user.role === "admin" ? "Admin" : "Guest"}</span>
                  <span onClick={handleLogout} style={styles.logoutBtn} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && handleLogout()}>Logout</span>
                </>
              ) : (
                <Link to="/login" style={styles.loginBtn}>Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

const styles = {
  topStrip: {
    height: "4px",
    background: "var(--color-gold)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2001,
  },
  nav: {
    padding: "20px 0",
    position: "fixed",
    top: "4px",
    left: 0,
    right: 0,
    zIndex: 2000,
    transition: "all 0.4s ease",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
  },
  logoLink: {
    display: 'flex', 
    alignItems: 'center',
  },
  logoImage: {
    height: "65px",
    width: "auto",
    objectFit: "contain",
    filter: "brightness(1) contrast(1.1)",
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    cursor: "pointer",
    padding: "10px",
  },
  line: {
    width: "25px",
    height: "2px",
    backgroundColor: "var(--color-gold)",
    transition: "var(--transition-smooth)",
  },
  lineOpen1: { transform: "rotate(45deg) translate(5px, 5px)" },
  lineOpen2: { opacity: 0 },
  lineOpen3: { transform: "rotate(-45deg) translate(5px, -5px)" },
  links: {
    display: "flex",
    gap: "35px",
    alignItems: "center",
  },
  link: {
    fontSize: "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "2px",
    transition: "all 0.3s ease",
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
  },
  activeLink: {
    color: "var(--color-gold) !important",
    borderBottom: "1px solid var(--color-gold)",
    paddingBottom: "4px",
  },
  authWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginLeft: "10px",
    paddingLeft: "25px",
    borderLeft: "1px solid rgba(201, 169, 110, 0.3)",
  },
  greetingText: {
    fontSize: "0.75rem",
    color: "var(--color-gold)",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  logoutBtn: {
    fontSize: "0.75rem",
    color: "#ffffff",
    opacity: 0.8,
    cursor: "pointer",
    transition: "color 0.2s ease",
    textTransform: "uppercase",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    padding: "5px 12px",
    borderRadius: "4px",
  },
  loginBtn: {
    fontSize: "0.8rem",
    color: "var(--color-dark)",
    backgroundColor: "var(--color-gold)",
    padding: "8px 20px",
    borderRadius: "20px",
    textDecoration: "none",
    fontWeight: "700",
    textTransform: "uppercase",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(201, 169, 110, 0.3)",
  }
};

const injectCSS = `
@media (max-width: 768px) {
  .hamburger-icon { display: flex !important; }
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: var(--color-dark);
    padding: 30px;
    gap: 20px !important;
    display: none !important;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
  .nav-links.open { display: flex !important; pointer-events: auto; }
  .navbar-logo { height: 45px !important; }
}
.navbar-logo:hover { transform: scale(1.05); }
.nav-links a:hover { color: var(--color-gold) !important; }
`;

export default Navbar;