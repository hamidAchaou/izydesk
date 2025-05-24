import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import "./ShoppingCart.css";
import { loadStripe } from "@stripe/stripe-js";
import apiClient from "../../api/index";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "cartItems";
const stripePromise = loadStripe("pk_test_51RRCokFbpJE8hmHI0iU8O7PyUoGsMNyJvhBK3JkKAqljrHQ8v4tOeUtZOL68ZV0wUTXu87RdWZCEpaijH0TnTiJ100UPZa22nS");

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY);
      return savedItems ? JSON.parse(savedItems) : [];
    } catch (error) {
      console.error("Échec de l'analyse des articles du panier depuis localStorage", error);
      return [];
    }
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const removeCartItem = (itemId) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleCheckout = async () => {
    if (!user) {
      return navigate("/login");
    }

    try {
      const stripe = await stripePromise;
      const response = await apiClient.post("/create-checkout-session", {
        items: cartItems,
      });

      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (error) {
        console.error("Erreur de redirection Stripe :", error.message);
        alert("Impossible de rediriger vers le paiement.");
      }
    } catch (error) {
      console.error("Erreur lors du paiement :", error);
      alert("Une erreur est survenue pendant le paiement.");
    }
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const formattedTotal = (totalAmount + 5).toFixed(2); // +5 pour les frais de livraison

  return (
    <main className="cart">
      <div className="card">
        <div className="row">
          <div className="col-md-12 cart">
            <div className="title">
              <div className="row">
                <div className="col">
                  <h4><b>Panier</b></h4>
                </div>
                <div className="col align-self-center text-right text-muted">
                  {cartItems.length} {cartItems.length === 1 ? "article" : "articles"}
                </div>
              </div>
            </div>

            {cartItems.length === 0 ? (
              <p>Votre panier est vide.</p>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeCartItem}
                  onChangeQuantity={updateQuantity}
                />
              ))
            )}

            <div className="cart-footer-row d-flex justify-between">
              <a href="/products" className="back-link">
                ← Retour à la boutique
              </a>
              <div className="total-actions">
                <div className="total-price">
                  <span className="total-label">TOTAL :</span>
                  <span className="total-amount">€{formattedTotal}</span>
                </div>
              </div>
            </div>

            {cartItems.length > 0 && (
              <button className="btn" onClick={handleCheckout}>
                PAYER
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShoppingCart;
