import React from "react";
import ServiceItem from "./ServiceItem";

const services = [
  {
    title: "Service 1",
    description: "Lorem ipsum dolor sit amet.",
    image: "assets/images/service-01.jpg",
  },
  {
    title: "Service 2",
    description: "Sed do eiusmod tempor incididunt.",
    image: "assets/images/service-02.jpg",
  },
  {
    title: "Service 3",
    description: "Ut enim ad minim veniam.",
    image: "assets/images/service-03.jpg",
  },
];

const ServiceSection = () => (
  <section className="our-services">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-heading">
            <h2>Our Services</h2>
            <span>
              Details to details is what makes Hexashop different from the other
              themes.
            </span>
          </div>
        </div>
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            title={service.title}
            description={service.description}
            image={service.image}
          />
        ))}
      </div>
    </div>
  </section>
);

export default ServiceSection;
