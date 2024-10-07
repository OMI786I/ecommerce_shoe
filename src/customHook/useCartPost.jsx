import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const useCartPost = () => {
  const [data, setData] = useState();
  const { user } = useContext(AuthContext);

  const cartPost = (res) => {
    const email = user.email;
    const id = res._id;
    const finalData = { ...res, email, id };
    delete finalData._id;

    axios
      .post(`http://localhost:5000/cart/check`, {
        email: finalData.email,
        id: finalData.id,
      })
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
            .post(`http://localhost:5000/cart`, finalData)
            .then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Added to cart",
                  showConfirmButton: false,
                  timer: 1500,
                });
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
