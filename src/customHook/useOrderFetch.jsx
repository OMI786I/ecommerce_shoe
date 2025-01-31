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
      fetch(
        `https://ecommerce1-server.vercel.app/order?email=${data[0]?.email}`,
        {
          credentials: "include",
        }
      ).then((res) => res.json()),
  });

  return { orderData, isPending, error, refetch };
};

export default useOrderFetch;
