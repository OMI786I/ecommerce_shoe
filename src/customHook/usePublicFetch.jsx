import React from "react";
import { useQuery } from "@tanstack/react-query";
const usePublicFetch = ({ endPoint, query, min, max }) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData", query, min, max],
    queryFn: () =>
      fetch(
        `http://localhost:5000/${endPoint}?type=${query}&minPrice=${min}&maxPrice=${max}`
      ).then((res) => res.json()),
  });
  //http://localhost:5000/accessories?type=wallet&minPrice=40&maxPrice=50
  return { isPending, error, data, refetch };
};

export default usePublicFetch;
