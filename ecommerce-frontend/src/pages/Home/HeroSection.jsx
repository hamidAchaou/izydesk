import React from "react";
import './HeroSection.css';

// Correctly import all images
import heroMainImage from "../../assets/images/mainBanner-WomenShop.jpg";
import trendingImage1 from "../../assets/images/men-01.jpg";
import trendingImage2 from "../../assets/images/mainBanner-women.jpg";
import trendingImage3 from "../../assets/images/mainBanner-man.jpg";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-wrapper">
        <div className="hero-content">
          <div className="hero-header">
            <span className="hero-tag">New Arrival 2025</span>
            <h1>Redefine Your Style</h1>
            <p>Discover personalized fashion that tells your unique story. Innovative design meets individual expression.</p>
          </div>

          <div className="hero-actions">
            <div className="hero-buttons">
              <button className="btn primary">Shop Collection</button>
              <button className="btn secondary">Style Finder</button>
            </div>

            <div className="hero-trending">
              <div className="trending-label">Trending Now</div>
              <div className="trending-images">
                {[trendingImage1, trendingImage2, trendingImage3].map((img, index) => (
                  <div key={index} className="trending-avatar">
                    <img src={img} alt={`Trend ${index + 1}`} />
                  </div>
                ))}
                <div className="trending-count">+3</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image">
            <img src={heroMainImage} alt="Fashion Collection" />
            <div className="hero-overlay">
              <div className="overlay-content">
                <div className="overlay-details">
                  <h4>AI Style Advisor</h4>
                  <p>Personalized Recommendations</p>
                </div>
                <span className="overlay-badge">Beta</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;