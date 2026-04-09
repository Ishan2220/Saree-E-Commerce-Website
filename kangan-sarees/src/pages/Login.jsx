import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const USER_KEY = "kangan_user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return;
    try {
      const u = JSON.parse(raw);
      if (u?.role === "admin") {
        navigate("/admin", { replace: true });
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");

    if (!email?.trim() || !password) {
      setError("Please provide valid credentials.");
      return;
    }

    setLoading(true);
    
    let role = "customer";
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL?.toLowerCase();
    
    if (adminEmail && email.trim().toLowerCase() === adminEmail) {
      if (password !== import.meta.env.VITE_ADMIN_PASSWORD) {
        setLoading(false);
        setError("Invalid admin password.");
        return;
      }
      role = "admin";
    }

    localStorage.setItem(USER_KEY, JSON.stringify({ role }));
    window.dispatchEvent(new Event("kangan-auth"));
    navigate(role === "admin" ? "/admin" : "/", { replace: true });
  };

  return (
    <div className="fade-in" style={styles.page}>
      <div style={styles.formWrapper}>
        <div style={styles.header}>
          <img src="/logo.png" alt="Logo" style={styles.logo} />
        </div>
        
        <h2 style={styles.title}>Secure Login</h2>

        {error && <div style={styles.errorBanner}>{error}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={styles.input} 
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={styles.input} 
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.loginBtn,
              ...(loading ? { opacity: 0.75, cursor: "wait" } : {}),
            }}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: "var(--color-bg)",
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  },
  formWrapper: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    border: "1px solid rgba(212, 163, 115, 0.2)",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  logo: {
    height: "50px",
    objectFit: "contain",
  },
  title: {
    textAlign: "center",
    color: "var(--color-dark)",
    fontSize: "1.5rem",
    marginBottom: "20px",
    fontWeight: "700",
  },
  errorBanner: {
    backgroundColor: "rgba(255,0,0,0.05)",
    color: "red",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "20px",
    fontSize: "0.9rem",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "var(--color-text-main)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    padding: "12px 15px",
    border: "1px solid rgba(58, 47, 40, 0.2)",
    borderRadius: "6px",
    fontSize: "1rem",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  loginBtn: {
    marginTop: "10px",
    padding: "12px",
    backgroundColor: "var(--color-primary)",
    border: "none",
    color: "#ffffff",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "transform 0.2s ease, opacity 0.3s ease",
  },
};

export default Login;
