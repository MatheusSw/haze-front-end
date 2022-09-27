import React, { useEffect, useRef } from "react";
import { ReactComponent as WaterDropsIcon } from "../../icons/water-drops.svg";
import { ReactComponent as PlantIcon } from "../../icons/plant.svg";
import { PlantStage } from "../../types/enums/PlantStage";

interface ClusterCardProps {
  clusterId: string;
  clusterName: string;
  clusterStage: string | undefined;
  clusterLastWatered: string;
  clusterPlantsCount: number;
}

const cardBackgroundColors: string[] = [
  "bg-magenta",
  "bg-gold-brown",
  "bg-tifanny-blue",
  "bg-raisin-black",
  "bg-green-ryb",
];

const ClusterCard: React.FC<ClusterCardProps> = ({
  clusterId,
  clusterLastWatered,
  clusterName,
  clusterPlantsCount,
  clusterStage,
}) => {
  return (
    <div
      className={`flex w-52 flex-grow-0 flex-col justify-between gap-16 rounded-2xl ${
        cardBackgroundColors[
          Math.floor(Math.random() * cardBackgroundColors.length)
        ]
      } px-6 py-6`}
    >
      <div className="flex flex-col break-words text-white">
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
      <div className="flex flex-row gap-10 text-lg font-medium text-white">
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
