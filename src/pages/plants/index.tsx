import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button";

const PlantsIndexPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreatePlantButton = () => {
    navigate("create", {
      state: { from: "index" },
    });
  };

  return (
    <div className="flex flex-col gap-y-6">
      <div>
        <Button
          type="button"
          text="Create new plant"
          onClick={() => handleCreatePlantButton()}
        />
      </div>
    </div>
  );
};

export default PlantsIndexPage;
