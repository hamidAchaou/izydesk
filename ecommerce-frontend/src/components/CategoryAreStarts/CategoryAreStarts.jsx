import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CardSlider from "../CardSlider/CardSlider";
import "./CategoryAreStarts.css";
import { useProduct } from "../../context/ProductContext";

const CategoryAreStarts = ({ title, details }) => {
  const { latestProducts } = useProduct();

  return (
    <section className="section" id="men">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-heading">
              <h2>{title}</h2>
              <span>{details}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {latestProducts && latestProducts.length > 0 ? (
          <CardSlider products={latestProducts} />
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      <div className="view-more-wrapper">
        <Link to="/products" className="view-more-link">
          View More Products
        </Link>
      </div>
    </section>
  );
};

CategoryAreStarts.propTypes = {
  title: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
};

export default CategoryAreStarts;
