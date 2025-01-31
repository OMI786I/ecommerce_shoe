import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useCartFetch = () => {
  const { user } = useContext(AuthContext);
  const [price, setPrice] = useState(0);
  const [count2, setCount2] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [fetchData, setFetchData] = useState();

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData", page, limit],
    queryFn: () =>
      fetch(
        `https://ecommerce1-server.vercel.app/cart?email=${user.email}&page=${page}&limit=${limit}`,
        {
          credentials: "include",
        }
      ).then((res) => res.json()),
  });
  useEffect(() => {
    if (data) {
      const totalPrice = data.totalPrice;
      setFetchData(data.items);
      setPrice(totalPrice);
      setCount2(data.totalItems);
      console.log(totalPrice);
    }
    if (!user) {
      setCount2(0);
    }
  }, [data, user, price]);
  return {
    fetchData,
    setPage,
    setLimit,
    error,
    isPending,
    refetch,
    count2,
    price,
    limit,
    page,
  };
};

export default useCartFetch;
