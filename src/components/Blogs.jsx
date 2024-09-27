import React from "react";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import usePublicFetch from "../customHook/usePublicFetch";
const Blogs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isPending, error, data, refetch } = usePublicFetch({
    endPoint: "blogs",
    query: "",
  });
  console.log(data);
  console.log(currentSlide);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleSlideChange = (nextSlide) => {
    setCurrentSlide(nextSlide);
  };

  if (isPending) {
    return (
      <span className="loading loading-spinner loading-lg text-center"></span>
    );
  }
  if (error) {
    return error;
  }
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
          autoPlay
          autoPlaySpeed={3000}
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
          {data
            ? data.map((res) => (
                <Link key={res._id} to={"/"}>
                  <div className=" lg:w-[300px] xl:w-[400px] rounded-xl border p-3">
                    <div className="overflow-hidden">
                      <img
                        src={res.image}
                        className="w-96 h-80 hover:scale-110 duration-500"
                      />
                    </div>
                    <div className="">
                      <p className="text-red-600 my-2">{res.topic}</p>
                      <h1 className="text-2xl my-2">{res.title}</h1>
                      <p className="text-gray-600">
                        Posted by{" "}
                        <span className="text-red-600">{res.author}</span>{" "}
                        {res.date}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            : "loading..."}
        </Carousel>
      </div>
    </div>
  );
};

export default Blogs;
