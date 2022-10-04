import React from "react";
import { useQueries, useQuery } from "react-query";
import ClusterCard from "../../components/cluster-card/clustercard";
import { Cluster } from "../../types/responses/clusters";
import { ReactComponent as LoadingIcon } from "../../icons/loading.svg";
import MonitoringCard from "../../components/monitoring-card/monitoringcard";
import { Measurement } from "../../types/responses/measurement";

const Home: React.FC = () => {
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

  const measurementsQueries = useQueries(
    clusterData?.map((cluster) => {
      return {
        queryKey: [`measurement-${cluster.id}`],
        queryFn: async () => {
          var response = await fetch(
            `${process.env.REACT_APP_APIGATEWAY_URL}/clusters/${cluster.id}/measurements`
          );
          var measurement: Measurement[] = await response.json();
          return measurement;
        },
        refetchOnWindowFocus: false,
        retry: false,
      };
    }) ?? []
  );

  return (
    <div className="mx-16 my-16 flex h-full flex-col gap-12 rounded-3xl bg-white py-16 px-14">
      {/*Add search bar*/}
      <div className="flex flex-col gap-2">
        <span className="text-4xl font-bold text-gray-800">
          Hey Joe, how are you?
        </span>
        <span className="text-md text-gray-400">What are you doing today?</span>
        <hr className="mt-6"></hr>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <div className="col-span-4 flex flex-col gap-4" aria-colspan={4}>
          <span className="text-2xl font-bold">Clusters</span>
          {clusterIsLoading ? (
            <div className="flex items-center justify-center gap-4">
              <span className="font-bold">Loading</span>
              <LoadingIcon className="w-4 animate-spin fill-black" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-10">
              {clusterData?.map((cluster) => {
                return (
                  <ClusterCard
                    clusterId={cluster.id.slice(0, 8)}
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
        <div className="col-span-1 flex flex-col gap-4" aria-colspan={1}>
          <span className="text-2xl font-bold"> Monitoring</span>
          <div className="flex gap-10">
            {measurementsQueries
              .filter((query) => query.isSuccess && query.data)
              .map((measurement) => {
                return (
                  <MonitoringCard
                    key={measurement.data![0].id}
                    humidity={(+measurement.data!.find(
                      (m) => m.type === "humidity"
                    )!.reading).toFixed(2)}
                    temperature={(+measurement.data!.find(
                      (m) => m.type === "temperature"
                    )!.reading).toFixed(2)}
                    heading={
                      clusterData?.find((c) => c.id === measurement.data![0].id)
                        ?.name!
                    }
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
