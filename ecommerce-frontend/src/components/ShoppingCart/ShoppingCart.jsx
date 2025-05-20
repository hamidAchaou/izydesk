// ShoppingCart.jsx
import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import Summary from "./Summary";
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
    // Fallback default items
    return [
      {
        id: 1,
        name: "Cotton T-shirt",
        category: "Shirt",
        img: "https://i.imgur.com/1GrakTl.jpg",
        price: 44.0,
        quantity: 1,
      },
      {
        id: 2,
        name: "Cotton T-shirt",
        category: "Shirt",
        img: "https://i.imgur.com/ba3tvGm.jpg",
        price: 44.0,
        quantity: 1,
      },
      {
        id: 3,
        name: "Cotton T-shirt",
        category: "Shirt",
        img: "https://i.imgur.com/pHQ3xT3.jpg",
        price: 44.0,
        quantity: 1,
      },
    ];
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
          <div className="col-md-8 cart">
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

            <div className="back-to-shop">
              <a href="/products">
                ←<span className="text-muted">Back to shop</span>
              </a>
            </div>
          </div>

          {/* Summary Section */}
          <Summary cartItems={cartItems} totalPrice={totalPrice} />
        </div>
      </div>
    </main>
  );
};

export default ShoppingCart;
