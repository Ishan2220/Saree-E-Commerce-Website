import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="premium-product-card reveal"
      style={{ ...styles.card, ...(isHovered ? styles.cardHover : {}) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.imageContainer}>
        <img 
          src={product.image || "/images/placeholder.png"} 
          alt={product.name} 
          loading="lazy"
          onError={(e) => e.target.src = "/images/placeholder.png"}
          style={{...styles.image, ...(isHovered ? styles.imageHover : {})}} 
        />
        
        {/* Luxury Badge */}
        {product.isTopSelling && (
          <div style={styles.badge}>Bestseller</div>
        )}

      </div>

      <div style={styles.content}>
        <span style={styles.category}>{product.subcategory || product.category}</span>
        <h3 style={styles.title}>{product.name}</h3>
        
        <button
          style={styles.enquireBtn}
          onClick={(e) => {
            e.stopPropagation();
            const categoryText = product.category || product.subcategory ? ` (${product.category || product.subcategory})` : "";
            const msg = `I am interested in ${product.name}${categoryText}`;
            window.open(`https://wa.me/919371212625?text=${encodeURIComponent(msg)}`, "_blank");
          }}
        >
          Enquire Now
        </button>
      </div>

    </div>
  );
};

const styles = {
  card: { 
    background: "#fff", 
    borderRadius: "var(--radius-card)", 
    overflow: "hidden",
    boxShadow: "var(--shadow-card)",
    transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
    position: "relative",
    cursor: "pointer",
  },
  cardHover: { 
    transform: "translateY(-10px)",
    boxShadow: "var(--shadow-card-hover)",
  },
  imageContainer: { 
    position: "relative", 
    aspectRatio: "3/4",
    overflow: "hidden",
  },
  image: { 
    width: "100%", 
    height: "100%", 
    objectFit: "cover",
    transition: "transform 0.6s ease",
  },
  imageHover: { 
    transform: "scale(1.1)",
  },
  badge: {
    position: "absolute",
    top: "15px",
    left: "15px",
    background: "var(--color-gold)",
    color: "var(--color-dark)",
    padding: "4px 12px",
    fontSize: "0.65rem",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    borderRadius: "20px",
    zIndex: 2,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  enquireBtn: {
    padding: "10px 24px",
    background: "var(--color-primary)",
    color: "#fff",
    border: "none",
    borderRadius: "24px",
    fontSize: "0.85rem",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    width: "100%",
    marginTop: "16px",
    cursor: "pointer",
  },
  content: { 
    padding: "20px 15px", 
    textAlign: "center",
    background: "#fff",
  },
  category: { 
    fontSize: "0.7rem", 
    color: "var(--color-gold)",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    fontWeight: "600",
    display: "block",
    marginBottom: "8px",
  },
  title: { 
    fontSize: "1.05rem",
    color: "var(--color-dark)",
    fontFamily: "var(--font-heading)",
    fontWeight: "600",
    lineHeight: "1.3",
    margin: "0 0 12px 0",
  },
  divider: {
    width: "30px",
    height: "1.5px",
    background: "var(--color-gold-light)",
    margin: "0 auto",
  }
};

export default ProductCard;