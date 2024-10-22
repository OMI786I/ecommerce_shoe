import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const useOrderUpdate = (id, stepper) => {
  axios
    .patch(`http://localhost:5000/order/${id}`, {
      order_stepper: stepper,
    })
    .then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  return <div></div>;
};

export default useOrderUpdate;
