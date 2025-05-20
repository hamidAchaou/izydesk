import React from "react";
// Import Swiper components
import { Pagination, Navigation } from "swiper/modules";
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
      modules={[Pagination, Navigation]}
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
    >
      {products.map((product, index) => (
        <SwiperSlide key={index}>
          <SlideItem
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

export default CardSlider;
