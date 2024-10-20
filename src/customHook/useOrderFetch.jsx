import { useQuery } from "@tanstack/react-query";
import useUserFetch from "./useUserFetch";
import { useState } from "react";

const useOrderFetch = () => {
  const { data } = useUserFetch();
  const {
    isPending,
    error,
    data: orderData,
  } = useQuery({
    queryKey: ["repoData", data?.[0]?.email],
    queryFn: () =>
      fetch(`http://localhost:5000/order?email=${data[0]?.email}`).then((res) =>
        res.json()
      ),
  });

  return { orderData, isPending, error };
};

export default useOrderFetch;
