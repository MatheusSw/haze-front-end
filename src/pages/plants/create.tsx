import { useLocation, useNavigate } from "react-router-dom";
import HistoryLocationState from "../../types/HistoryLocationState";
import { ReactComponent as GoBackArrowIcon } from "../../icons/right-arrow.svg";
import { ReactComponent as LoadingIcon } from "../../icons/refresh.svg";
import { useMutation, useQueryClient } from "react-query";
import PlantCreateRequest from "../../types/requests/plantCreateRequest";
import { useState } from "react";
import { Cluster } from "../../types/responses/clusters";
import ClusterIndexQuery from "../../queries/clustersIndexQuery";

const PlantsCreatePage: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    isLoading: clusterIsLoading,
    isError: clusterIsError,
    data: clusterData,
  } = ClusterIndexQuery();

  const location = useLocation();
  const navigate = useNavigate();

  const [targetCluster, setTargetCluster] = useState<Cluster>();
  const [plantStrain, setPlantStrain] = useState("");
  const [plantState, setPlantState] = useState("");
  const [plantClonedFrom, setPlantClonedFrom] = useState("");
  const [plantBirthDate, setPlantBirthDate] = useState(1);

  const plantMutation = useMutation(
    (newCluster: PlantCreateRequest) => {
      return fetch(
        `${process.env
          .REACT_APP_APIGATEWAY_URL!}/clusters/${targetCluster}/plants`,
        {
          method: "post",
          body: JSON.stringify(newCluster),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("plants");
      },
    }
  );

  const handleGoBackButton = () => {
    navigate(-1);
  };

  const handlePlantsCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    plantMutation.mutate({
      lifetime: plantBirthDate,
      state: plantState,
      strain: plantStrain,
      ...(plantClonedFrom && { cloned_from: plantClonedFrom }),
    });
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        {(location.state as HistoryLocationState)?.from && (
          <div>
            <button onClick={() => handleGoBackButton()}>
              <GoBackArrowIcon className="w-4 rotate-180 fill-gray-300 transition-colors hover:cursor-pointer hover:fill-gray-500" />
            </button>
          </div>
        )}
        <span className="text-2xl font-bold">Create new plant</span>
        {plantMutation.isError && (
          <div className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white">
            Uh Oh! There has been a problem, please try again later
          </div>
        )}
        {plantMutation.isSuccess && (
          <div className="rounded-lg bg-green-500 px-4 py-2 font-medium text-white">
            Plant created with success!
          </div>
        )}
        <form
          className="flex w-full max-w-lg flex-col gap-y-6"
          onSubmit={(e) => handlePlantsCreateSubmit(e)}
        >
          <div className="flex flex-col gap-6">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  htmlFor="grid-plant-target-cluster"
                >
                  Target cluster
                </label>
                <div className="relative">
                  <select
                    className="block w-full appearance-none rounded border border-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-plant-target-cluster"
                  >
                    {clusterIsLoading && <option>Loading</option>}
                    {clusterData?.map((cluster) => {
                      return <option>{cluster.name}</option>;
                    })}
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
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 md:w-1/2">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  htmlFor="grid-plant-strain"
                >
                  Strain
                </label>
                <input
                  className="mb-3 block w-full appearance-none rounded border py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                  id="grid-plant-strain"
                  type="text"
                  required={true}
                  placeholder="Purple haze"
                  value={plantStrain}
                  onChange={(e) => setPlantStrain(e.target.value)}
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  htmlFor="grid-plant-state"
                >
                  State
                </label>
                <div className="relative">
                  <select
                    className="block w-full appearance-none rounded border border-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-plant-state"
                    value={plantState}
                    onChange={(e) => setPlantState(e.target.value)}
                  >
                    {/*Map this from the enum instead of hard-coding*/}
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
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 md:mb-0">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  htmlFor="grid-plant-cloned-from"
                >
                  Cloned from <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <select
                    className="block w-full appearance-none rounded border border-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-plant-cloned-from"
                  >
                    <option></option>
                    {clusterIsLoading && <option>Loading</option>}
                    {clusterData?.map((cluster) => {
                      return <option>{cluster.name}</option>;
                    })}
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
            {plantMutation.isLoading && (
              <LoadingIcon className="h-5 w-5 animate-spin fill-white" />
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default PlantsCreatePage;
