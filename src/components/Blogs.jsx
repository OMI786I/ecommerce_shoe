import React from "react";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
const Blogs = () => {
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
    <div>
      <div>
        <h1 className="text-3xl text-center">Latest Blogs</h1>
        <p className="text-gray-500 text-center">
          Present posts in a best way to highlight interesting moments of your
          blog.
        </p>
      </div>
      <div>
        <Carousel
          additionalTransfrom={0}
          arrows={true}
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
          <Link to={"/"}>
            <div className="w-96 rounded-xl border p-3">
              <div className="overflow-hidden">
                <img
                  src="/src/assets/images/data/casual_1.jpeg"
                  className="w-96 h-80 hover:scale-110 duration-500"
                />
              </div>
              <div className="">
                <p className="text-red-600 my-2">FASHION</p>
                <h1 className="text-2xl my-2">
                  This is Second Post For XipBlog
                </h1>
                <p className="text-gray-600">
                  Posted by <span className="text-red-600">DEMO MEE</span> May
                  6th 2020
                </p>
              </div>
            </div>
          </Link>
        </Carousel>
      </div>
    </div>
  );
};

export default Blogs;
