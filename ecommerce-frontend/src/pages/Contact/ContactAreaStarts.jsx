import React from "react";
import { FaPaperPlane } from "react-icons/fa"; // Icône moderne pour l'envoi du formulaire

const ContactAreaStarts = () => {
  return (
    <section className="contact-us">
      <div className="container">
        <div className="row">
          {/* Section Carte */} 
          <div className="col-lg-6">
            <div id="map" className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3542.773185390569!2d-5.794228524309847!3d35.76227558029974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4384b2d6935b19%3A0x2119600bdfbe9c19!2sComplexe%20Hassani%2C%20Tangier!5e0!3m2!1sen!2sma!4v1637578432042!5m2!1sen!2sma"
                width="100%"
                height="400"
                frameBorder="0"
                style={{ borderRadius: "8px" }}
                allowFullScreen
                aria-label="Emplacement Google Maps du Complexe Hassani, Tanger"
              ></iframe>
            </div>
          </div>

          {/* Section Formulaire de Contact */}
          <div className="col-lg-6">
            <header className="section-heading text-center">
              <h2>Contactez-nous</h2>
              <p>
                Nous serions ravis de vous lire. Laissez-nous un message et nous vous répondrons dès que possible.
              </p>
            </header>

            <form id="contact" action="" method="post" className="contact-form">
              <div className="form-row">
                <div className="col-lg-6">
                  <fieldset>
                    <input
                      name="name"
                      type="text"
                      id="name"
                      placeholder="Votre nom"
                      required
                      className="input-field"
                    />
                  </fieldset>
                </div>
                <div className="col-lg-6">
                  <fieldset>
                    <input
                      name="email"
                      type="email"
                      id="email"
                      placeholder="Votre adresse email"
                      required
                      className="input-field"
                    />
                  </fieldset>
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-12">
                  <fieldset>
                    <textarea
                      name="message"
                      rows="6"
                      id="message"
                      placeholder="Votre message"
                      required
                      className="input-field"
                    ></textarea>
                  </fieldset>
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-12 d-flex justify-content-center">
                  <button type="submit" className="submit-button" aria-label="Envoyer le message">
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactAreaStarts;
