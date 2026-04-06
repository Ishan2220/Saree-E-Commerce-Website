import { useState, useEffect } from 'react';

const USER_KEY = "kangan_user";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      style={{ ...styles.card, ...(isHovered ? styles.cardHover : {}) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.imageContainer}>
      <img 
  src={product.image || "/images/placeholder.png"} 
  alt={product.name} 
  onError={(e) => e.target.src = "/images/placeholder.png"}
  style={{...styles.image, ...(isHovered ? styles.imageHover : {})}} 
/>

        <div 
          style={{
            ...styles.quickViewLayer,
            ...(isHovered ? styles.quickViewVisible : {})
          }}
        >
          <button
            style={styles.quickViewBtn}
            onClick={() =>
              window.open(
                `https://wa.me/919011193300?text=I%20am%20interested%20in%20${encodeURIComponent(product.name)}`,
                '_blank'
              )
            }
          >
            Enquire on WhatsApp
          </button>
        </div>
      </div>

      <div style={styles.content}>
        <span style={styles.category}>{product.category}</span>
        <h3 style={styles.title}>{product.name}</h3>

      </div>
    </div>
  );
};

const styles = {
  card: { background: "#fff", borderRadius: "8px", overflow: "hidden" },
  cardHover: { transform: "translateY(-5px)" },
  imageContainer: { position: "relative", aspectRatio: "3/4" },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  imageHover: { transform: "scale(1.05)" },

  quickViewLayer: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0,
    pointerEvents: "none"
  },
  quickViewVisible: {
    opacity: 1,
    pointerEvents: "auto"
  },

  quickViewBtn: {
    padding: "10px 20px",
    background: "#fff",
    borderRadius: "20px"
  },

  content: { padding: "15px", textAlign: "center" },
  category: { fontSize: "0.8rem", color: "#888" },
  title: { fontSize: "1rem" }
};

export default ProductCard;