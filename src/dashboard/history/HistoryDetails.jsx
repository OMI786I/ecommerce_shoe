import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const HistoryDetails = () => {
  const { id } = useParams();
  console.log(id);

  const handleUpdate = () => {
    axios
      .get(`http://localhost:5000/search/${id}`)
      .then(function (response) {
        console.log(response.data); // Log response data
      })
      .catch(function (error) {
        console.error("Error:", error); // Improved error logging
      });
  };

  return (
    <div>
      This is details {id}
      <button className="btn btn-primary" onClick={() => handleUpdate()}>
        Click me
      </button>
    </div>
  );
};

export default HistoryDetails;
