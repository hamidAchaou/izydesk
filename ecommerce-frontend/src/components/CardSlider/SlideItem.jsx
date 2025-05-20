import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faStar, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./SlideItem.css"; // Assuming styles are in SlideItem.css

const SlideItem = ({ image, title, price, link }) => {
  return (
    <div className="item">
      <div className="thumb">
        <div className="hover-content">
          <ul>
            <li>
              <a href={link} aria-label="View product">
                <FontAwesomeIcon icon={faEye} />
              </a>
            </li>
            <li>
              <a href={link} aria-label="Add to wishlist">
                <FontAwesomeIcon icon={faStar} />
              </a>
            </li>
            <li>
              <a href={link} aria-label="Add to cart">
                <FontAwesomeIcon icon={faShoppingCart} />
              </a>
            </li>
          </ul>
        </div>
        <img className="slider-image" src={image} alt={title || "Product image"} />
      </div>
      <div className="down-content">
        <h4>{title}</h4>
        <span>{price}</span>
        <ul className="stars">
          {[...Array(5)].map((_, index) => (
            <li key={index}>
              <FontAwesomeIcon icon={faStar} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SlideItem;
