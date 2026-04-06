const Contact = () => {
  return (
    <div className="fade-in">
      <div style={styles.header}>
        <div className="container" style={styles.headerContent}>
          <h1 style={styles.title}>Contact Us</h1>
          <p style={styles.subtitle}>We would love to hear from you. Reach out or visit our store.</p>
        </div>
      </div>

      <div className="container contact-wrapper" style={styles.contactWrapper}>
        
        {/* Contact Info Row */}
        <div style={styles.contactDetails}>
           <div style={styles.infoCard}>
             <h3 style={styles.infoTitle}>Call Us</h3>
             <p style={styles.infoText}>+91 9011193300</p>
           </div>
           <div style={styles.infoCard}>
             <h3 style={styles.infoTitle}>Email Us</h3>
             <p style={styles.infoText}>kangansarees2000@gmail.com</p>
           </div>
           <div style={styles.infoCard}>
             <h3 style={styles.infoTitle}>Corporate & Bulk</h3>
             <p style={styles.infoText}>Uniforms & Dress Codes Available</p>
           </div>
           <div style={styles.infoCard}>
             <h3 style={styles.infoTitle}>Two Showrooms</h3>
             <p style={styles.infoText}>Including 20,000 sq ft Flagship</p>
           </div>
        </div>

        {/* Google Maps Section */}
        <div style={styles.mapSection}>
          <h2 style={styles.sectionTitle}>Visit Our Store</h2>
          
          <div className="map-wrapper" style={styles.mapWrapper}>
            <iframe 
              src="https://maps.google.com/maps?q=Krushna+Kangan,+Gandhinagar,+Kolhapur&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Kangan Sarees Location"
            ></iframe>
          </div>

          <div style={styles.addressBlock}>
            <p style={styles.addressText}>
               <strong>Krishna Kangan Sarees Flagship</strong><br/>
               Gandhinagar, Kolhapur,<br/>
               Maharashtra, India
            </p>
            <a 
               href="https://www.google.com/maps/dir/?api=1&destination=Krushna+Kangan+Sarees,+Gandhinagar,+Kolhapur" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="btn-primary"
               style={styles.directionsBtn}
            >
               Get Directions
            </a>
          </div>
        </div>

      </div>

      <style>{`
        .map-wrapper {
          min-height: 350px;
          height: 50vh;
          max-height: 500px;
        }
        @media (max-width: 850px) {
          .map-wrapper {
             min-height: 250px;
             height: 300px;
          }
          .contact-wrapper {
             display: flex !important;
             flex-direction: column-reverse !important;
          }
        }
      `}</style>
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
    maxWidth: "1000px",
    margin: "0 auto",
  },
  contactDetails: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    marginBottom: "80px",
  },
  infoCard: {
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
    border: "1px solid rgba(212, 163, 115, 0.15)",
    textAlign: "center",
  },
  infoTitle: {
    color: "var(--color-primary)",
    fontSize: "1.3rem",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  infoText: {
    color: "var(--color-text-main)",
    fontSize: "1.05rem",
    fontWeight: "500",
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
  mapSection: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  sectionTitle: {
    fontSize: "2.2rem",
    color: "var(--color-dark)",
    textAlign: "center",
  },
  mapWrapper: {
    width: "100%",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 40px rgba(58, 47, 40, 0.15)",
    border: "2px solid rgba(212, 163, 115, 0.3)",
    transition: "transform 0.4s ease, box-shadow 0.4s ease",
  },
  addressBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "20px",
    marginTop: "10px",
  },
  addressText: {
    fontSize: "1.2rem",
    color: "var(--color-text-main)",
    lineHeight: "1.7",
  },
  directionsBtn: {
    display: "inline-block",
  }
};

export default Contact;