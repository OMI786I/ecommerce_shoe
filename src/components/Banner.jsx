import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  console.log(currentSlide);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleSlideChange = (nextSlide) => {
    setCurrentSlide(nextSlide);
  };

  return (
    <Carousel
      additionalTransfrom={0}
      arrows={false}
      autoPlay
      autoPlaySpeed={1000}
      centerMode={false}
      className="w-full my-6"
      containerClass="w-full"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      transitionDuration={3000}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={responsive}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots
      sliderClass=""
      slidesToSlide={1}
      swipeable
      beforeChange={handleSlideChange}
    >
      <div className="w-full relative">
        {" "}
        <img
          src="/images/banner_1.jpg"
          alt="Banner 1"
          className="w-full object-cover"
        />
        <div
          className={`absolute inset-0 flex flex-col justify-center p-3 text-white `}
        >
          <p
            className={`text-xs md:text-base ${
              currentSlide === 4 ? "fade-in" : ""
            }`}
          >
            NEW ARRIVALS
          </p>
          <p
            className={` text-xl md:text-6xl ${
              currentSlide === 4 ? "fade-out" : ""
            }`}
          >
            SUMMER SALE
          </p>
          <p
            className={` text-xl md:text-6xl font-bold  ${
              currentSlide === 4 ? "fade-right" : ""
            }`}
          >
            UP TO 70% Off
          </p>
          <div>
            <button className="btn btn-xs md:btn  my-2 hover:bg-red-500 text-black bg-white hover:text-white hover:border-red-500  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
      <div className="w-full relative">
        <img
          src="/images/sample-2.jpg"
          alt="Banner 2"
          className="w-full object-cover"
        />
        <div
          className={`absolute inset-0 flex flex-col justify-center p-3 text-white `}
        >
          <p
            className={`text-xs md:text-base  ${
              currentSlide === 3 ? "fade-in" : ""
            }`}
          >
            NIKE RUNNING SHOES
          </p>
          <p
            className={`text-xl md:text-6xl ${
              currentSlide === 3 ? "fade-out" : ""
            }`}
          >
            SPORT SHOES
          </p>
          <p
            className={`text-xl md:text-6xl font-bold  ${
              currentSlide === 3 ? "fade-right" : ""
            }`}
          >
            SALE 40% OFF
          </p>
          <div>
            <button className="btn btn-xs md:btn  my-2 hover:bg-red-500 text-black bg-white hover:text-white hover:border-red-500  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
