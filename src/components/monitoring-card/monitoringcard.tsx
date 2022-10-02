import { CardsBackgroundColors } from "../../types/cards-colors";
import { ReactComponent as ThermometerIcon } from "../../icons/thermometer.svg";
import { ReactComponent as HumidityIcon } from "../../icons/humidity.svg";

interface MonitoringCardProps {
  heading: string;
  temperature: string;
  humidity: string;
}

const MonitoringCard: React.FC<MonitoringCardProps> = ({
  heading,
  temperature,
  humidity,
}) => {
  return (
    <div
      className={`flex gap-6 rounded-2xl bg-black px-6 py-3 text-lg text-white`}
    >
      <span className="font-medium">{heading}</span>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <ThermometerIcon className="w-6 fill-white" />
          <span className="text-sm font-medium">{temperature}°</span>
        </div>
        <div className="flex items-center  gap-1">
          <HumidityIcon className="w-6 fill-white" />
          <span className="text-sm font-medium">{humidity}%</span>
        </div>
      </div>
    </div>
  );
};

export default MonitoringCard;
