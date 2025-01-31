import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import useCartFetch from "./useCartFetch";

const useCartPost = () => {
  const { user } = useContext(AuthContext);
  const { refetch } = useCartFetch();
  const cartPost = (res) => {
    const email = user.email;
    const id2 = res.id;
    const id = res._id;

    const quantity = 1;
    const finalData = { ...res, email, id, id2, quantity };
    console.log("final Data", finalData);
    delete finalData._id;

    axios
      .post(
        `https://ecommerce1-server.vercel.app/cart/check`,
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
            .post(`https://ecommerce1-server.vercel.app/cart`, finalData, {
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
