import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useReviewFetch = () => {
  const { user } = useContext(AuthContext);

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData", user],
    queryFn: () =>
      fetch(`http://localhost:5000/review?email=${user.email}`).then((res) =>
        res.json()
      ),
  });

  return { isPending, error, data };
};

export default useReviewFetch;
