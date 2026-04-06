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
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const onAuthOrStorage = () => setUser(readUserFromStorage());
    window.addEventListener("storage", onAuthOrStorage);
    window.addEventListener("kangan-auth", onAuthOrStorage);
    return () => {
      window.removeEventListener("storage", onAuthOrStorage);
      window.removeEventListener("kangan-auth", onAuthOrStorage);
    };
  }, []);

  // Close mobile menu when the route changes (intentional setState in effect).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- route-driven UI reset for mobile nav
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event("kangan-auth"));
    window.location.href = "/"; // 🔥 FORCE REFRESH
  };

  return (
    <nav style={styles.nav}>
      <style>{injectCSS}</style>
      <div className="container" style={styles.container}>
        <div style={styles.logoContainer}>
          <Link to="/" style={styles.logoLink} className="logo-fade-in">
            <img src="/logo.png" alt="Kangan Sarees Logo" className="navbar-logo" style={styles.logoImage} />
          </Link>
        </div>
        
        {/* Hamburger Icon */}
        <div 
          className="hamburger-icon"
          style={styles.hamburger} 
          onClick={() => setIsOpen(!isOpen)}
        >
          <div style={{ ...styles.line, ...(isOpen ? styles.lineOpen1 : {}) }}></div>
          <div style={{ ...styles.line, ...(isOpen ? styles.lineOpen2 : {}) }}></div>
          <div style={{ ...styles.line, ...(isOpen ? styles.lineOpen3 : {}) }}></div>
        </div>

        {/* Desktop & Mobile Links */}
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
  );
};

const styles = {
  nav: {
    backgroundColor: "var(--color-dark)",
    color: "var(--color-secondary)",
    padding: "25px 0",
    position: "sticky",
    top: 0,
    zIndex: 2000,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
  },
  logoLink: {
    display: 'flex', 
    alignItems: 'center',
    padding: '5px 0',
  },
  logoImage: {
    height: "60px",
    width: "auto",
    objectFit: "contain",
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
    backgroundColor: "var(--color-primary)",
    transition: "var(--transition-smooth)",
  },
  lineOpen1: {
    transform: "rotate(45deg) translate(5px, 5px)",
  },
  lineOpen2: {
    opacity: 0,
  },
  lineOpen3: {
    transform: "rotate(-45deg) translate(5px, -5px)",
  },
  links: {
    display: "flex",
    gap: "30px",
    alignItems: "center",
  },
  link: {
    fontSize: "0.95rem",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    transition: "color 0.3s ease",
    fontWeight: "500",
  },
  activeLink: {
    color: "var(--color-primary)",
    borderBottom: "1px solid var(--color-primary)",
    paddingBottom: "4px",
  },
  authWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginLeft: "20px",
    paddingLeft: "20px",
    borderLeft: "1px solid rgba(250, 237, 205, 0.2)",
  },
  greetingText: {
    fontSize: "0.85rem",
    color: "var(--color-primary)",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  logoutBtn: {
    fontSize: "0.8rem",
    color: "var(--color-secondary)",
    opacity: 0.8,
    cursor: "pointer",
    transition: "color 0.2s ease",
    textTransform: "uppercase",
    border: "1px solid rgba(250, 237, 205, 0.3)",
    padding: "4px 10px",
    borderRadius: "4px",
  },
  loginBtn: {
    fontSize: "0.85rem",
    color: "var(--color-dark)",
    backgroundColor: "var(--color-primary)",
    padding: "6px 15px",
    borderRadius: "20px",
    textDecoration: "none",
    fontWeight: "bold",
    textTransform: "uppercase",
    transition: "transform 0.2s ease",
  }
};

const injectCSS = `
@media (max-width: 768px) {
  .hamburger-icon {
    display: flex !important;
  }
  .nav-links {
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
    gap: 15px !important;
    padding-bottom: 10px;
    display: none !important;
    pointer-events: none;
  }
  .nav-links.open {
    display: flex !important;
    pointer-events: auto;
  }
  .navbar-logo {
    height: 40px !important;
  }
}

.navbar-logo {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  filter: drop-shadow(0 0 10px rgba(250, 237, 205, 0.12)) brightness(1.05) contrast(1.05);
}
.navbar-logo:hover {
  transform: scale(1.03);
  filter: drop-shadow(0 0 15px rgba(250, 237, 205, 0.25)) brightness(1.1) contrast(1.1);
}
@keyframes logoFadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.logo-fade-in {
  animation: logoFadeIn 0.8s ease-out forwards;
}
`;

export default Navbar;