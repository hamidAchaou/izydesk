// src/components/Layout/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import logo from "/assets/images/logo.webp";
import "./header.css";
import { FaUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const cartRef = useRef(null);
  const profileRef = useRef(null);
  const menuRef = useRef(null);

  const { user, logoutUser } = useAuth();
  const { cartItems, removeFromCart } = useCart();

  const location = useLocation();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const navItems = [
    { path: "/", label: "Accueil" },
    { path: "/about", label: "À propos" },
    { path: "/products", label: "Produits" },
    { path: "/contact", label: "Contact" },
  ];

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setCartOpen(false);
    }
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setProfileOpen(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setCartOpen(false);
    setProfileOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  const isActiveLink = (path) => location.pathname === path;

  return (
    <header className="header-area header-sticky">
      <div className="container">
        <nav className="main-nav">
          <Link to="/" className="logo" aria-label="Aller à la page d'accueil">
            <img src={logo} alt="Logo de la société" className="logo-img" />
          </Link>

          <ul className={`nav ${menuOpen ? "active" : ""}`} ref={menuRef}>
            {navItems.map(({ path, label }) => (
              <li key={path} className="scroll-to-section">
                <Link
                  to={path}
                  className={isActiveLink(path) ? "active" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            {user?.roles?.includes("ROLE_ADMIN") && (
              <li>
                <Link to="/admin/dashboard/" onClick={() => setMenuOpen(false)}>
                  Tableau de bord
                </Link>
              </li>
            )}
          </ul>

          <div className="header-actions">
            <div className="cart-icon" ref={cartRef}>
              <button
                onClick={() => setCartOpen((prev) => !prev)}
                className="cart-btn"
                aria-label="Afficher le panier"
              >
                <AiOutlineShoppingCart />
                {cartItems.length > 0 && (
                  <span className="cart-count">{cartItems.length}</span>
                )}
              </button>

              {cartOpen && (
                <div className="cart-dropdown">
                  {cartItems.length === 0 ? (
                    <p className="empty-cart">Aucun article dans le panier</p>
                  ) : (
                    <>
                      <div className="cart-items-container">
                        {cartItems.map((item) => (
                          <div key={item.id} className="cart-card">
                            <img src={item.image} alt={item.name} />
                            <div>
                              <div>{item.name}</div>
                              <div>Qté: {item.quantity}</div>
                              <div>
                                €{(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                            <button
                              aria-label={`Supprimer ${item.name} du panier`}
                              onClick={() => removeFromCart(item.id)}
                            >
                              ❌
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="cart-footer">
                        <strong>Total:</strong> €{totalPrice.toFixed(2)}
                        <Link to="/cart" onClick={() => setCartOpen(false)}>
                          Aller au panier
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {!user ? (
              <div className="auth-buttons">
                <Link to="/login" className="auth-btn">
                  Se connecter
                </Link>
                <Link to="/register" className="auth-btn">
                  S'inscrire
                </Link>
              </div>
            ) : (
              <div className="user-wrapper" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="user-toggle-btn"
                  aria-haspopup="true"
                  aria-expanded={profileOpen}
                  aria-label="Ouvrir le menu utilisateur"
                >
                  <FaUser />
                  <span className="user-name">{user.firstName}</span>
                  <span className="caret-icon">▼</span>
                </button>

                {profileOpen && (
                  <div className="user-dropdown">
                    <Link
                      to="/profile"
                      className="dropdown-link profilr-btn"
                      onClick={() => setProfileOpen(false)}
                    >
                      Mon profil
                    </Link>
                    <button
                      className="dropdown-link logout-btn"
                      onClick={handleLogout}
                    >
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              className={`menu-trigger ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Ouvrir le menu de navigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
