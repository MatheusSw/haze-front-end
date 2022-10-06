import { useQueries, useQuery } from "react-query";
import { Cluster } from "../../types/responses/clusters";
import { ReactComponent as LoadingIcon } from "../../icons/loading.svg";
import ClusterCard from "../../components/cluster-card/clustercard";
import { Measurement } from "../../types/responses/measurement";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import clusterIndexQuery, {
  ClusterIndexQuery,
} from "../../queries/clustersIndexQuery";
import MeasurementIndexQuery from "../../queries/measurementsIndexQuery";

const ClustersPage: React.FC = () => {
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
  } = ClusterIndexQuery();

  const measurementsQueries = useQueries(
    clusterData?.map((cluster) => {
      return {
        queryKey: ["measurements", { cluster: cluster.id }],
        queryFn: MeasurementIndexQuery(cluster.id),
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
        staleTime: 10000,
      };
    }) ?? []
  );

  return (
    <div className="flex flex-col gap-y-6">
      <div>
        <Button
          text="Create new cluster"
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

export default ClustersPage;
