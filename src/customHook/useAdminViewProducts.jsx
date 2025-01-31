import { useQuery } from "@tanstack/react-query";

const useAdminViewProducts = ({ endPoint, limit }) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData", endPoint, limit],
    queryFn: () =>
      fetch(
        `https://ecommerce1-server.vercel.app/${endPoint}?limit=${limit}`
      ).then((res) => res.json()),
  });

  return { isPending, error, data, refetch };
};

export default useAdminViewProducts;
