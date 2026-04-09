import React, { useRef, useState, useEffect, useCallback } from "react";

/* ─── Inject styles ONCE globally (not per instance) ─── */
let stylesInjected = false;
function injectStyles() {
  if (stylesInjected) return;
  stylesInjected = true;
  const style = document.createElement("style");
  style.setAttribute("data-nfx", "true");
  style.textContent = NFX_CSS;
  document.head.appendChild(style);
}

const CategoryScrollRow = ({ categoryName, products, onViewAll }) => {
  const scrollRef = useRef(null);
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });
  const [arrows, setArrows] = useState({ left: false, right: true });

  // Inject global styles once on first mount
  useEffect(() => { injectStyles(); }, []);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const left = el.scrollLeft > 5;
    const right = el.scrollLeft < el.scrollWidth - el.clientWidth - 5;
    setArrows((prev) => {
      if (prev.left === left && prev.right === right) return prev;
      return { left, right };
    });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateArrows);
    };
    updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateArrows);
      cancelAnimationFrame(raf);
    };
  }, [updateArrows]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 260; // Upgraded width
    const amount = (cardWidth + 20) * 2;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    if (e.target.closest('button') || e.target.tagName.toLowerCase() === 'button') return;
    const el = scrollRef.current;
    dragState.current = { isDragging: true, startX: e.clientX, scrollLeft: el.scrollLeft };
    el.style.scrollSnapType = "none";
    el.style.scrollBehavior = "auto";
    el.style.cursor = "grabbing";
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragState.current.isDragging) return;
    e.preventDefault();
    const walk = (e.clientX - dragState.current.startX) * 1.5;
    scrollRef.current.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const onPointerUp = (e) => {
    if (!dragState.current.isDragging) return;
    dragState.current.isDragging = false;
    const el = scrollRef.current;
    el.style.scrollSnapType = "x mandatory";
    el.style.scrollBehavior = "smooth";
    el.style.cursor = "grab";
    el.releasePointerCapture(e.pointerId);
  };

  return (
    <section className="nfx-section">
      <div className="nfx-section-header">
        <div className="nfx-section-title-group">
          <span className="section-label" style={{ marginBottom: 0 }}>Discover</span>
          <h2 className="nfx-section-title">{categoryName}</h2>
          <span className="nfx-section-count">{products.length} Masterpieces</span>
        </div>
        {onViewAll && (
          <button className="nfx-view-all" onClick={() => onViewAll(categoryName)}>
            Explore All {categoryName}
          </button>
        )}
      </div>

      <div className="nfx-row-wrapper">
        {arrows.left && (
          <button className="nfx-arrow nfx-arrow--left" onClick={() => scroll("left")} aria-label="Scroll left">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        <div
          ref={scrollRef}
          className="nfx-track"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {products.map((p) => (
            <div key={p.id} className="nfx-card">
              <div className="nfx-card__img-wrap">
                <img
                  src={p.image || "/images/placeholder.png"}
                  alt={p.subcategory || p.name}
                  className="nfx-card__img"
                  loading="lazy"
                  onError={(e) => (e.target.src = "/images/placeholder.png")}
                  draggable={false}
                />
              </div>
              <div className="nfx-card__info">
                <span style={css.cardSub}>{p.subcategory}</span>
                <h4 className="nfx-card__name">{p.name || p.subcategory}</h4>
                <button
                  className="nfx-card__enquire"
                  onClick={(e) => {
                    e.stopPropagation();
                    const categoryText = p.category || p.subcategory || categoryName ? ` (${p.category || p.subcategory || categoryName})` : "";
                    const msg = `I am interested in ${p.name || p.subcategory}${categoryText}`;
                    window.open(`https://wa.me/919371212625?text=${encodeURIComponent(msg)}`, "_blank");
                  }}
                >
                  Enquire Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {arrows.right && (
          <button className="nfx-arrow nfx-arrow--right" onClick={() => scroll("right")} aria-label="Scroll right">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
};

const css = {
  cardContent: {
    width: "100%",
    padding: "0 20px",
    textAlign: "center"
  },
  cardSub: {
    display: "block",
    color: "var(--color-gold-light)",
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    marginBottom: "4px",
    fontWeight: "600"
  }
};

const NFX_CSS = `
  .nfx-section {
    margin-bottom: 72px;
  }
  .nfx-section-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 32px;
  }
  .nfx-section-title-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .nfx-section-title {
    font-family: var(--font-heading);
    font-size: clamp(2rem, 3.5vw, 2.8rem);
    color: var(--color-dark);
    font-weight: 700;
    margin: 0;
    line-height: 1;
  }
  .nfx-section-count {
    font-size: 0.8rem;
    color: var(--color-text-muted);
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .nfx-view-all {
    background: none;
    border: none;
    color: var(--color-primary);
    font-family: var(--font-body);
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: all 0.3s ease;
    padding-bottom: 4px;
    border-bottom: 2px solid rgba(128, 0, 32, 0.2);
  }
  .nfx-view-all:hover {
    color: var(--color-gold);
    border-bottom-color: var(--color-gold);
    transform: translateY(-2px);
  }
  .nfx-row-wrapper {
    position: relative;
    padding: 0 4px;
  }
  .nfx-track {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    padding: 10px 40px 30px 4px;
    scrollbar-width: none;
    cursor: grab;
    touch-action: pan-x;
    -webkit-overflow-scrolling: touch;
  }
  .nfx-track::-webkit-scrollbar { display: none; }
  .nfx-arrow {
    position: absolute;
    top: calc(50% - 20px);
    z-index: 10;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid var(--color-gold-light);
    background: #fff;
    color: var(--color-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(74, 0, 17, 0.12);
    transition: all 0.3s ease;
    backdrop-filter: blur(4px);
  }
  .nfx-arrow:hover {
    background: var(--color-dark);
    color: var(--color-gold);
    border-color: var(--color-dark);
    transform: scale(1.1);
    box-shadow: 0 6px 24px rgba(74, 0, 17, 0.2);
  }
  .nfx-arrow--left { left: -12px; }
  .nfx-arrow--right { right: -12px; }
  .nfx-card {
    flex: 0 0 260px;
    scroll-snap-align: start;
    border-radius: var(--radius-card);
    overflow: hidden;
    background: #fff;
    box-shadow: var(--shadow-card);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
  }
  .nfx-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-card-hover);
  }
  .nfx-card__img-wrap {
    position: relative;
    aspect-ratio: 3 / 4;
    overflow: hidden;
  }
  .nfx-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  .nfx-card:hover .nfx-card__img { transform: scale(1.1); }
  .nfx-card__enquire {
    background: var(--color-primary);
    color: #fff;
    border: none;
    padding: 10px 24px;
    border-radius: 24px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition: all 0.3s ease;
    width: 100%;
    margin-top: 16px;
    cursor: pointer;
  }
  .nfx-card__enquire:hover {
    background: var(--color-dark);
    transform: translateY(-2px);
  }
  .nfx-card__info {
    padding: 18px 20px;
    text-align: center;
    background: #fff;
  }
  .nfx-card__name {
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-dark);
    margin: 0;
    letter-spacing: 0.02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 768px) {
    .nfx-card { flex: 0 0 200px; }
    .nfx-arrow { display: none; }
    .nfx-track { padding: 10px 20px 20px 0; }
  }
`;

export default CategoryScrollRow;