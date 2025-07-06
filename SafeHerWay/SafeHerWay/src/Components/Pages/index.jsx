import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterLogin from "./RegisterLogin";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Css/pages.css";

const Index = () => {
  useEffect(() => {
    // Delay is optional but ensures DOM is ready
    const nextEl = document.querySelector(".swiper-next");
    const prevEl = document.querySelector(".swiper-prev");

    if (nextEl && prevEl) {
      nextEl.style.zIndex = "20";
      prevEl.style.zIndex = "20";
    }
  }, []);
  const navigate = useNavigate();
  const goToRegister = () => {
    navigate("/RegisterLogin");
  };

  return (
    <>
      {/* Swiper Navigation Arrows — Place Outside Swiper */}
      <i className="bi bi-arrow-left-short swiper-btn swiper-prev"></i>
      <i className="bi bi-arrow-right-short swiper-btn swiper-next"></i>

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
        {[1, 2, 3, 4].map((num) => (
          <SwiperSlide key={num}>
            <div className={`hero hero${num} d-flex flex-column justify-content-center align-items-center`}>
              <div className="hero-content w-100 d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-white">Safe</h2>
                <h1 className="text-white">Journey</h1>
                <button onClick={goToRegister} className="btn text-white hero-btn mt-5">
                  Register
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Index;
