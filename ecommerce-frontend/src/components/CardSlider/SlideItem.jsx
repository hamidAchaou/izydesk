import React from "react";
import { Link } from "react-router-dom";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import "./SlideItem.css";

const SlideItem = ({ id, image, title, price }) => {
  const { addToCart } = useCart();

  return (
    <div className="item">
      <div className="thumb">
        <div className="hover-content">
          <ul>
          <li>
    <Link to={`products/single-product/${id}`}>
      <FaEye />
    </Link>
  </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  console.log("Adding to cart:", { id, title, price });
                  addToCart({ id, image, title, price });
                }}
                className="btnCart"
                title="Add to cart"
              >
                <FaShoppingCart />
              </button>
            </li>
          </ul>
        </div>
        <img
          className="slider-image"
          src={image}
          alt={title || "Product image"}
        />
      </div>
      <div className="down-content">
        <h4>{title}</h4>
        <span>{price}</span>
      </div>
    </div>
  );
};

export default SlideItem;
