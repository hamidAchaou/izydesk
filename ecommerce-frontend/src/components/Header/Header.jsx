import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import logo from "/assets/images/logo.webp";
import "./header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cartItems, removeFromCart } = useCart();

  const cartRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const isActive = (path) => location.pathname === path;

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/products", label: "Products" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <Link to="/" className="logo">
                <img src={logo} alt="Company Logo" className="logo-img" />
              </Link>

              <ul className={`nav ${isMenuOpen ? "active" : ""}`}>
                {menuItems.map((item, index) => (
                  <li key={index} className="scroll-to-section">
                    <Link
                      to={item.path}
                      className={isActive(item.path) ? "active" : ""}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="cart-icon" ref={cartRef}>
                <button
                  onClick={toggleCart}
                  className="cart-btn"
                  aria-label="Toggle Cart"
                >
                  <span
                    className="cart-icon-img"
                    role="img"
                    aria-label="Shopping Cart"
                  >
                    🛒
                  </span>
                  {cartItems.length > 0 && (
                    <span className="cart-count">{cartItems.length}</span>
                  )}
                </button>
                {isCartOpen && (
                  <div className="cart-dropdown">
                    {cartItems.length === 0 ? (
                      <p className="empty-cart">No items in cart</p>
                    ) : (
                      <>
                        <div className="cart-items-container">
                          {cartItems.map((item) => (
                            <div key={item.id} className="cart-card">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="cart-image"
                              />
                              <div className="cart-details">
                                <div className="cart-title">{item.name}</div>
                                <div className="cart-meta">
                                  Qty: {item.quantity}
                                </div>
                                <div className="cart-meta">
                                  €{(item.price * item.quantity).toFixed(2)}
                                </div>
                              </div>
                              <button
                                className="cart-delete-btn"
                                onClick={() => removeFromCart(item.id)}
                                title="Remove item"
                              >
                                ❌
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="cart-footer">
                          <div className="cart-total">
                            <strong>Total:</strong> €{totalPrice.toFixed(2)}
                          </div>
                          <Link to="/cart" className="go-to-cart-btn">
                            Go to Cart
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button
                className={`menu-trigger ${isMenuOpen ? "active" : ""}`}
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                aria-expanded={isMenuOpen}
              >
                <span>Menu</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
