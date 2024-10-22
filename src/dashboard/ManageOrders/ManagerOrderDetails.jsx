import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ManagerOrderDetails = () => {
  let { id } = useParams();
  console.log(id);
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/order/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
      });
  }, [id]);
  console.log(data);

  const steps = ["Order Placed", "Pick up Order", "On route", "Received"];
  let [count, setCount] = useState(0);
  useEffect(() => {
    if (data) {
      setCount(data.order_stepper);
    }
  }, [data]);
  count = Math.min(4, Math.max(0, count));
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
              {data.products.map((product) => (
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
          </div>

          {/* Update Order Status Buttons */}
          <div className="flex justify-between">
            <button
              className="btn btn-primary"
              onClick={() => {
                setCount(count - 1);
              }}
            >
              Previous
            </button>
            <button
              onClick={() => {
                setCount(count + 1);
              }}
              className="btn btn-primary"
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
};

export default ManagerOrderDetails;
