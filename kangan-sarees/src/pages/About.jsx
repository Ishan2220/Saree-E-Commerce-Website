import useScrollReveal from '../hooks/useScrollReveal';

const About = () => {
  useScrollReveal();
  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="container">
          <h1>Our Story</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem" }}>
            From a 10x20 ft shop to Kolhapur's No.1 trusted saree destination.
          </p>
        </div>
      </div>
      
      <div className="container" style={styles.pageContent}>
        <section style={styles.section} className="reveal">
          <h2 style={styles.sectionTitle}>The Journey of Kangan Sarees</h2>
          <div className="gold-divider center" />
          <p style={styles.text}>
            Established in 2000, Kangan Sarees began its journey in a humble 10x20 ft rental shop in Gandhinagar. Driven by a commitment to honest pricing and premium quality, we quickly earned the trust of our customers. Over 25 incredible years, we have grown into the district’s most recognized and respected name in authentic sarees and family apparel.
          </p>
        </section>

        <div style={styles.grid}>
          <div style={styles.card} className="reveal stagger-child">
             <h3 style={styles.cardTitle}>Scale & Comfort</h3>
             <p style={styles.text}>
               In 2022, we opened our massive 25,000 sq. ft. fully air-conditioned flagship showroom to provide a world-class, comfortable shopping experience. We now operate two dedicated showrooms.
             </p>
          </div>
          <div style={styles.card} className="reveal stagger-child">
             <h3 style={styles.cardTitle}>Incredible Reach</h3>
             <p style={styles.text}>
               Our commitment to quality ensures that loyal customers travel from over 10+ districts, driving 200–250 km across Maharashtra, Karnataka, and Goa just to shop with us.
             </p>
          </div>
          <div style={styles.card} className="reveal stagger-child">
             <h3 style={styles.cardTitle}>Unmatched Variety</h3>
             <p style={styles.text}>
               Whether you need a bridal Kanjivaram, pure silk shirting, corporate uniforms, or premium bedsheets, we boast the largest variety of textiles under one roof.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContent: {
    padding: "100px 24px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  section: {
    textAlign: "center",
    marginBottom: "80px",
  },
  sectionTitle: {
    fontSize: "2.8rem",
    marginBottom: "10px",
    color: "var(--color-dark)",
  },
  text: {
    fontSize: "1.1rem",
    lineHeight: "1.9",
    color: "var(--color-text-main)",
    maxWidth: "800px",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "40px",
  },
  card: {
    padding: "40px 30px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
    border: "1px solid rgba(212, 163, 115, 0.1)",
    textAlign: "center",
    transition: "transform 0.3s ease",
  },
  cardTitle: {
    fontSize: "1.6rem",
    color: "var(--color-primary)",
    marginBottom: "15px",
    fontWeight: "600",
  }
};

export default About;
