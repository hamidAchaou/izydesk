import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaBehance } from "react-icons/fa";
import Logo from "/assets/images/logo2.png";

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="container">
        <div className="row">
          {/* Logo and Contact Info */}
          <div className="col-lg-3">
            <div className="footer-section">
              <img src={Logo} alt="Hamid Achaou Logo" className="footer-logo" />
              <ul className="footer-contact">
                <li>Morocco, Tangier</li>
                <li>
                  <a href="mailto:hamidachaou379@gmail.com">
                    hamidachaou379@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+212643320632">+212 6 43 32 06 32</a>
                </li>
              </ul>
            </div>
          </div>
          {/* Technologies & Skills */}
          <div className="col-lg-3">
            <div className="footer-section">
              <h4>Technologies</h4>
              <ul>
                <li>Laravel</li>
                <li>React</li>
                <li>PHP & MySQL</li>
                <li>FastAPI</li>
              </ul>
            </div>
          </div>
          {/* Useful Links */}
          <div className="col-lg-3">
            <div className="footer-section">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <a href="https://github.com/hamidAchaou">GitHub</a>
                </li>
                <li>
                  <a href="https://hamidachaou.github.io/Portfolio1/">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="https://hamidachaou.github.io/Portfolio1/#contact">
                    Contact Me
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Interests */}
          <div className="col-lg-3">
            <div className="footer-section">
              <h4>Interests</h4>
              <ul>
                <li>Programming</li>
                <li>Sports</li>
                <li>Reading</li>
                <li>New Technologies</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="under-footer">
          <p>
            &copy; 2025 Hamid Achaou. All Rights Reserved.
            <br />
            Design by{" "}
            <a
              href="https://hamidachaou.github.io/Portfolio1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hamid Achaou
            </a>
          </p>
          <ul className="social-icons">
            <li>
              <a href="https://www.facebook.com/hamud.achaou">
                <FaFacebook />
              </a>
            </li>
            <li>
              <a href="#">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/hamid-achaou-093682253/">
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
    </footer>
  );
};

export default Footer;
