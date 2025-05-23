import React from "react";
import PropTypes from "prop-types";
// Import Swiper components
import { Pagination, Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./CardSlider.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import SlideItem from "./SlideItem";

const CardSlider = ({ products }) => {
  return (
    <Swiper
      modules={[Pagination, Navigation, A11y]}
      spaceBetween={10}
      speed={800}
      grabCursor={true}
      pagination={{ clickable: true }}
      navigation
      slideToClickedSlide={true}
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      a11y={{ enabled: true }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <SlideItem
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            link={product.link}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

CardSlider.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CardSlider;
