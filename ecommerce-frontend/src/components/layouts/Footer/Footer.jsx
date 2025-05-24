import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaBehance } from "react-icons/fa";
import Logo from "/assets/images/logo2.png";

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="container">
        <div className="row">
          {/* Logo et Informations de contact */}
          <div className="col-lg-3">
            <div className="footer-section">
              <img src={Logo} alt="Logo de la boutique" className="footer-logo" />
              <ul className="footer-contact">
                <li>Maroc, Tanger</li>
                <li>
                  <a href="mailto:support@votreboutique.com">support@votreboutique.com</a>
                </li>
                <li>
                  <a href="tel:+212643320632">+212 6 43 32 06 32</a>
                </li>
              </ul>
            </div>
          </div>
          {/* Catégories */}
          <div className="col-lg-3">
            <div className="footer-section">
              <h4>Catégories</h4>
              <ul>
                <li><a href="/products?category=electronics">Électronique</a></li>
                <li><a href="/products?category=clothing">Vêtements</a></li>
                <li><a href="/products?category=accessories">Accessoires</a></li>
                <li><a href="/products?category=home">Maison</a></li>
              </ul>
            </div>
          </div>
          {/* Liens utiles */}
          <div className="col-lg-3">
            <div className="footer-section">
              <h4>Liens utiles</h4>
              <ul>
                <li><a href="/">Accueil</a></li>
                <li><a href="/products">Produits</a></li>
                <li><a href="/cart">Panier</a></li>
                <li><a href="/contact">Contactez-nous</a></li>
              </ul>
            </div>
          </div>
          {/* À propos & réseaux sociaux */}
          <div className="col-lg-3">
            <div className="footer-section">
              <h4>Suivez-nous</h4>
              <ul className="social-icons">
                <li>
                  <a href="https://www.facebook.com/hamud.achaou" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/hamid-achaou-093682253/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                </li>
                <li>
                  <a href="https://www.behance.net/" target="_blank" rel="noopener noreferrer">
                    <FaBehance />
                  </a>
                </li>
              </ul>
              <p className="footer-about">
                Votre boutique en ligne de confiance, offrant des produits de qualité à des prix compétitifs.
              </p>
            </div>
          </div>
        </div>
        <div className="under-footer">
          <p>
            &copy; 2025 Votre Boutique. Tous droits réservés.
            <br />
            Design par{" "}
            <a
              href="https://hamidachaou.github.io/Portfolio1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hamid Achaou
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
