import React from "react";
import { useQuery } from "react-query";
import ClusterCard from "../components/cluster-card/clustercard";
import Sidebar from "../components/sidebar/sidebar";
import { Cluster } from "../types/responses/clusters";
import { ReactComponent as LoadingIcon } from "../icons/loading.svg";

const Layout: React.FC = () => {
  const {
    isLoading: clusterIsLoading,
    isError: clusterIsError,
    data: clusterData,
  } = useQuery<Cluster[]>(
    ["clusters"],
    async () => {
      const res = await fetch(process.env.REACT_APP_CLUSTERS_INDEX_URL!);
      return await res.json();
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="grid min-h-screen w-full grid-cols-6 subpixel-antialiased">
      <Sidebar />
      <main
        className="col-span-5 flex flex-col gap-20 px-8 pt-20"
        aria-colspan={5}
      >
        {/*Add search bar*/}
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-bold text-gray-800">
            Hey Joe, how are you?
          </span>
          <span className="text-md font-medium text-gray-700">
            What are you doing today?
          </span>
        </div>
        <div className="grid grid-cols-5">
          <div className="col-span-4 flex flex-col gap-4" aria-colspan={4}>
            <span className="text-lg font-semibold text-gray-700">
              Clusters
            </span>
            {clusterIsLoading ? (
              <div className="flex items-center justify-center gap-4">
                <span className="font-bold">Loading</span>
                <LoadingIcon className="w-4 animate-spin fill-black" />
              </div>
            ) : (
              <div className="flex gap-10">
                {clusterData?.map((cluster) => {
                  console.log(cluster);
                  return (
                    <ClusterCard
                      clusterId={cluster.id.split("cluster-")[1].slice(0, 8)}
                      clusterLastWatered="1d"
                      clusterName={cluster.location}
                      clusterPlantsCount={4}
                      clusterStage={cluster.state}
                      key={cluster.id}
                    />
                  );
                })}
              </div>
            )}
          </div>
          <div className="col-span-1" aria-colspan={1}>
            <span className="text-lg font-semibold text-gray-700">
              Monitoring
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
