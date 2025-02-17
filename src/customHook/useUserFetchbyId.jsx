import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useUserFetchbyId = (id) => {
  const { user } = useContext(AuthContext);

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: () =>
      fetch(`https://ecommerce1-server.vercel.app/user/${id}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return { isPending, error, data, refetch };
};

export default useUserFetchbyId;
