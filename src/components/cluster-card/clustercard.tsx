import React, { useEffect, useRef } from "react";
import { ReactComponent as WaterDropsIcon } from "../../icons/water-drops.svg";
import { ReactComponent as PlantIcon } from "../../icons/plant.svg";
import { PlantStage } from "../../types/enums/PlantStage";
import { CardsBackgroundColors } from "../../types/cards-colors";

interface ClusterCardProps {
  clusterId: string;
  clusterName: string;
  clusterStage: string | undefined;
  clusterLastWatered: string;
  clusterPlantsCount: number;
}

const ClusterCard: React.FC<ClusterCardProps> = ({
  clusterId,
  clusterLastWatered,
  clusterName,
  clusterPlantsCount,
  clusterStage,
}) => {
  return (
    <div
      className={`flex w-52 flex-grow-0 flex-col justify-between gap-16 rounded-2xl bg-black px-6 py-6 text-white`}
    >
      <div className="flex flex-col break-words">
        <span className="text-md font-medium">#{clusterId}</span>
        <span className="max-h-24 overflow-hidden text-2xl font-bold">
          {clusterName}
        </span>
        {clusterStage && (
          <span className="text-md font-medium">
            {clusterStage.charAt(0).toUpperCase() + clusterStage.slice(1)}
          </span>
        )}
      </div>
      <div className="flex flex-row gap-10 text-lg font-medium">
        <div className="flex items-center gap-2">
          <WaterDropsIcon className="h-6 w-6 fill-white" />
          <span>{clusterLastWatered}</span>
        </div>
        <div className="flex items-center gap-2">
          <PlantIcon className="h-6 w-6 fill-white" />
          <span>{clusterPlantsCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ClusterCard;
