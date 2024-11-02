import React, { useState, useEffect } from "react";
import useOrderFetch from "../../customHook/useOrderFetch";
import Swal from "sweetalert2";
import axios from "axios";

const CurrentOrder = () => {
  const { orderData, isPending, error, refetch } = useOrderFetch();
  const steps = ["Order Placed", "Pick up Order", "On route", "Received"];
  console.log(orderData);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I received it!",
    }).then((result) => {
      axios
        .delete(`http://localhost:5000/order/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.deletedCount && result.isConfirmed) {
            refetch();
            Swal.fire({
              title: "Congratulations!",
              text: "Please leave a review of your product",
              icon: "success",
            });
          }
        });
    });
  };

  return (
    <div>
      {orderData?.map((res) => (
        <div
          key={res._id}
          className="container mx-auto my-10 p-5 max-w-2xl bg-white shadow-md rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Track Your Order
          </h2>

          {/* Order Details Section */}
          <div className="mb-8">
            <div className="flex justify-between mb-3">
              <span className="text-lg font-medium">Order ID:</span>
              <span className="text-lg text-gray-600">{res.paymentId}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-lg font-medium">Customer Name:</span>
              <span className="text-lg text-gray-600">{res.customer_name}</span>
            </div>
            <div className="mb-5">
              <span className="text-lg font-medium">Products:</span>
              <ul className="ml-4 mt-2 list-disc text-gray-600">
                {res.products.map((product) => (
                  <li key={product._id}>
                    {product.title} - {product.quantity} pcs
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-lg font-medium">Estimated Delivery:</span>
              <span className="text-lg text-gray-600">Delivery</span>
            </div>
          </div>

          {/* Progress Bar for Order Status */}
          <div className="mb-5">
            <h3 className="text-lg font-semibold mb-4">Order Status</h3>
            <ul className="steps">
              {" "}
              {steps.map((response, num) => (
                <React.Fragment key={num}>
                  <li
                    className={`step ${
                      num === res.order_stepper ? `step-primary` : ""
                    } `}
                  >
                    {response}
                  </li>
                </React.Fragment>
              ))}
            </ul>
            {res.order_stepper === 3 ? (
              <div className="mt-5">
                <h1>Did your Received your Order?</h1>

                <div className="flex gap-4">
                  <button
                    className="btn btn-success"
                    onClick={() => handleDelete(res._id)}
                  >
                    Yes
                  </button>
                  <button className="btn btn-error">No</button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* Update status */}
          <div className="mt-6">{}</div>
        </div>
      ))}
    </div>
  );
};

export default CurrentOrder;
