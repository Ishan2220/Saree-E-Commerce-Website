import { useEffect, useRef } from "react";

export default function BrandStory() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

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
      { threshold: 0.2 }
    );
    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={css.section} aria-label="Brand Story">
      <div className="container brand-story-wrapper" style={css.wrapper}>
        {/* Left — image */}
        <div ref={leftRef} className="reveal-left" style={css.imageCol}>
          <div style={css.imageFrame}>
            <img
              src="/images/kanjivaram.png"
              alt="Kangan Sarees Legacy"
              style={css.image}
              loading="lazy"
              onError={(e) => (e.target.src = "/images/placeholder.png")}
            />
            {/* Gold corner accents */}
            <span style={{ ...css.corner, top: 0, left: 0, borderWidth: "2px 0 0 2px" }} />
            <span style={{ ...css.corner, top: 0, right: 0, borderWidth: "2px 2px 0 0" }} />
            <span style={{ ...css.corner, bottom: 0, left: 0, borderWidth: "0 0 2px 2px" }} />
            <span style={{ ...css.corner, bottom: 0, right: 0, borderWidth: "0 2px 2px 0" }} />
          </div>
          {/* Badge */}
          <div style={css.badge}>
            <span style={css.badgeNum}>25+</span>
            <span style={css.badgeTxt}>Years of Trust</span>
          </div>
        </div>

        {/* Right — copy */}
        <div ref={rightRef} className="reveal-right" style={css.textCol}>
          <span className="section-label">Our Heritage</span>
          <h2 className="section-title-lg" style={{ marginBottom: 0 }}>
            The Story Behind<br />
            <em>Kangan Sarees</em>
          </h2>
          <div className="gold-divider" />
          <p style={css.para}>
            Born from a deep love for Indian craftsmanship, Kangan Sarees began
            its journey in the cultural heart of Kolhapur in 2000. What started as
            a humble showroom has grown to become the district's most trusted
            destination for premium sarees, lehengas, and ethnic fashion.
          </p>
          <p style={css.para}>
            Spread across a magnificent <strong>25,000 sq ft flagship</strong>, we
            curate over 10,000 SKUs — from hand-woven Banarasi silks and pure
            Paithani sarees to bridal lehengas and contemporary gowns. Every piece
            is selected for its quality, authenticity, and timeless elegance.
          </p>
          <p style={css.para}>
            Families travel from 10+ districts across Maharashtra to experience
            our honest pricing, warm hospitality, and unmatched variety. We are
            not just a store — we are a generational tradition.
          </p>

          <div className="pill-row" style={css.pillRow}>
            {["Kolhapur's No.1", "25,000 sq ft Store", "10+ Districts Served", "Since 2000"].map((t) => (
              <span key={t} style={css.pill}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const css = {
  section: {
    padding: "100px 0",
    background: "var(--color-cream)",
    overflow: "hidden",
  },
  wrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "72px",
    alignItems: "center",
  },
  imageCol: {
    position: "relative",
  },
  imageFrame: {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    aspectRatio: "3/4",
    boxShadow: "0 24px 64px rgba(74,0,17,0.18)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  corner: {
    position: "absolute",
    width: "28px",
    height: "28px",
    borderColor: "var(--color-gold)",
    borderStyle: "solid",
    borderRadius: "2px",
    margin: "-1px",
  },
  badge: {
    position: "absolute",
    bottom: "-20px",
    right: "-20px",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, var(--color-dark), var(--color-primary))",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 28px rgba(74,0,17,0.35)",
    zIndex: 2,
  },
  badgeNum: {
    color: "var(--color-gold)",
    fontFamily: "var(--font-heading)",
    fontSize: "1.8rem",
    fontWeight: 700,
    lineHeight: 1,
  },
  badgeTxt: {
    color: "rgba(255,255,255,0.85)",
    fontFamily: "var(--font-body)",
    fontSize: "0.55rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    textAlign: "center",
    lineHeight: 1.4,
    marginTop: "2px",
    padding: "0 6px",
  },
  textCol: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  para: {
    fontFamily: "var(--font-body)",
    fontSize: "0.97rem",
    color: "var(--color-text-muted)",
    lineHeight: 1.85,
    marginBottom: "16px",
  },
  pillRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "8px",
  },
  pill: {
    fontFamily: "var(--font-body)",
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "6px 16px",
    borderRadius: "20px",
    border: "1.5px solid var(--color-gold)",
    color: "var(--color-primary)",
    background: "rgba(201,169,110,0.08)",
  },
};

// Inject responsive CSS
const styleEl = document.createElement("style");
styleEl.textContent = `
  @media (max-width: 900px) {
    .brand-story-wrapper {
      grid-template-columns: 1fr !important;
      text-align: center;
    }
    .brand-story-wrapper .section-label,
    .brand-story-wrapper .section-title-lg,
    .brand-story-wrapper p {
      text-align: center;
    }
    .brand-story-wrapper .gold-divider {
      margin-left: auto;
      margin-right: auto;
    }
    .brand-story-wrapper .pill-row {
      justify-content: center;
    }
  }
`;
if (!document.querySelector("[data-brand-story]")) {
  styleEl.setAttribute("data-brand-story", "true");
  document.head.appendChild(styleEl);
}
