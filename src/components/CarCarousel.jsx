import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrowIcon } from "../icons/cars-page-icons/NextArrowIcon";
import { PrevArrowIcon } from "../icons/cars-page-icons/PrevArrowIcon";

// Custom Next Arrow
const NextArrow = ({ onClick }) => {
  return (
    <div
      className="hidden md:block absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer"
      onClick={onClick}
    >
      <NextArrowIcon />
    </div>
  );
};

// Custom Previous Arrow
const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="hidden md:block absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer"
      onClick={onClick}
    >
      <PrevArrowIcon />
    </div>
  );
};

const CarCarousel = ({images, video}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => setCurrentIndex(next),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    sliderRef.current.slickGoTo(index);
  };

  return (
    <div className="relative">
      <Slider ref={sliderRef} {...settings}>
        {images?.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Car Image ${index + 1}`}
              className="w-full xl:h-[633px] object-cover"
            />
          </div>
        ))}
        <div>
          <video controls className="w-full xl:h-[633px]">
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </Slider>
      <div className="flex justify-center mt-2 md:mt-4 lg:mt-5 gap-4 xl:gap-9">
        {images?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`w-12 md:w-24 lg:w-36 md:mx-1 cursor-pointer ${
              currentIndex === index ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
        <video
          controls
          className={`w-12 md:w-24 mx-1 cursor-pointer ${
            currentIndex === images?.length ? "border-2 border-blue-500" : ""
          }`}
          onClick={() => handleThumbnailClick(images.length)}
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default CarCarousel;
