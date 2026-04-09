import { useEffect, useRef } from "react";

const REVIEWS = [
  {
    id: 1,
    name: "Priya Kulkarni",
    location: "Kolhapur",
    rating: 5,
    text: "Kangan Sarees has the most breathtaking collection I've ever seen. I found my bridal Paithani here and the quality is simply unmatched. The staff were incredibly helpful and patient.",
    initials: "PK",
  },
  {
    id: 2,
    name: "Meera Desai",
    location: "Sangli",
    rating: 5,
    text: "We travel from Sangli specifically for Kangan Sarees. The variety is mind-blowing — from cotton dailywear to the most exquisite Banarasi silks. Honest pricing and genuine quality.",
    initials: "MD",
  },
  {
    id: 3,
    name: "Sunita Patil",
    location: "Pune",
    rating: 5,
    text: "Found the most stunning lehenga for my daughter's wedding here. The showroom is massive and beautifully organized. We spent 3 happy hours and left with the perfect pieces!",
    initials: "SP",
  },
];

export default function Testimonials() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section style={css.section} aria-label="Customer Testimonials">
      <div className="container">
        {/* Header */}
        <div style={css.header}>
          <span className="section-label">What Our Customers Say</span>
          <h2 className="section-title-lg">Loved by Thousands</h2>
          <div className="gold-divider center" />
        </div>

        {/* Cards */}
        <div style={css.grid}>
          {REVIEWS.map((r, i) => (
            <div
              key={r.id}
              ref={(el) => (refs.current[i] = el)}
              className="reveal stagger-child"
              style={css.card}
            >
              {/* Quote mark */}
              <span style={css.quote}>"</span>
              {/* Stars */}
              <div className="stars">{"★".repeat(r.rating)}</div>
              {/* Text */}
              <p style={css.text}>{r.text}</p>
              {/* Author */}
              <div style={css.author}>
                <div style={css.avatar}>{r.initials}</div>
                <div>
                  <div style={css.name}>{r.name}</div>
                  <div style={css.loc}>{r.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const css = {
  section: {
    padding: "100px 0",
    background: "linear-gradient(180deg, var(--color-background) 0%, var(--color-bg-soft) 100%)",
  },
  header: {
    textAlign: "center",
    marginBottom: "56px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "28px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "36px 32px 28px",
    boxShadow: "0 4px 24px rgba(74,0,17,0.07)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    border: "1px solid rgba(201,169,110,0.15)",
    position: "relative",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  quote: {
    fontFamily: "var(--font-heading)",
    fontSize: "4.5rem",
    color: "var(--color-gold-light)",
    lineHeight: 0.8,
    display: "block",
    position: "absolute",
    top: "18px",
    right: "24px",
    userSelect: "none",
  },
  text: {
    fontFamily: "var(--font-body)",
    fontSize: "0.92rem",
    color: "var(--color-text-muted)",
    lineHeight: 1.8,
    fontStyle: "italic",
    flex: 1,
  },
  author: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    borderTop: "1px solid rgba(201,169,110,0.2)",
    paddingTop: "16px",
    marginTop: "4px",
  },
  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, var(--color-dark), var(--color-primary))",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-heading)",
    fontSize: "1rem",
    fontWeight: 600,
    flexShrink: 0,
  },
  name: {
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    fontSize: "0.9rem",
    color: "var(--color-dark)",
  },
  loc: {
    fontFamily: "var(--font-body)",
    fontSize: "0.78rem",
    color: "var(--color-text-muted)",
    letterSpacing: "0.05em",
  },
};
