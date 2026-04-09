import React from 'react';

const clients = [
  { id: 1, name: "Sanjay Ghodawat", logo: "/images/logo-ghodawat.png", logoText: "SG" },
  { id: 2, name: "PNG Jwellers", logo: "/images/logo-png.png", logoText: "PNG" },
  { id: 3, name: "DTK Jwellers", logo: "/images/logo-dtk.png", logoText: "DTK" },
  { id: 4, name: "Jaswant Sweets", logo: "/images/logo-jaswant.png", logoText: "JS" },
];

const ClientCarousel = () => {
  // Duplicate array for seamless infinite scroll
  const scrollItems = [...clients, ...clients]; // Simple double is best for padding-based math

  return (
    <section className="animate-on-load" style={styles.section}>
      <div className="container">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Our Esteemed Clients</h2>
          <div style={styles.divider}></div>
        </div>
      </div>
      
      <div className="carousel-container" style={styles.carouselContainer}>
        <div className="carousel-track" style={styles.carouselTrack}>
          {scrollItems.map((client, index) => (
            <div 
              key={`${client.id}-${index}`} 
              className="client-card-wrapper" 
              style={styles.cardWrapper}
            >
              <div 
                className="client-card" 
                style={styles.clientCard}
              >
                <div style={styles.logoBox}>
                  {client.logo ? (
                    <img src={client.logo} alt={client.name} style={styles.logoImg} loading="lazy" />
                  ) : (
                    client.logoText
                  )}
                </div>
                <h4 style={styles.clientName}>{client.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{injectHoverStyles}</style>
    </section>
  );
};

const styles = {
  section: {
    padding: "80px 0",
    backgroundColor: "rgba(255, 229, 208, 0.5)", // even lighter peach for section depth
    overflow: "hidden",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "50px",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    marginBottom: "15px",
    color: "var(--color-primary)",
    textAlign: "center",
  },
  divider: {
    width: "60px",
    height: "2px",
    backgroundColor: "var(--color-dark)",
    margin: "0 auto",
  },
  carouselTrack: {
    display: "flex",
    width: "max-content",
    animation: "scroll 30s linear infinite",
  },
  carouselContainer: {
    paddingBottom: "30px",
    width: "100%",
    overflow: "hidden",
  },
  cardWrapper: {
    width: "280px",
    flexShrink: 0, 
    padding: "0 15px", // This creates the 30px gap effect (15 on each side)
    boxSizing: "border-box",
  },
  clientCard: {
    backgroundColor: "#fff",
    border: "1px solid rgba(128, 0, 32, 0.1)",
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    width: "100%", // Fill the 25% wrapper
  },
  logoBox: {
    width: "100px",
    height: "80px",
    color: "var(--color-primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontFamily: "var(--font-heading)",
    fontSize: "1.2rem",
    overflow: "hidden",
  },
  logoImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "2px",
    mixBlendMode: "multiply", // Removes white backgrounds of logos against the white card
  },
  clientName: {
    margin: 0,
    fontSize: "1.1rem",
    color: "var(--color-text-main)",
  }
};

const injectHoverStyles = `
  .client-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(128, 0, 32, 0.08) !important;
  }
`;

export default ClientCarousel;
