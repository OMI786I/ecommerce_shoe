import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useHistoryFetch = () => {
  const { user } = useContext(AuthContext);
  console.log(user.email);
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`http://localhost:5000/history?customer_email=${user.email}`).then(
        (res) => res.json()
      ),
  });

  return { data, error, isPending };
};

export default useHistoryFetch;
