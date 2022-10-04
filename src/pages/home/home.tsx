import React, { useState } from "react";
import { useQueries, useQuery } from "react-query";
import ClusterCard from "../../components/cluster-card/clustercard";
import { Cluster } from "../../types/responses/clusters";
import { ReactComponent as LoadingIcon } from "../../icons/loading.svg";
import { ReactComponent as AlertIcon } from "../../icons/alert.svg";
import { ReactComponent as PlantIcon } from "../../icons/plant.svg";
import { ReactComponent as GreenhouseIcon } from "../../icons/networking.svg";
import { Measurement } from "../../types/responses/measurement";

const Home: React.FC = () => {
  const {
    isLoading: clusterIsLoading,
    isError: clusterIsError,
    data: clusterData,
  } = useQuery<Cluster[]>(
    ["clusters"],
    async () => {
      const response = await fetch(process.env.REACT_APP_CLUSTERS_INDEX_URL!);
      return await response.json();
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
        onSuccess(data: Measurement[]) {
          const cluster = clusterData.find(
            (cluster) => cluster.id === data[0].id
          );
          if (!cluster) {
            return;
          }
          cluster!.measurements = data;
        },
      };
    }) ?? []
  );

  return (
    <div className="flex flex-col rounded-3xl bg-white px-14 py-16">
      <div className="mb-6 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-bold text-gray-800">
            Hey Joe, how are you?
          </span>
          <span className="text-md text-gray-400">
            What are you doing today?
          </span>
        </div>
        <div className="flex gap-32">
          <div className="flex items-center gap-4">
            <div className="flex-grow-0 rounded-md bg-gray-100 p-3">
              <AlertIcon className="w-6 fill-red-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">0</span>
              <span className="text-sm text-gray-400">clusters in alert</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-grow-0 rounded-md bg-gray-100 p-3">
              <GreenhouseIcon className="w-6 fill-green-ryb" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">
                {clusterData?.length ?? 0}
              </span>
              <span className="text-sm text-gray-400">clusters</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-grow-0 rounded-md bg-gray-100 p-3">
              <PlantIcon className="w-6 fill-haze-green" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">12</span>
              <span className="text-sm text-gray-400">plants</span>
            </div>
          </div>
        </div>
        <hr></hr>
      </div>
      <div className="gap-4">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold">Clusters</span>
          {clusterIsLoading ||
          measurementsQueries.length === 0 ||
          measurementsQueries.filter((query) => query.isLoading).length > 0 ? (
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
                    humidity={cluster.measurements
                      ?.find((m) => m.type === "humidity")
                      ?.reading.toFixed(0)}
                    temperature={cluster.measurements
                      ?.find((m) => m.type === "temperature")
                      ?.reading.toFixed(0)}
                    clusterStage={cluster.state}
                    key={cluster.id}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
