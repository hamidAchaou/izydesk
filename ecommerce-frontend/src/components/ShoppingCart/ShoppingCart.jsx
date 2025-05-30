import React, { useState, useEffect, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import "./ShoppingCart.css";

const STORAGE_KEY = "cartItems";

const parsePrice = (price) => {
  if (typeof price === "number") return price;
  if (typeof price === "string") return parseFloat(price.replace("$", ""));
  return 0; // fallback if price is null/undefined or other type
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateItemQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Handle Stripe Checkout
  const handleCheckout = useCallback(async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setIsLoading(true);
      const stripe = await stripePromise;
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8000/api/create-checkout-session",
        {
          items: cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: parsePrice(item.price),
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (result.error) {
        console.error("Erreur de redirection Stripe :", result.error.message);
        alert("Impossible de rediriger vers le paiement.");
      }
    } catch (error) {
      console.error("Erreur lors du paiement :", error);
      alert("Une erreur est survenue pendant le paiement.");
    } finally {
      setIsLoading(false);
    }
  }, [user, cartItems, navigate]);

  // Calculate total amount safely
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + parsePrice(item.price) * item.quantity,
    0
  );

  const formattedTotal = (totalAmount + 5).toFixed(2);

  return (
    <main className="cart">
      <div className="card">
        <div className="row">
          <div className="col-md-12 cart">
            <div className="title">
              <div className="row">
                <div className="col">
                  <h4>
                    <b>Panier</b>
                  </h4>
                </div>
                <div className="col align-self-center text-right text-muted">
                  {cartItems.length} {cartItems.length === 1 ? "article" : "articles"}
                </div>
              </div>
            </div>

            {cartItems.length === 0 ? (
              <p className="empty-cart-message">Votre panier est vide.</p>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  onChangeQuantity={updateItemQuantity}
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
              <button
                className="btn btn-checkout"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? "Chargement..." : "PAYER"}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShoppingCart;
