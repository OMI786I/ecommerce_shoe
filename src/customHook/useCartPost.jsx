import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import useCartFetch from "./useCartFetch";

const useCartPost = () => {
  const [data, setData] = useState();
  const { user } = useContext(AuthContext);
  const { refetch } = useCartFetch();
  const cartPost = (res) => {
    const email = user.email;
    const id = res._id;
    const quantity = 1;
    const finalData = { ...res, email, id, quantity };
    delete finalData._id;

    axios
      .post(
        `http://localhost:5000/cart/check`,
        {
          email: finalData.email,
          id: finalData.id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.exists) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Already in Cart!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          axios
            .post(`http://localhost:5000/cart`, finalData, {
              withCredentials: true,
            })
            .then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Added to cart",
                  showConfirmButton: false,
                  timer: 1500,
                });
                refetch();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
  };

  return cartPost;
};

export default useCartPost;
