import React from "react";
import CardSlider from "../CardSlider/CardSlider";
import { Link } from "react-router-dom";
import './CategoryAreStarts.css'

const CategoryAreStarts = ({ title, details, products }) => {
  return (
    <>
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
          <CardSlider products={products} />
        </div>
      <div className="view-more-wrapper">
        <Link to="/products" className="view-more-link">
          View More Products
        </Link>
      </div>
      </section>

    </>
  );
};

export default CategoryAreStarts;
