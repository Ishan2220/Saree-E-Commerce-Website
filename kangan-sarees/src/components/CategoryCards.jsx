import React from "react";

/**
 * Clean + stable category cards (no loading bugs)
 */
const CategoryCards = ({ categories, selectedName, onSelect }) => {
  if (!categories?.length) return null;

  return (
    <section className="lux-category-root" aria-label="Shop by category">
      
      {/* Header */}
      <div className="lux-category-intro">
        <h2 className="lux-category-title">Shop by category</h2>
        <p className="lux-category-lede">
          Explore our collections — each curated with the Krishna Kangan touch
        </p>

        {selectedName && (
          <button
            type="button"
            className="lux-category-back"
            onClick={() => onSelect(null)}
          >
            Back to top selling
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="lux-category-grid">
        {categories.map((c, index) => {
          const isActive = selectedName === c.name;

          return (
            <button
              key={c.name}
              type="button"
              style={{ animationDelay: `${0.06 + index * 0.07}s` }}
              className={`lux-category-card ${
                isActive ? "lux-category-card--active" : ""
              }`}
              onClick={() => onSelect(isActive ? null : c.name)}
            >
              <div className="lux-category-card__frame">
                
                {/* IMAGE */}
                <div className="lux-category-card__media">
                  {c.image ? (
                    <img
                      src={c.image}
                      alt={c.name}
                      className="lux-category-card__img"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="lux-category-card__fallback" />
                  )}
                </div>

                {/* Gradient */}
                <div className="lux-category-card__gradient" />

                {/* Label */}
                <span className="lux-category-card__label">
                  {c.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* STYLES */}
      <style>{`
        .lux-category-root {
          margin-bottom: 64px;
        }

        .lux-category-intro {
          text-align: center;
          margin-bottom: 40px;
        }

        .lux-category-title {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          color: var(--color-dark);
          margin-bottom: 10px;
        }

        .lux-category-lede {
          color: var(--color-text-muted);
          margin-bottom: 15px;
        }

        .lux-category-back {
          background: none;
          border: none;
          color: var(--color-primary);
          cursor: pointer;
          text-decoration: underline;
        }

        .lux-category-grid {
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }

        .lux-category-card {
          border: none;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          background: #2a221c;
          position: relative;
          transition: 0.3s;
        }

        .lux-category-card:hover {
          transform: translateY(-8px);
        }

        .lux-category-card__frame {
          position: relative;
          aspect-ratio: 4 / 5;
        }

        .lux-category-card__media {
          position: absolute;
          inset: 0;
        }

        .lux-category-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .lux-category-card__fallback {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #d4a373, #3a2f28);
        }

        .lux-category-card__gradient {
          position: absolute;
          bottom: 0;
          height: 50%;
          width: 100%;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
        }

        .lux-category-card__label {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
      `}</style>
    </section>
  );
};

export default CategoryCards;