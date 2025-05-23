import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../../context/CartContext";

const ProductsCards = ({ products }) => {
  const { addToCart } = useCart();

  return (
    <div className="row">
      {products.map(({ id, images, name, price, category }, index) => (
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
                        addToCart({ 
                          id, 
                          image: images[0] || '', 
                          name, 
                          price, 
                          quantity: 1 
                        });
                      }}
                      className="btnCart"
                      title="Add to cart"
                    >
                      <FaShoppingCart />
                    </button>
                  </li>
                </ul>
              </div>
              {/* Display first image if available */}
              {images && images.length > 0 ? (
                <img 
                  src={images[0]} 
                  alt={name} 
                  onError={(e) => {
                    e.target.src = '/path/to/default-image.jpg'; // Fallback image
                  }}
                />
              ) : (
                <img src="/path/to/default-image.jpg" alt={name} />
              )}
            </div>
            <div className="down-content">
              <h4>{name}</h4>
              <span>${price.toFixed(2)}</span>
              {category && <p className="category">{category.name}</p>}
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
      images: PropTypes.arrayOf(PropTypes.string),
      category: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      }),
      rating: PropTypes.number,
    })
  ).isRequired,
};

export default React.memo(ProductsCards);