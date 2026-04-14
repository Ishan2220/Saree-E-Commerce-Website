import useScrollReveal from '../hooks/useScrollReveal';

const Contact = () => {
  useScrollReveal();
  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem" }}>
            We would love to hear from you. Reach out or visit our store.
          </p>
        </div>
      </div>

      <div className="container contact-wrapper" style={styles.contactWrapper}>
        
        {/* Contact Info Row */}
        <div style={styles.contactDetails}>
           <div style={styles.infoCard} className="reveal stagger-child">
             <h3 style={styles.infoTitle}>Call Us</h3>
             <p style={styles.infoText}>+91 8767026504 <br /> +91 9011193300</p>
           </div>
           <div style={styles.infoCard} className="reveal stagger-child">
             <h3 style={styles.infoTitle}>Email Us</h3>
             <p style={styles.infoText}>kangansarees369369@gmail.com</p>
           </div>
           <div style={styles.infoCard} className="reveal stagger-child">
             <h3 style={styles.infoTitle}>Corporate & Bulk</h3>
             <p style={styles.infoText}>Uniforms & Dress Codes Available</p>
           </div>
           <div style={styles.infoCard} className="reveal stagger-child">
             <h3 style={styles.infoTitle}>Two Showrooms</h3>
             <p style={styles.infoText}>Including 25,000 sq ft Flagship</p>
           </div>
        </div>

        {/* Google Maps Section */}
        <div style={styles.mapSection} className="reveal">
          <h2 style={styles.sectionTitle}>Visit Our Store</h2>
          <div className="gold-divider center" />
          
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
               <strong>Kangan Sarees Flagship</strong><br/>
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
  contactWrapper: {
    padding: "80px 24px 100px",
  },
  contactDetails: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    marginBottom: "100px",
  },
  infoCard: {
    padding: "40px 30px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
    border: "1px solid rgba(212, 163, 115, 0.1)",
    textAlign: "center",
  },
  infoTitle: {
    color: "var(--color-primary)",
    fontSize: "1.4rem",
    marginBottom: "12px",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    fontWeight: "600",
  },
  infoText: {
    color: "var(--color-text-main)",
    fontSize: "1.1rem",
    fontWeight: "500",
    wordBreak: "break-word",
  },
  mapSection: {
    display: "flex",
    flexDirection: "column",
    gap: "0px",
  },
  sectionTitle: {
    fontSize: "2.8rem",
    color: "var(--color-dark)",
    textAlign: "center",
    marginBottom: "10px",
  },
  mapWrapper: {
    width: "100%",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(74, 0, 17, 0.12)",
    border: "1px solid rgba(212, 163, 115, 0.2)",
    marginTop: "40px",
  },
  addressBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "24px",
    marginTop: "40px",
  },
  addressText: {
    fontSize: "1.2rem",
    color: "var(--color-text-main)",
    lineHeight: "1.8",
  },
  directionsBtn: {
    display: "inline-block",
  }
};

export default Contact;