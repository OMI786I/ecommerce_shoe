import React, { useState, useEffect } from "react";

const CurrentOrder = () => {
  // Example order data
  const [order, setOrder] = useState({
    orderId: "12345ABC",
    customerName: "John Doe",
    products: [
      { id: 1, name: "Product 1", quantity: 2 },
      { id: 2, name: "Product 2", quantity: 1 },
    ],
    status: "shipped", // pending, processing, shipped, delivered
    estimatedDelivery: "Oct 25, 2024",
  });

  // Status mapping for progress bar
  const statusSteps = ["Pending", "Processing", "Shipped", "Delivered"];
  const currentStep = statusSteps.indexOf(
    order.status.charAt(0).toUpperCase() + order.status.slice(1)
  );

  return (
    <div className="container mx-auto my-10 p-5 max-w-2xl bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Track Your Order
      </h2>

      {/* Order Details Section */}
      <div className="mb-8">
        <div className="flex justify-between mb-3">
          <span className="text-lg font-medium">Order ID:</span>
          <span className="text-lg text-gray-600">{order.orderId}</span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-lg font-medium">Customer Name:</span>
          <span className="text-lg text-gray-600">{order.customerName}</span>
        </div>
        <div className="mb-5">
          <span className="text-lg font-medium">Products:</span>
          <ul className="ml-4 mt-2 list-disc text-gray-600">
            {order.products.map((product) => (
              <li key={product.id}>
                {product.name} - {product.quantity} pcs
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-lg font-medium">Estimated Delivery:</span>
          <span className="text-lg text-gray-600">
            {order.estimatedDelivery}
          </span>
        </div>
      </div>

      {/* Progress Bar for Order Status */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold mb-4">Order Status</h3>
        <ul className="steps steps-vertical lg:steps-horizontal">
          {statusSteps.map((step, index) => (
            <li
              key={index}
              className={`step ${index <= currentStep ? "step-primary" : ""}`}
            >
              {step}
            </li>
          ))}
        </ul>
      </div>

      {/* Update status */}
      <div className="mt-6">
        <button
          className="btn btn-primary"
          onClick={() => {
            const nextStatus = statusSteps[currentStep + 1] || "Delivered";
            setOrder({ ...order, status: nextStatus.toLowerCase() });
          }}
        >
          Mark as {statusSteps[currentStep + 1] || "Delivered"}
        </button>
      </div>
    </div>
  );
};

export default CurrentOrder;
