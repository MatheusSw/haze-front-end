import { useLocation, useNavigate } from "react-router-dom";
import HistoryLocationState from "../../types/HistoryLocationState";
import { ReactComponent as GoBackArrowIcon } from "../../icons/right-arrow.svg";
import { ReactComponent as LoadingIcon } from "../../icons/refresh.svg";

const PlantsCreatePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBackButton = () => {
    navigate(-1);
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
      </div>
    </>
  );
};

export default PlantsCreatePage;
