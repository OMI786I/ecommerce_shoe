import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthProvider";
const useWishListFetch = () => {
  const { user } = useContext(AuthContext);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [fetchData, setFetchData] = useState();
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["wishlist", user?.email, page, limit],
    queryFn: () =>
      fetch(
        `https://ecommerce1-server.vercel.app/wishlist?email=${user.email}&page=${page}&limit=${limit}`,
        {
          credentials: "include",
        }
      ).then((res) => res.json()),
  });
  console.log(data);
  useEffect(() => {
    if (data) {
      setCount(data.totalItems);
      setFetchData(data.items);
    }
    if (!user) {
      setCount(0);
    }
  }, [data, user]);

  return {
    isPending,
    error,
    count,
    fetchData,
    refetch,
    setLimit,
    limit,
    setPage,
    page,
  };
};

export default useWishListFetch;
