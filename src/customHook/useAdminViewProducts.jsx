import { useQuery } from "@tanstack/react-query";

const useAdminViewProducts = ({ endPoint }) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData", endPoint],
    queryFn: () =>
      fetch(`http://localhost:5000/${endPoint}`).then((res) => res.json()),
  });

  return { isPending, error, data, refetch };
};

export default useAdminViewProducts;
