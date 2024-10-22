import React, { useState, useEffect } from "react";
import useOrderFetch from "../../customHook/useOrderFetch";

const CurrentOrder = () => {
  const { orderData, isPending, error } = useOrderFetch();
  const steps = ["Order Placed", "Pick up Order", "On route", "Received"];

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
          </div>

          {/* Update status */}
          <div className="mt-6"></div>
        </div>
      ))}
    </div>
  );
};

export default CurrentOrder;
