const FloatingWhatsApp = () => {
  const openChat = (e) => {
    e.preventDefault();
    if (window.$crisp) {
      window.$crisp.push(["do", "chat:open"]);
    }
  };

  return (
    <div style={styles.container}>
      <a
        href="https://wa.me/919371212625?text=Hello%20Kangan%20Sarees!"
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...styles.button, ...styles.whatsapp }}
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <svg viewBox="0 0 32 32" style={styles.icon}>
          <path d="M16 2a14 14 0 0 0-11.8 21.6l-2.2 6.5 6.7-2.1A14 14 0 1 0 16 2zm0 25.5c-2.3 0-4.5-.6-6.4-1.7l-.5-.3-4.8 1.5 1.5-4.7-.3-.5A11.5 11.5 0 1 1 16 27.5zM22.5 20c-.3-.2-2-.9-2.3-1-.3-.1-.6-.2-.8.1-.3.3-.9 1-1.1 1.3-.2.3-.5.3-.9.1-1.8-.9-3.2-2.1-4.5-4-.2-.3 0-.5.2-.7l.5-.7c.2-.2.2-.4.4-.7s.3-.5.1-.8c-.1-.3-1-2.4-1.4-3.3-.3-.8-.7-.7-1-.7h-.8c-.3 0-.8.1-1.3.6S7 11.1 7 12.8c0 1.7 1.4 3.4 1.6 3.7 2.1 3.2 5.1 5.3 8.7 6.4.8.2 1.5.4 2 .5.9.1 1.6-.1 2.2-.5.5-.4 1.5-1.5 1.8-3 .1-.4.1-.8 0-.9-.3-.2-.7-.3-1-.5z"/>
        </svg>
      </a>

      <a
        href="#"
        onClick={openChat}
        style={{ ...styles.button, ...styles.chat }}
        aria-label="Support Chat"
        title="Support Chat"
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <svg viewBox="0 0 24 24" style={styles.icon}>
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/>
        </svg>
      </a>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    alignItems: "center",
    zIndex: 2147483647,
  },
  button: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.3s ease",
    pointerEvents: "auto",
    cursor: "pointer",
    textDecoration: "none"
  },
  whatsapp: {
    backgroundColor: "#25d366",
  },
  chat: {
    backgroundColor: "#1b8ef8",
  },
  icon: {
    width: "32px",
    height: "32px",
    fill: "currentColor",
  }
};

export default FloatingWhatsApp;
