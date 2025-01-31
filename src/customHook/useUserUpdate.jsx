import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useUserUpdate = () => {
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState(false);
  const update = (id, submitData) => {
    axios
      .patch(`https://ecommerce1-server.vercel.app/user/${id}`, submitData)
      .then((response) => {
        if (response.data.modifiedCount > 0) {
          toast.success("You have successfully updated");
          setUpdateData(true);
        }
        navigate("/dashboard/user");
      })
      .catch((error) => {
        toast.error("There was an error updated the data");
        console.log(error);
      });
  };

  return { update, updateData };
};

export default useUserUpdate;
