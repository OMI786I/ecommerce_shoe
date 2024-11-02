// ReviewComponents.js
import React, { useState } from "react";

const ReviewComponents = () => {
  // Initial reviews data
  const [reviews, setReviews] = useState([
    {
      name: "John Doe",
      rating: 4,
      review: "Great product, really enjoyed using it!",
    },
    {
      name: "Jane Smith",
      rating: 5,
      review: "Absolutely fantastic! Highly recommend.",
    },
    {
      name: "Alex Johnson",
      rating: 3,
      review: "It was okay, could have been better.",
    },
  ]);

  // Form state
  const [name, setName] = useState("");
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Add new review to the list
    const newReview = { name, rating: Number(rating), review: reviewText };
    setReviews([newReview, ...reviews]);

    // Clear form fields
    setName("");
    setRating(1);
    setReviewText("");
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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Product Reviews</h1>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="rating">
            Rating
          </label>
          <select
            id="rating"
            className="select select-bordered w-full"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="review">
            Your Review
          </label>
          <textarea
            id="review"
            className="textarea textarea-bordered w-full"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit Review
        </button>
      </form>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
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
  );
};

export default ReviewComponents;
