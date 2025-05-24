import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaBehance,
  FaQuoteLeft,
} from "react-icons/fa";

const AboutSection = () => (
  <div className="about-us">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="left-image">
            <img src="assets/images/about-left-image.jpg" alt="À propos de nous" />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="right-content">
            <h4>À propos de nous &amp; nos compétences</h4>
            <span>
              Nous sommes passionnés par la création de solutions innovantes et créatives qui répondent aux besoins de nos clients.
            </span>
            <div className="quote">
              <FaQuoteLeft />
              <p>
                Notre objectif est de fournir une qualité exceptionnelle et un service fiable à chacun de nos projets.
              </p>
            </div>
            <p>
              Avec une équipe expérimentée et dédiée, nous mettons tout en œuvre pour garantir la satisfaction client. Notre savoir-faire couvre plusieurs domaines allant du design à la technologie, avec un fort accent sur la performance et l’esthétique.
            </p>
            <ul>
              <li>
                <a href="#">
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaBehance />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutSection;
