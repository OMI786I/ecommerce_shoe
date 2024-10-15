import { useQuery } from "@tanstack/react-query";

const useAdminViewProducts = ({ endPoint, limit }) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData", endPoint, limit],
    queryFn: () =>
      fetch(`http://localhost:5000/${endPoint}?limit=${limit}`).then((res) =>
        res.json()
      ),
  });

  return { isPending, error, data, refetch };
};

export default useAdminViewProducts;
