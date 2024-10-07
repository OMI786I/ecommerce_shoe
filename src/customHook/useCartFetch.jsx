import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useCartFetch = () => {
  const { user } = useContext(AuthContext);
  const [price, setPrice] = useState(0);
  const [count2, setCount2] = useState(0);
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`http://localhost:5000/cart?email=${user.email}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });
  useEffect(() => {
    if (data) {
      const price = data.reduce((a, v) => (a = a + v.price), 0);
      setPrice(price);
      setCount2(data.length);
      console.log(price);
    }
    if (!user) {
      setCount2(0);
    }
  }, [data, user]);

  return { data, error, isPending, refetch, count2, price };
};

export default useCartFetch;
