import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaEye, FaStar, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../../context/CartContext"; // adjust path

const ProductsCards = ({ products }) => {
  const { addToCart } = useCart();

  return (
    <div className="row">
      {products.map(({ id, image, name, price, rating }, index) => (
        <div key={id || index} className="col-lg-4">
          <div className="item">
            <div className="thumb">
              <div className="hover-content">
                <ul>
                  <li>
                    <Link to={`single-product/${id}`}>
                      <FaEye />
                    </Link>
                  </li>
                  <li>
  <button
    type="button"
    onClick={() => {
      console.log("Adding to cart:", { id, name, price });
      addToCart({ id, image, name, price });
    }}
    
    className="btnCart"
    title="Add to cart"
  >
    <FaShoppingCart />
  </button>
</li>
                </ul>
              </div>
              <img src={image} alt={name} />
            </div>
            <div className="down-content">
              <h4>{name}</h4>
              <span>${price.toFixed(2)}</span>
              <ul className="stars">
                {Array.from(
                  { length: rating ?? Math.floor(Math.random() * 5) + 1 },
                  (_, i) => (
                    <li key={i}>
                      <FaStar />
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

ProductsCards.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string),
      rating: PropTypes.number,
    })
  ).isRequired,
};

export default React.memo(ProductsCards);
