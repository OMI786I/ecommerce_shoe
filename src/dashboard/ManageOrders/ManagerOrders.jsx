import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManagerOrders = () => {
  const [data, setData] = useState([]);
  const steps = ["Order Placed", "Pick up Order", "On route", "Received"];

  useEffect(() => {
    axios
      .get("http://localhost:5000/order", {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(data);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>customer</th>
              <th>product number</th>
              <th>status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((res, index) => (
              <tr key={res._id}>
                <th>{index + 1}</th>
                <td>{res.customer_name}</td>
                <td>{res.products.length}</td>
                <td>{steps[res.order_stepper]}</td>
                <td>
                  <Link to={`/dashboard/manageOrders/${res._id}`}>
                    {" "}
                    <button className="btn btn-primary">Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerOrders;
