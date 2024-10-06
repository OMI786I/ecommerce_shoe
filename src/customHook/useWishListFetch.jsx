import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthProvider";
const useWishListFetch = () => {
  const { user } = useContext(AuthContext);
  const [count, setCount] = useState(0);
  const [fetchData, setFetchData] = useState();
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: () =>
      fetch(`http://localhost:5000/wishlist?email=${user.email}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });
  useEffect(() => {
    if (data) {
      const count = data.length;
      setCount(count);
      setFetchData(data);
    }
    if (!user) {
      setCount(0);
    }
  }, [data, user]);

  return { isPending, error, count, fetchData, refetch };
};

export default useWishListFetch;
