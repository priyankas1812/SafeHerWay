import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Css/pages.css";

const Index = () => {
  return (
    <>
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        navigation={{
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        }}
        className="overflow-hidden"
      >
        <SwiperSlide>
          <div className="hero hero1 d-flex flex-column justify-content-center align-items-center">
            <div className="hero-content w-100 d-flex flex-column justify-content-center align-items-center">
              <h2 className="text-white">Safe</h2>
              <h1 className="text-white">Journey</h1>
              <button className="btn text-white hero-btn mt-5">Register</button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="hero hero2 d-flex flex-column justify-content-center align-items-center">
            <div className="hero-content w-100 d-flex flex-column justify-content-center align-items-center">
              <h2 className="text-white">Safe</h2>
              <h1 className="text-white">Journey</h1>
              <button className="btn text-white hero-btn mt-5">Register</button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="hero hero3 d-flex flex-column justify-content-center align-items-center">
            <div className="hero-content w-100 d-flex flex-column justify-content-center align-items-center">
              <h2 className="text-white">Safe</h2>
              <h1 className="text-white">Journey</h1>
              <button className="btn text-white hero-btn mt-5">Register</button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="hero hero4 d-flex flex-column justify-content-center align-items-center">
            <div className="hero-content w-100 d-flex flex-column justify-content-center align-items-center">
              <h2 className="text-white">Safe</h2>
              <h1 className="text-white">Journey</h1>
              <button className="btn text-white hero-btn mt-5">Register</button>
            </div>
          </div>
        </SwiperSlide>

        {/* Swiper Navigation Arrows */}
        <i className="bi bi-arrow-left-short swiper-btn swiper-prev"></i>
        <i className="bi bi-arrow-right-short swiper-btn swiper-next"></i>
      </Swiper>
    </>
  );
};

export default Index;
