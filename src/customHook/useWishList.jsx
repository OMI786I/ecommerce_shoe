import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";

const useWishList = () => {
  const { user } = useContext(AuthContext);

  const wishPost = (res) => {
    const email = user.email;
    const id = res._id;
    const finalData = { ...res, email, id };
    delete finalData._id;
    axios
      .post("http://localhost:5000/wishlist", finalData)
      .then((response) => {
        if (response.data.insertedId) {
          toast.success("Successfully added to wishlist");
        }
        console.log(response);
      })
      .catch((error) => {
        toast.error("There was an error adding the data");
        console.log(error);
      });
  };
  return wishPost;
};

export default useWishList;
