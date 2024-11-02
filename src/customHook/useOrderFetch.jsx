import { useQuery } from "@tanstack/react-query";
import useUserFetch from "./useUserFetch";

const useOrderFetch = () => {
  const { data } = useUserFetch();
  const {
    isPending,
    error,
    data: orderData,
    refetch,
  } = useQuery({
    queryKey: ["repoData", data?.[0]?.email],
    queryFn: () =>
      fetch(`http://localhost:5000/order?email=${data[0]?.email}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return { orderData, isPending, error, refetch };
};

export default useOrderFetch;
