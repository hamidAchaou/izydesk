import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaStar, FaCheck } from "react-icons/fa";
import { getProductById } from "../../../api/index";
import "./ShowProducts.css";
import { useCart } from "../../../context/CartContext";

const ShowProducts = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (isAddedToCart) {
      const timer = setTimeout(() => setIsAddedToCart(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAddedToCart]);
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
        setMainImage(response.data.image || response.data.images?.[0]);
      } catch (err) {
        setError("Product not found.");
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    quantity > 1 && setQuantity((prev) => prev - 1);

  const totalPrice = product ? product.price * quantity : 0;

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading product...</p>;

  return (
    <div className="product-container">
      {/* Image Section */}
      <div className="image-section">
        <div className="main-image-wrapper">
          <img className="main-image" src={mainImage} alt="Main Product" />
          <button className="wishlist-btn">
            <FaHeart className="wishlist-icon" />
          </button>
        </div>

        <div className="thumbnail-images">
          {product.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={mainImage === img ? "selected" : ""}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Details Section */}
      <div className="details-section">
        <div>
          <h2 className="product-title">{product.name}</h2>
          <div className="product-rating">
          </div>
          <p className="product-code">Product ID: {product.id}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>
        </div>

        <div className="counter-section">
          <div className="counter">
            <button onClick={decreaseQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>

          <p className="total-price">Total: ${totalPrice.toFixed(2)}</p>

          <button
            className={`add-to-cart`}
            onClick={() => {
              addToCart({
                id: product.id,
                image: product.image,
                name: product.name,
                price: product.price,
                quantity: quantity,
              });
              setIsAddedToCart(true);
            }}
          >
            {isAddedToCart ? (
              <>
                <FaCheck /> Added to Cart
              </>
            ) : (
              <>
                <FaShoppingCart /> Add {quantity} to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowProducts;
