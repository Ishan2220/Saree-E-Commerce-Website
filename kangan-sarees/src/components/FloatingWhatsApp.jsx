const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/919011193300?text=Hello%20Kangan%20Sarees!"
      target="_blank"
      rel="noopener noreferrer"
      style={styles.float}
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" style={styles.icon}>
        <path d="M16 2a14 14 0 0 0-11.8 21.6l-2.2 6.5 6.7-2.1A14 14 0 1 0 16 2zm0 25.5c-2.3 0-4.5-.6-6.4-1.7l-.5-.3-4.8 1.5 1.5-4.7-.3-.5A11.5 11.5 0 1 1 16 27.5zM22.5 20c-.3-.2-2-.9-2.3-1-.3-.1-.6-.2-.8.1-.3.3-.9 1-1.1 1.3-.2.3-.5.3-.9.1-1.8-.9-3.2-2.1-4.5-4-.2-.3 0-.5.2-.7l.5-.7c.2-.2.2-.4.4-.7s.3-.5.1-.8c-.1-.3-1-2.4-1.4-3.3-.3-.8-.7-.7-1-.7h-.8c-.3 0-.8.1-1.3.6S7 11.1 7 12.8c0 1.7 1.4 3.4 1.6 3.7 2.1 3.2 5.1 5.3 8.7 6.4.8.2 1.5.4 2 .5.9.1 1.6-.1 2.2-.5.5-.4 1.5-1.5 1.8-3 .1-.4.1-.8 0-.9-.3-.2-.7-.3-1-.5z"/>
      </svg>
    </a>
  );
};

const styles = {
  float: {
    position: "fixed",
    width: "60px",
    height: "60px",
    bottom: "40px",
    right: "40px",
    backgroundColor: "#25d366",
    color: "#fff",
    borderRadius: "50px",
    textAlign: "center",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.3s ease",
    pointerEvents: "auto",
  },
  icon: {
    width: "35px",
    height: "35px",
    fill: "currentColor",
  }
};

export default FloatingWhatsApp;
