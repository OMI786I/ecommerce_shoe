import React from "react";
import { useQuery } from "@tanstack/react-query";
const useDetailsFetch = (id, endPoint) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData", id],
    queryFn: () =>
      fetch(`http://localhost:5000/shoes/${id}`).then((res) => res.json()),
  });

  return { isPending, error, data, refetch };
};

export default useDetailsFetch;
