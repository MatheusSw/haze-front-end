import { useQuery } from "react-query";
import { Cluster } from "../types/responses/clusters";

export const clusterIndexFetch = async () => {
  const response = await fetch(process.env.REACT_APP_CLUSTERS_INDEX_URL!);
  return await response.json();
};

export function ClusterIndexQuery() {
  return useQuery<Cluster[]>(["clusters"], clusterIndexFetch, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}

export default ClusterIndexQuery;
