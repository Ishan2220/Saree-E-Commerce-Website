import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    id: 1,
    label: "New Arrivals",
    title: "Bridal Collection",
    subtitle: "Timeless silks woven with royal heritage",
    cta: "Explore Sarees",
    link: "/products?category=Sarees",
    image: "/images/banarasi.png",
    accent: "rgba(74,0,17,0.62)",
  },
  {
    id: 2,
    label: "Festive Edit",
    title: "Lehenga Chronicles",
    subtitle: "Drape yourself in celebration",
    cta: "View Lehengas",
    link: "/products?category=Lehengas",
    image: "/images/heavy-bridal-lehenga.png",
    accent: "rgba(30,10,40,0.60)",
  },
  {
    id: 3,
    label: "Trending Now",
    title: "Gown Couture",
    subtitle: "Elegant silhouettes for every occasion",
    cta: "See Gowns",
    link: "/products?category=Gowns",
    image: "/images/premium-designer-gown.png",
    accent: "rgba(50,20,0,0.58)",
  },
  {
    id: 4,
    label: "Ready Wear",
    title: "Fashion & Style",
    subtitle: "Contemporary picks, traditional soul",
    cta: "Shop Now",
    link: "/products?category=Fashion %26 Ready Wear",
    image: "/images/designer-wear.png",
    accent: "rgba(20,20,40,0.60)",
  },
];

const AUTO_PLAY_MS = 4500;

export default function FeaturedBanner() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_PLAY_MS);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (idx) => {
    setActive(idx);
    startTimer();
  };

  const slide = SLIDES[active];

  return (
    <section style={css.section} aria-label="Featured Collections">
      {/* Background image */}
      <div
        key={slide.id}
        style={{ ...css.bg, backgroundImage: `url(${slide.image})` }}
      />
      {/* Overlay */}
      <div style={{ ...css.overlay, background: `linear-gradient(120deg, ${slide.accent} 40%, rgba(0,0,0,0.18) 100%)` }} />

      {/* Content */}
      <div className="container" style={css.content}>
        <span style={css.label}>{slide.label}</span>
        <h2 style={css.title}>{slide.title}</h2>
        <p style={css.subtitle}>{slide.subtitle}</p>
        <Link to={slide.link} className="btn-primary" style={css.cta}>{slide.cta}</Link>
      </div>

      {/* Dot indicators */}
      <div style={css.dots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            style={{ ...css.dot, ...(i === active ? css.dotActive : {}) }}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes bannerFade {
          from { opacity: 0; transform: scale(1.06); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes contentSlideIn {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

const css = {
  section: {
    position: "relative",
    height: "clamp(420px, 60vh, 680px)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
  },
  bg: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center top",
    animation: "bannerFade 0.9s ease forwards",
    willChange: "transform",
  },
  overlay: {
    position: "absolute",
    inset: 0,
  },
  content: {
    position: "relative",
    zIndex: 2,
    animation: "contentSlideIn 0.65s ease forwards",
    maxWidth: "600px",
  },
  label: {
    display: "inline-block",
    fontSize: "0.7rem",
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "var(--color-gold)",
    border: "1px solid var(--color-gold)",
    padding: "4px 14px",
    borderRadius: "20px",
    marginBottom: "18px",
  },
  title: {
    fontFamily: "var(--font-heading)",
    fontSize: "clamp(2.4rem, 5vw, 4rem)",
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1.08,
    marginBottom: "14px",
    textShadow: "0 2px 16px rgba(0,0,0,0.25)",
  },
  subtitle: {
    fontFamily: "var(--font-body)",
    fontSize: "1.05rem",
    color: "rgba(255,255,255,0.85)",
    marginBottom: "32px",
    lineHeight: 1.6,
  },
  cta: {
    display: "inline-block",
  },
  dots: {
    position: "absolute",
    bottom: "28px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "10px",
    zIndex: 5,
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.4)",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    padding: 0,
  },
  dotActive: {
    background: "var(--color-gold)",
    width: "28px",
    borderRadius: "4px",
  },
};
