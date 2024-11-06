import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HistoryDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]); // Store reviews
  const [reviewText, setReviewText] = useState(""); // For user input
  const [rating, setRating] = useState(0); // Store rating

  useEffect(() => {
    axios
      .get(`http://localhost:5000/search/${id}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [id]);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmitReview = () => {
    const newReview = {
      text: reviewText,
      rating,
      user: "John Doe", // Replace with dynamic user data if available
    };
    setReviews([...reviews, newReview]);
    setReviewText("");
    setRating(0);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!data[0]) {
    return <div className="text-center py-8">No data found for this ID.</div>;
  }

  return (
    <div className="container mx-auto p-4">
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

        {/* Display Existing Reviews */}
        {reviews.length ? (
          reviews.map((review, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow-sm mb-4"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">{review.user}</span>
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
