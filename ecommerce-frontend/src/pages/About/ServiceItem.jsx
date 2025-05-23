import React from "react";

const ServiceItem = ({ title, description, image }) => (
  <div className="col-lg-4">
    <div className="service-item">
      <h4>{title}</h4>
      <p>{description}</p>
      <img src={image} alt={title} />
    </div>
  </div>
);

export default ServiceItem;
