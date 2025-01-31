import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ManagerOrderDetails = () => {
  let { id } = useParams();
  console.log(id);
  let [count, setCount] = useState(0);

  // useEffect(() => {
  //   axios
  //     .get(`https://ecommerce1-server.vercel.app/order/${id}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       setData(res.data);
  //     });
  // }, [id]);

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`https://ecommerce1-server.vercel.app/order/${id}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  console.log(data);

  const handleUpdate = (value) => {
    setCount((prevCount) => {
      // Determine the next count value based on the current one
      let updatedCount = value === "prev" ? prevCount - 1 : prevCount + 1;
      updatedCount = Math.min(3, Math.max(0, updatedCount)); // Ensure count is within bounds

      // Fire confirmation dialog after setting the count
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Updated!",
            text: "Order status has been updated.",
            icon: "success",
          });

          // Send the PATCH request with the updated count
          axios
            .patch(
              `https://ecommerce1-server.vercel.app/order/${id}`,
              {
                order_stepper: updatedCount, // Use the updated count
              },
              {
                withCredentials: true,
              }
            )
            .then((response) => {
              console.log(response);
              refetch(); // Refetch data after successful update
            });
        }
      });

      return updatedCount; // Return the updated count
    });
  };

  const steps = ["Order Placed", "Pick up Order", "On route", "Received"];

  useEffect(() => {
    if (data) {
      setCount(data.order_stepper);
    }
  }, [data]);

  console.log(count);

  if (!data) {
    <span className="loading loading-spinner loading-lg"></span>;
  } else
    return (
      <>
        <div className="container mx-auto p-5 max-w-4xl bg-white shadow-md rounded-lg">
          {/* Order Header */}
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Order Details
          </h2>

          {/* Customer and Order Info */}
          <div className="mb-8">
            <div className="flex justify-between mb-3">
              <span className="text-lg font-medium">Order ID:</span>
              <span className="text-lg text-gray-600">{data._id}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-lg font-medium">Customer Name:</span>
              <span className="text-lg text-gray-600">
                {data.customer_name}
              </span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-lg font-medium">Customer Email:</span>
              <span className="text-lg text-gray-600">
                {data.customer_email}
              </span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-lg font-medium">Location:</span>
              <span className="text-lg text-gray-600">{data.location}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-lg font-medium">Amount:</span>
              <span className="text-lg text-gray-600">${data.amount}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-lg font-medium">Payment ID:</span>
              <span className="text-lg text-gray-600">{data.paymentId}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-lg font-medium">data Status:</span>
              <span className="text-lg text-gray-600">{data.status}</span>
            </div>
          </div>

          {/* Products List */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Products Ordered</h3>
            <ul className="ml-4 list-disc text-gray-600">
              {data?.products.map((product) => (
                <li key={product._id}>
                  {product.title} - Rating: {product.rating}, Quantity:{" "}
                  {product.quantity} pcs
                </li>
              ))}
            </ul>
          </div>

          {/* Order Status Steps */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">
              Order Status Progress
            </h3>
            <ul className="steps">
              {" "}
              {steps.map((response, num) => (
                <React.Fragment key={num}>
                  <li
                    className={`step ${
                      num === data.order_stepper ? `step-primary` : ""
                    } `}
                  >
                    {response}
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>

          {/* Update Order Status Buttons */}
          <div className="flex justify-between">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleUpdate("prev");
              }}
            >
              Previous status
            </button>
            <button
              onClick={() => {
                handleUpdate("forward");
              }}
              className="btn btn-primary"
            >
              Next status
            </button>
          </div>
        </div>
      </>
    );
};

export default ManagerOrderDetails;
