// components/SlideItem.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import "./SlideItem.css";

const SlideItem = ({ id, image, title, price }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, image, title, price });
  };

  return (
    <div className="item">
      <div className="thumb">
        <div className="hover-content">
          <ul>
            <li>
              <Link to={`products/single-product/${id}`} aria-label={`Voir les détails de ${title}`}>
                <FaEye />
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={handleAddToCart}
                className="btnCart"
                title="Ajouter au panier"
                aria-label={`Ajouter ${title} au panier`}
              >
                <FaShoppingCart />
              </button>
            </li>
          </ul>
        </div>
        <img
          className="slider-image"
          src={image}
          alt={title || "Image du produit"}
          loading="lazy"
        />
      </div>
      <div className="down-content">
        <h4>{title}</h4>
        <span>{price} €</span>
      </div>
    </div>
  );
};

export default SlideItem;