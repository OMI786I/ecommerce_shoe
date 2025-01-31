import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddReview = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const email = user.email;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const submitData = {
      ...data,
      email,
    };
    axios
      .post("https://ecommerce1-server.vercel.app/review", submitData)
      .then((response) => {
        if (response.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your review has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/review");
        }
        console.log(response);
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Your review has not been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      });

    reset();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-lg p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Add a Review</h1>

        {/* Review Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Your Name
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                maxLength: {
                  value: 50,
                  message: "Name cannot exceed 50 characters",
                },
              })}
              className="input input-bordered w-full"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Rating Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Rating</label>
            <select
              {...register("rating", { required: "Please select a rating" })}
              className="select select-bordered w-full"
            >
              <option value="">Select rating</option>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Review Text Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Review</label>
            <textarea
              {...register("review", {
                required: "Please enter your review",
                minLength: {
                  value: 10,
                  message: "Review must be at least 10 characters long",
                },
                maxLength: {
                  value: 500,
                  message: "Review cannot exceed 500 characters",
                },
              })}
              className="textarea textarea-bordered w-full"
              placeholder="Write your review here"
              rows="4"
            ></textarea>
            {errors.review && (
              <p className="text-red-500 text-sm mt-1">
                {errors.review.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="btn hover:btn-error hover:text-white w-full"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
