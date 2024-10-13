import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useUserFetch = () => {
  const { user } = useContext(AuthContext);

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: () =>
      fetch(`http://localhost:5000/user?email=${user.email}`, {
        credentials: "include",
      }).then((res) => res.json()),
    enabled: !!user?.email,
  });
  return { isPending, error, data, refetch };
};

export default useUserFetch;
