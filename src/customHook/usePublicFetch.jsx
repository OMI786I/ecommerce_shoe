import React from "react";
import { useQuery } from "@tanstack/react-query";
const usePublicFetch = ({ endPoint, query, min, max, sort, page, limit }) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData", query, min, max, sort, page, limit],
    queryFn: () =>
      fetch(
        `http://localhost:5000/${endPoint}?type=${query}&minPrice=${min}&maxPrice=${max}&sortOrder=${sort}&page=${page}&limit=${limit}`
      ).then((res) => res.json()),
  });

  return { isPending, error, data, refetch, sort, limit, page, min, max };
};

export default usePublicFetch;
