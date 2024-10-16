import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  // /user/admin/:email
  const {
    isPending: isAdminLoading,
    error,
    data: isAdmin,
  } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/user/admin/${user.email}`,
        {
          withCredentials: true,
        }
      );
      return res.data?.admin;
    },
  });
  //`http://localhost:5000/user/admin/${user.email}`
  console.log(isAdmin);
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
