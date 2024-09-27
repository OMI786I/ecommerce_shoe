import React from "react";
import { useQuery } from "@tanstack/react-query";
const usePublicFetch = ({ endPoint, query }) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData", query],
    queryFn: () =>
      fetch(`http://localhost:5000/${endPoint}?type=${query}`).then((res) =>
        res.json()
      ),
  });

  return { isPending, error, data, refetch };
};

export default usePublicFetch;
