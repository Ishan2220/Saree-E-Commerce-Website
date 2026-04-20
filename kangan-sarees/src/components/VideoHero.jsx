import { Link } from "react-router-dom";

const VideoHero = () => {
  return (
    <section className="video-hero-section fade-in">
      {/* Video Background */}
      <div className="video-wrapper">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video pulse-zoom"
          poster="/images/kk-hero.png" /* Fallback image */
        >
          <source src="/videos/hero-saree-video.mp4" type="video/mp4" />
          {/* Add more sources if needed */}
        </video>
        {/* Dark Overlay for readability */}
        <div className="video-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="container hero-content-wrapper fade-in" style={{ animationDelay: '0.3s' }}>
        <p className="video-hero-subtitle">
          Elegance in Every Thread
        </p>
        <div className="video-action-group">
          <Link to="/products" className="btn-primary hover-glow">Explore Collection</Link>
        </div>
      </div>

      {/* Scroll indicator inherited from existing styles */}
      <div className="video-scroll-indicator">
        <div className="scroll-chevron-custom"></div>
      </div>

      <style>{injectStyles}</style>
    </section>
  );
};

const injectStyles = `
  .video-hero-section {
    position: relative;
    width: 100vw;
    margin-left: calc(-50vw + 50%); /* Full width bleed if needed, but standard is sufficient */
    height: 85vh; /* 70-90vh Desktop */
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-top: -69px; /* Offset for fixed navbar */
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .video-hero-section {
      height: 60vh; /* 50-60vh Mobile */
    }
    .video-hero-title {
      font-size: clamp(3rem, 10vw, 4.5rem) !important;
    }
  }

  .video-wrapper {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
    background-color: var(--color-dark); /* fallback color */
  }

  .hero-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transform: scale(1.05); /* Slight zoom base to allow parallax/wobble without edges showing */
  }

  .pulse-zoom {
    animation: slowZoomOut 20s ease-in-out infinite alternate;
  }

  @keyframes slowZoomOut {
    0%   { transform: scale(1.05); }
    100% { transform: scale(1.15); }
  }

  .video-overlay {
    position: absolute;
    inset: 0;
    /* Subtle dark overlay 30-50% for text readability */
    background: linear-gradient(
      to bottom, 
      rgba(38, 22, 17, 0.45) 0%, 
      rgba(38, 22, 17, 0.3) 50%, 
      rgba(38, 22, 17, 0.5) 100%
    );
    z-index: 1;
  }

  .hero-content-wrapper {
    position: relative;
    z-index: 2;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 60px; /* Offset for navbar inside content */
  }

  .video-hero-title {
    color: var(--color-gold-light);
    font-size: clamp(4rem, 8vw, 6.5rem);
    line-height: 1.1;
    margin-bottom: 20px;
    font-family: var(--font-heading);
    font-weight: 700;
    text-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
  }

  .text-glow {
    animation: goldGlow 3s infinite alternate;
  }

  @keyframes goldGlow {
    from { text-shadow: 0 0 10px rgba(232, 213, 176, 0.2), 0 10px 30px rgba(0,0,0,0.6); }
    to   { text-shadow: 0 0 20px rgba(232, 213, 176, 0.4), 0 10px 30px rgba(0,0,0,0.6); }
  }

  .video-hero-subtitle {
    color: #fff;
    font-size: clamp(1.2rem, 2.5vw, 1.8rem);
    letter-spacing: 0.05em;
    margin-bottom: 40px;
    font-family: var(--font-body);
    font-weight: 300;
    text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.6);
  }

  .video-action-group {
    display: flex;
    gap: 20px;
    justify-content: center;
    z-index: 2;
  }

  .hover-glow {
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .hover-glow:hover {
    box-shadow: 0 0 20px rgba(201, 169, 110, 0.6); /* Gold glow */
    transform: translateY(-2px);
  }

  .video-scroll-indicator {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    opacity: 0.8;
  }

  .scroll-chevron-custom {
    width: 24px;
    height: 24px;
    border-bottom: 2px solid var(--color-gold-light);
    border-right: 2px solid var(--color-gold-light);
    transform: rotate(45deg);
    animation: scrollChevronCustom 2s infinite;
  }

  @keyframes scrollChevronCustom {
    0%, 100% { transform: rotate(45deg) translate(-5px, -5px); opacity: 0.3; }
    50%      { transform: rotate(45deg) translate(5px, 5px); opacity: 1; }
  }
`;

export default VideoHero;
