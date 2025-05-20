import React from "react";

const HeroSection = ({ title, details }) => {
  return (
    <>
      <section className="about-main-banner about-page-heading" id="top">
        <div className="container">
          <div className="content">
            <h1>{title}</h1>
            <p>{details}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
