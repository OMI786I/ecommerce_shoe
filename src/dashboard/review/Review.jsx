import React from "react";
import { Link } from "react-router-dom";
import useReviewFetch from "../../customHook/useReviewFetch";

const Review = () => {
  const { isPending, error, data } = useReviewFetch();

  return (
    <div>
      <div className="mb-4">
        <Link to={"/dashboard/addReview"}>
          <button className="btn hover:btn-error hover:text-white">
            Add A Review
          </button>
        </Link>
      </div>
      <h1 className="text-center text-xl font-bold my-5">Your Reviews</h1>

      {/* If data is loading or fetching is pending */}
      {isPending && (
        <p className="text-center text-xl text-gray-700">Loading...</p>
      )}

      {/* If there is an error */}
      {error && (
        <p className="text-center text-xl text-red-500">
          An error occurred: {error.message}
        </p>
      )}

      {/* If there are reviews */}
      {data && data.length > 0 ? (
        <div className="space-y-6">
          {data.map((review, index) => {
            const rating = parseInt(review?.rating);
            return (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto"
              >
                {/* User Info */}
                <div className="flex items-center space-x-4 mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-700">
                      {review.name}
                    </h2>
                    <p className="text-gray-500 text-sm">{review.email}</p>
                  </div>
                </div>

                {/* Review Text */}
                <div className="mb-4">
                  <p className="text-gray-600">{review.review}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${
                        i < rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* If no reviews are available, display a message */
        <p className="text-center text-xl text-gray-700">
          No reviews yet. Please add a review.
        </p>
      )}
    </div>
  );
};

export default Review;
