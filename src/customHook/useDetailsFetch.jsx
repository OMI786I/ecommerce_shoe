import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
const useDetailsFetch = (id) => {
  const [endPoint, setEndPoint] = useState("shoes");

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData", id],
    queryFn: () =>
      fetch(`http://localhost:5000/${endPoint}/${id}`).then((res) =>
        res.json()
      ),
  });
  useEffect(() => {
    if (!data) {
      setEndPoint("bags");
    }
  }, [data]);

  return { isPending, error, data, refetch };
};

export default useDetailsFetch;
