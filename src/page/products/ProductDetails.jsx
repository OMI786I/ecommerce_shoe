import { useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "react-rating";
import "font-awesome/css/font-awesome.min.css";
import { HiHeart } from "react-icons/hi";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import useDetailsFetch from "../../customHook/useDetailsFetch";
import useWishList from "../../customHook/useWishList";
import useCartPost from "../../customHook/useCartPost";

const ProductDetails = () => {
  let { id } = useParams();
  const { isPending, data } = useDetailsFetch(id);
  console.log(data);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("S");
  const [colorValue, setColorValue] = useState("black");
  const [currentReviewPage, setReviewPage] = useState(1);
  console.log(colorValue);
  console.log(currentReviewPage);
  // Toggle dropdown state
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const cartPost = useCartPost();
  const wishPost = useWishList();
  const handleWishList = (res) => {
    wishPost(res);
  };
  const handleAddCart = (res) => {
    cartPost(res);
  };

  // Function to render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${index < rating ? "text-yellow-500" : "text-gray-300"}`}
      >
        ★
      </span>
    ));
  };

  function GFG(array, currentPage, pageSize) {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array?.slice(startIndex, endIndex);
  }

  const reviewData = data?.reviews;
  const currentPage = currentReviewPage;
  const pageSize = 4;
  const currentPageData = GFG(reviewData, currentPage, pageSize);
  console.log(currentPageData);

  console.log(data);

  const totalReviews = reviewData?.length || 0;
  const maxPages = Math.ceil(totalReviews / pageSize);

  if (isPending) {
    return (
      <div className="flex items-center justify-center max-w-full max-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      {" "}
      <div className="flex justify-around gap-10 p-5">
        <div>
          <img className="w-96 rounded-xl" src={data?.image} />
        </div>
        <div>
          <h1 className="text-2xl text-gray-500 my-8">{data?.title}</h1>
          <div>
            <div className="rating">
              <Rating
                initialRating={data?.rating}
                readonly
                emptySymbol={["fa fa-star-o fa-2x"]}
                fullSymbol={["fa fa-star fa-2x"]}
              />
            </div>
          </div>
          <h1 className="text-xl font-bold">${data?.price}</h1>
          <p className="text-gray-500 my-5">{data?.description}</p>
          <div className="flex gap-5">
            {/**drop down */}
            <div className="relative inline-block text-left">
              {" "}
              <h1 className="font-bold">Size</h1>
              {/* Dropdown Trigger Button */}
              <button
                onClick={toggleDropdown}
                className="inline-flex justify-center w-full px-4 py-2  text-black border font-semibold rounded-md shadow-sm  focus:outline-none"
              >
                {value}
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute bg-white border border-gray-300 rounded-md shadow-lg">
                  <button
                    onClick={() => setValue("S")}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    S
                  </button>
                  <button
                    onClick={() => setValue("M")}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    M
                  </button>
                  <button
                    onClick={() => setValue("L")}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    L
                  </button>
                  <button
                    onClick={() => setValue("XL")}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    XL
                  </button>
                </div>
              )}
            </div>

            {/**color picker */}
            <div>
              {" "}
              <h1 className="font-bold">Color</h1>
              <div className="bg-base-200 flex items-center justify-center w-32 h-32 gap-4 ">
                {/* Black color with a more visible shadow */}
                <div
                  className={`w-8 h-8 bg-black shadow-xl shadow-gray-500/50 mb-2 hover:cursor-pointer border-indigo-500 ${
                    colorValue === "black" ? "border-2" : ""
                  }`}
                  onClick={() => setColorValue("black")}
                ></div>

                {/* White color with shadow and a border */}
                <div
                  className={`w-8 h-8 bg-white shadow-xl shadow-gray-500/50 mb-2 hover:cursor-pointer border-indigo-500 ${
                    colorValue === "white" ? "border-2" : ""
                  }`}
                  onClick={() => setColorValue("white")}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 my-6">
            <button
              onClick={() => handleAddCart(data)}
              className="btn bg-black text-white hover:bg-red-600"
            >
              +ADD TO CART
            </button>
            <button
              onClick={() => handleWishList(data)}
              className="btn hover:bg-red-500 text-black bg-white hover:text-white hover:border-red-500"
            >
              <HiHeart className="text-xl" />
              <p>Add to wishlist</p>
            </button>
          </div>{" "}
          <div className="flex items-center gap-4">
            Share
            <div className="flex gap-2">
              <FaFacebook className="hover:text-red-600 duration-100" />
              <FaTwitter className="hover:text-red-600 duration-100" />
              <FaGoogle className="hover:text-red-600 duration-100" />
            </div>
          </div>
        </div>

        {/**Reviews */}

        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Product Reviews
          </h1>
          <div className="flex my-2 gap-2 items-center">
            <button
              className="btn btn-sm"
              onClick={() => {
                if (currentReviewPage > 1) {
                  setReviewPage(currentReviewPage - 1);
                }
              }}
              disabled={currentReviewPage <= 1}
            >
              Previous
            </button>
            <span>
              Page {currentReviewPage} of {maxPages}
            </span>
            <button
              className="btn btn-sm"
              onClick={() => {
                if (currentReviewPage < maxPages) {
                  setReviewPage(currentReviewPage + 1);
                }
              }}
              disabled={currentReviewPage >= maxPages}
            >
              Next
            </button>
          </div>
          <div className="space-y-4">
            {currentPageData?.map((review, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-gray-50 shadow-sm"
              >
                <h4 className="text-lg font-semibold">{review.name}</h4>
                <div className="flex items-center mb-2">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-700">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default ProductDetails;
