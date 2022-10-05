import { useQueries, useQuery } from "react-query";
import { Cluster } from "../../types/responses/clusters";
import { ReactComponent as LoadingIcon } from "../../icons/loading.svg";
import ClusterCard from "../../components/cluster-card/clustercard";
import { Measurement } from "../../types/responses/measurement";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button";

const Clusters: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateClusterButton = () => {
    navigate("create", {
      state: { from: "index" },
    });
  };

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
    <div className="flex flex-col gap-y-6">
      <div>
        <Button
          text="Create a new cluster"
          onClick={() => handleCreateClusterButton()}
        />
      </div>
      <div className="flex flex-col gap-4">
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
  );
};

export default Clusters;
