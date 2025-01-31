import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const HistoryDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState(""); // For user input
  const [rating, setRating] = useState(0); // Store rating
  const [currentReviewPage, setReviewPage] = useState(1);
  useEffect(() => {
    axios
      .get(`https://ecommerce1-server.vercel.app/search/${id}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [id]);

  console.log(rating);
  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmitReview = () => {
    const review = {
      user: user.email,
      review: reviewText,
      rating: rating,
      collection: data[0].source,
    };

    axios
      .patch(`https://ecommerce1-server.vercel.app/search/${id}`, review)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          toast.success("Successfully added review!");
        }
        console.log(res);
      });
  };

  function GFG(array, currentPage, pageSize) {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array?.slice(startIndex, endIndex);
  }

  const reviewData = data[0]?.reviews;
  const currentPage = currentReviewPage;
  const pageSize = 4;
  const currentPageData = GFG(reviewData, currentPage, pageSize);
  console.log(currentPageData);

  console.log(data);

  const totalReviews = reviewData?.length || 0;
  const maxPages = Math.ceil(totalReviews / pageSize);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!data[0]) {
    return <div className="text-center py-8">No data found for this ID.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      {/* Product Card */}
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="w-full lg:w-1/2">
          <img
            src={data[0].image}
            alt={data[0].title}
            className="object-cover w-full h-full"
          />
        </figure>
        <div className="card-body w-full lg:w-1/2">
          <h2 className="card-title text-2xl font-bold">{data[0].title}</h2>
          <p className="text-gray-600 mt-2">{data[0].description}</p>
          <p className="text-gray-600 mt-2">
            Type: <span className="capitalize">{data[0].type}</span>
          </p>

          {/* Price and Rating */}
          <div className="flex items-center mt-4 space-x-6">
            <span className="text-lg font-semibold text-primary">
              Price: ${data[0].price}
            </span>
          </div>

          {/* Colors and Sizes */}
          <div className="mt-4 space-y-2">
            <div>
              <span className="text-lg font-semibold">Available Colors:</span>
              <div className="flex space-x-2 mt-1">
                {data[0].color.map((col, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: col.toLowerCase() }}
                  />
                ))}
              </div>
            </div>
            <div>
              <span className="text-lg font-semibold">Available Sizes:</span>
              <div className="flex space-x-2 mt-1">
                {data[0].dimension.map((size, index) => (
                  <span key={index} className="badge badge-outline">
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold">Customer Reviews</h3>
        <div className="divider"></div>
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
        {/* Display Existing Reviews */}
        {data[0]?.reviews?.length ? (
          currentPageData.map((review, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow-sm mb-4"
            >
              <div className="flex flex-col md:flex-row items-center space-x-2">
                <span className="text-lg font-bold">{review.user}:</span>
                <span className="text-lg ">{review.review}</span>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`mask mask-star-2 ${
                        i < review.rating ? "bg-orange-400" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{review.text}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}

        {/* Add Review Form */}
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitReview();
          }}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Add Your Review</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Share your thoughts..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
          </div>

          {/* Star Rating Input */}
          <div className="flex items-center space-x-1">
            <span className="text-lg font-semibold">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`mask mask-star-2 w-8 h-8 cursor-pointer ${
                  star <= rating ? "bg-orange-400" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <button className="btn btn-primary">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default HistoryDetails;
