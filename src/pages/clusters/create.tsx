import { useLocation, useNavigate } from "react-router-dom";
import ClustersLocationState from "../../types/ClustersLocationState";
import { ReactComponent as GoBackArrowIcon } from "../../icons/right-arrow.svg";
import Button from "../../components/button/button";

const ClusterCreate: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBackButton = () => {
    navigate(-1);
  };
  return (
    <div className="flex flex-col gap-10">
      {(location.state as ClustersLocationState)?.from && (
        <div>
          <button onClick={() => handleGoBackButton()}>
            <GoBackArrowIcon className="w-4 rotate-180 fill-gray-300 transition-colors hover:cursor-pointer hover:fill-gray-500" />
          </button>
        </div>
      )}
      <span className="text-2xl font-bold">Create a new cluster</span>
      <form className="flex w-full max-w-lg flex-col gap-y-6">
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

        <Button text="Create" type="submit" />
      </form>
    </div>
  );
};

export default ClusterCreate;
