import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Banner = ({ deviceType }) => {
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

  return (
    <Carousel
      additionalTransfrom={0}
      arrows={false}
      autoPlay
      autoPlaySpeed={2000}
      centerMode={false}
      className="w-full"
      containerClass="w-full h-screen" // Full width and height
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      transitionDuration={1000}
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
    >
      <div className="w-full h-screen">
        {" "}
        <img
          src="../../src/assets/images/banner_1.jpg"
          alt="Banner 1"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full h-screen">
        <img
          src="../../src/assets/images/sample-2.jpg"
          alt="Banner 2"
          className="w-full h-full object-cover"
        />
      </div>
    </Carousel>
  );
};

export default Banner;
