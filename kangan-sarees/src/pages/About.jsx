const About = () => {
  return (
    <div className="fade-in">
      <div style={styles.header}>
        <div className="container" style={styles.headerContent}>
          <h1 style={styles.title}>Our Story</h1>
          <p style={styles.subtitle}>From a 10x20 ft shop to Kolhapur's No.1 trusted saree destination.</p>
        </div>
      </div>
      
      <div className="container" style={styles.pageContent}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>The Journey of Krishna Kangan Sarees</h2>
          <p style={styles.text}>
            Established in 2000, Krishna Kangan Sarees began its journey in a humble 10x20 ft rental shop in Gandhinagar. Driven by a commitment to honest pricing and premium quality, we quickly earned the trust of our customers. Over 25 incredible years, we have grown into the district’s most recognized and respected name in authentic sarees and family apparel.
          </p>
        </section>

        <div style={styles.grid}>
          <div style={styles.card}>
             <h3 style={styles.cardTitle}>Scale & Comfort</h3>
             <p style={styles.text}>
               In 2022, we opened our massive 20,000 sq. ft. fully air-conditioned flagship showroom to provide a world-class, comfortable shopping experience. We now operate two dedicated showrooms in Gandhinagar.
             </p>
          </div>
          <div style={styles.card}>
             <h3 style={styles.cardTitle}>Incredible Reach</h3>
             <p style={styles.text}>
               Our commitment to quality ensures that loyal customers travel from over 10+ districts, driving 200–250 km across Maharashtra, Karnataka, and Goa just to shop with us.
             </p>
          </div>
          <div style={styles.card}>
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
  header: {
    backgroundColor: "var(--color-dark)",
    color: "var(--color-secondary)",
    padding: "80px 0",
    textAlign: "center",
  },
  headerContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    color: "var(--color-primary)",
    fontSize: "3rem",
    marginBottom: "15px",
  },
  subtitle: {
    fontSize: "1.1rem",
    opacity: 0.8,
  },
  pageContent: {
    padding: "80px 20px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  section: {
    textAlign: "center",
    marginBottom: "60px",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    marginBottom: "25px",
    color: "var(--color-dark)",
  },
  text: {
    fontSize: "1.1rem",
    lineHeight: "1.8",
    color: "var(--color-text-main)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
  },
  card: {
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    border: "1px solid rgba(212, 163, 115, 0.2)",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "1.5rem",
    color: "var(--color-primary)",
    marginBottom: "15px",
  }
};

export default About;
