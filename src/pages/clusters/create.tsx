import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as GoBackArrowIcon } from "../../icons/right-arrow.svg";
import { ReactComponent as LoadingIcon } from "../../icons/refresh.svg";
import { useState } from "react";
import { useMutation } from "react-query";
import ClusterCreateRequest from "../../types/requests/clusterCreate";
import HistoryLocationState from "../../types/HistoryLocationState";
import { useQueryClient } from "react-query";

const ClusterCreate: React.FC = () => {
  const queryClient = useQueryClient();

  const clusterMutation = useMutation(
    (newCluster: ClusterCreateRequest) => {
      return fetch(`${process.env.REACT_APP_APIGATEWAY_URL!}/clusters`, {
        method: "post",
        body: JSON.stringify(newCluster),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("clusters");
        queryClient.invalidateQueries("measurements");
      },
    }
  );

  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBackButton = () => {
    navigate(-1);
  };

  const handleClusterCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    clusterMutation.mutate({
      name: clusterName,
      location: clusterLocation,
      ...(clusterState && { state: clusterState.toLowerCase() }),
    });
    e.preventDefault();
  };

  const [clusterName, setClusterName] = useState("");
  const [clusterLocation, setClusterLocation] = useState("");
  const [clusterState, setClusterState] = useState("");

  return (
    <div className="flex flex-col gap-10">
      {(location.state as HistoryLocationState)?.from && (
        <div>
          <button onClick={() => handleGoBackButton()}>
            <GoBackArrowIcon className="w-4 rotate-180 fill-gray-300 transition-colors hover:cursor-pointer hover:fill-gray-500" />
          </button>
        </div>
      )}
      <span className="text-2xl font-bold">Create a new cluster</span>
      {clusterMutation.isError && (
        <div className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white">
          Uh Oh! There has been a problem, please try again later
        </div>
      )}
      {clusterMutation.isSuccess && (
        <div className="rounded-lg bg-green-500 px-4 py-2 font-medium text-white">
          Cluster created with success!
        </div>
      )}
      <form
        className="flex w-full max-w-lg flex-col gap-y-6"
        onSubmit={(e) => handleClusterCreateSubmit(e)}
      >
        <div>
          <div className="-mx-3 mb-6 flex flex-wrap">
            <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="grid-cluster-name"
              >
                Name
              </label>
              <input
                className="mb-3 block w-full appearance-none rounded border py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="grid-cluster-name"
                type="text"
                placeholder="Big boy"
                value={clusterName}
                onChange={(e) => setClusterName(e.target.value)}
              />
            </div>
            <div className="w-full px-3 md:w-1/2">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="grid-cluster-location"
              >
                Location
              </label>
              <input
                className="block w-full appearance-none rounded border border-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="grid-cluster-location"
                type="text"
                placeholder="Garage"
                value={clusterLocation}
                onChange={(e) => setClusterLocation(e.target.value)}
              />
            </div>
          </div>
          <div className="-mx-3 mb-2 flex flex-wrap">
            <div className="mb-6 w-full px-3 md:mb-0">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="grid-cluster-state"
              >
                State <span className="text-gray-200">(optional)</span>
              </label>
              <div className="relative">
                <select
                  className="block w-full appearance-none rounded border border-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="grid-cluster-state"
                  value={clusterState}
                  onChange={(e) => setClusterState(e.target.value)}
                >
                  <option></option>
                  <option>Germination</option>
                  <option>Seedling</option>
                  <option>Vegetative</option>
                  <option>Flowering</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-x-4 rounded-lg bg-black px-4 py-2 text-white transition-colors duration-500 hover:cursor-pointer hover:bg-haze-green"
        >
          Create
          {clusterMutation.isLoading && (
            <LoadingIcon className="h-5 w-5 animate-spin fill-white" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ClusterCreate;
