import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useHistoryFetch = () => {
  const { user } = useContext(AuthContext);
  console.log(user.email);
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        `https://ecommerce1-server.vercel.app/history?customer_email=${user.email}`,
        {
          credentials: "include",
        }
      ).then((res) => res.json()),
  });

  return { data, error, isPending };
};

export default useHistoryFetch;
