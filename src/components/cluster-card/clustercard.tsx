import React from "react";
import { ReactComponent as WaterDropsIcon } from "../../icons/water-drops.svg";
import { ReactComponent as PlantIcon } from "../../icons/plant.svg";
import { ReactComponent as HumidityIcon } from "../../icons/humidity.svg";
import { ReactComponent as ThermometerIcon } from "../../icons/thermometer.svg";
import format from "date-fns/format";

interface ClusterCardProps {
  clusterId: string;
  clusterName: string;
  clusterStage: string | undefined;
  clusterLastWatered: string;
  clusterPlantsCount: number;
  temperature?: string;
  humidity?: string;
  measurementLastUpdated?: string;
}

const ClusterCard: React.FC<ClusterCardProps> = ({
  clusterId,
  clusterLastWatered,
  clusterName,
  clusterPlantsCount,
  clusterStage,
  humidity,
  temperature,
  measurementLastUpdated,
}) => {
  return (
    <div
      className={`flex w-60 flex-grow-0 flex-col justify-between gap-16 rounded-2xl border px-6 py-6`}
    >
      <div className="flex flex-col break-words">
        <span className="text-sm font-medium text-gray-300">#{clusterId}</span>
        <span className="max-h-24 overflow-hidden text-2xl font-bold">
          {clusterName}
        </span>
        {clusterStage && (
          <span className="text-sm font-medium">
            {clusterStage.charAt(0).toUpperCase() + clusterStage.slice(1)}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-y-4">
        {measurementLastUpdated && (
          <div className="rounded-lg bg-gray-100 p-2 text-sm font-medium">
            {format(new Date(), "dd/MM/yyyy kk:mm:ss")}
          </div>
        )}
        {(!humidity || !temperature) && (
          <div className="col-span-2 rounded-xl bg-red-500 p-2 text-xs text-white">
            No measurements found
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 ">
          {humidity && (
            <div className="flex flex-shrink-0 flex-grow-0 items-center gap-2">
              <HumidityIcon className="w-5 fill-haze-green" />
              <span className="font-medium text-haze-green">{humidity}%</span>
            </div>
          )}
          {temperature && (
            <div className="flex items-center gap-2">
              <ThermometerIcon className="w-5 fill-haze-green" />
              <span className="font-medium text-haze-green">
                {temperature}°C
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <WaterDropsIcon className="w-5" />
            <span>{clusterLastWatered}</span>
          </div>
          <div className="flex items-center gap-2">
            <PlantIcon className="w-5" />
            <span>{clusterPlantsCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClusterCard;
