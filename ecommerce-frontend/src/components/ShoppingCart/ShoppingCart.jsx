// ShoppingCart.jsx
import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import "./ShoppingCart.css";

const STORAGE_KEY = "cartItems";

const ShoppingCart = () => {
  // Load initial cart items from localStorage or fallback to default items
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing cartItems from localStorage", e);
      }
    }
  });

  // Save cart items to localStorage whenever cartItems state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Remove item by id
  const handleRemove = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  // Change quantity safely: prevent quantity from going below 1
  const handleQuantityChange = (id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="cart">
      <div className="card">
        <div className="row">
          <div className="col-md-12 cart">
            <div className="title">
              <div className="row">
                <div className="col">
                  <h4>
                    <b>Shopping Cart</b>
                  </h4>
                </div>
                <div className="col align-self-center text-right text-muted">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                </div>
              </div>
            </div>

            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                  onChangeQuantity={handleQuantityChange}
                />
              ))
            )}

            <div className="cart-footer-row d-flex justify-between">
              <a href="/products" className="back-link">
                ← Back to shop
              </a>
              <div className="total-actions">
                <div className="total-price w-100 row">
                  <span className="total-label col-md-4">TOTAL</span>
                  <span className="total-amount col-md-8">
                    €{(totalPrice + 5).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <button className="btn">CHECKOUT</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShoppingCart;
