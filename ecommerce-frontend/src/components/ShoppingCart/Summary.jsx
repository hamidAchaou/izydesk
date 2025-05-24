// Summary.jsx
import React from "react";

const Summary = ({ cartItems, totalPrice }) => {
  return (
    <div className="col-md-4 summary">
      <div>
        <h5>
          <b>Résumé</b>
        </h5>
      </div>
      <hr />
      <div className="row">
        <div className="col" style={{ paddingLeft: 0 }}>
          ARTICLES {cartItems.length}
        </div>
        <div className="col text-right">€{totalPrice.toFixed(2)}</div>
      </div>

      <form>
        <p>LIVRAISON</p>
        <select>
          <option className="text-muted">Livraison standard - 5,00 €</option>
        </select>
        <p>CODE PROMO</p>
        <input id="code" placeholder="Entrez votre code" />
      </form>

      <div
        className="row"
        style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}
      >
        <div className="col">PRIX TOTAL</div>
        <div className="col text-right">€{(totalPrice + 5).toFixed(2)}</div>
      </div>

      <button className="btn">PASSER LA COMMANDE</button>
    </div>
  );
};

export default Summary;
