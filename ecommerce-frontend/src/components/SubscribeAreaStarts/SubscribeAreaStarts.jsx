import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const SubscribeAreaStarts = () => {
  return (
    <div className="subscribe">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="section-heading">
              <h2>Abonnez-vous à notre newsletter et bénéficiez de 30% de réduction</h2>
              <span>
                L’attention aux moindres détails est ce qui rend AtlasShoop différent des autres thèmes.
              </span>
            </div>
            <form id="subscribe" action="" method="get">
              <div className="row">
                <div className="col-lg-5">
                  <fieldset>
                    <input
                      name="name"
                      type="text"
                      id="name"
                      placeholder="Votre nom"
                      required
                    />
                  </fieldset>
                </div>
                <div className="col-lg-5">
                  <fieldset>
                    <input
                      name="email"
                      type="email"
                      id="email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      placeholder="Votre adresse email"
                      required
                    />
                  </fieldset>
                </div>
                <div className="col-lg-2">
                  <fieldset>
                    <button
                      type="submit"
                      id="form-submit"
                      className="main-dark-button"
                      aria-label="S’abonner à la newsletter"
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4">
            <div className="row">
              <div className="col-6">
                <ul>
                  <li>
                    Adresse du magasin :
                    <br />
                    <span>Sunny Isles Beach, FL 33160, États-Unis</span>
                  </li>
                  <li>
                    Téléphone :
                    <br />
                    <span>010-020-0340</span>
                  </li>
                  <li>
                    Bureau :
                    <br />
                    <span>North Miami Beach</span>
                  </li>
                </ul>
              </div>
              <div className="col-6">
                <ul>
                  <li>
                    Horaires :
                    <br />
                    <span>07:30 - 21:30 tous les jours</span>
                  </li>
                  <li>
                    Email :
                    <br />
                    <span>info@company.com</span>
                  </li>
                  <li>
                    Réseaux sociaux :
                    <br />
                    <span>
                      <a href="#">Facebook</a>, <a href="#">Instagram</a>,{" "}
                      <a href="#">Behance</a>, <a href="#">LinkedIn</a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeAreaStarts;
