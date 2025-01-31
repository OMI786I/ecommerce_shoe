import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import useWishListFetch from "./useWishListFetch";

const useWishList = () => {
  const { user } = useContext(AuthContext);
  const { refetch } = useWishListFetch();
  const wishPost = (res) => {
    const email = user.email;
    const id = res._id;
    const finalData = { ...res, email, id };
    delete finalData._id;
    // axios
    //   .post("https://ecommerce1-server.vercel.app/wishlist", finalData)
    //   .then((response) => {
    //     if (response.data.insertedId) {
    //       toast.success("Successfully added to wishlist");
    //     }
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     toast.error("There was an error adding the data");
    //     console.log(error);
    //   });

    axios
      .post("https://ecommerce1-server.vercel.app/wishlist/check", {
        email: finalData.email,
        id: finalData.id,
      })
      .then((response) => {
        if (response.data.exists) {
          toast.error("Already in wishlist!");
        } else {
          axios
            .post("https://ecommerce1-server.vercel.app/wishlist", finalData, {
              credentials: "include",
            })
            .then((response) => {
              if (response.data.insertedId) {
                toast.success("You have successfully added to wishlist");
                refetch();
              }
            })
            .catch((error) => {
              console.log("Error inserting new data:", error);
            });
        }
      });
  };
  return wishPost;
};

export default useWishList;
