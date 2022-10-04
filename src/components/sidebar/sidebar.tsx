import { ReactComponent as Logo } from "../../logo.svg";
import HouseIcon from "../../icons/house.svg";
import PlantIcon from "../../icons/plant.svg";
import LifelineIcon from "../../icons/pulse.svg";
import NavButton from "../nav-button/navbutton";
import ProfileCard from "../profile-card/profilecard";

const Sidebar: React.FC = () => {
  return (
    <div className="m-6 flex flex-col gap-24 rounded-3xl bg-white/30 p-12">
      <div className="col-span-1 flex items-center gap-2" aria-colspan={1}>
        <Logo className="mr-4 w-10" />
        <span className="text-2xl font-bold text-gray-800">Haze</span>
      </div>
      {/*TODO actually use this when users get implemented*/}
      <div className="flex flex-col gap-6">
        <NavButton iconSrc={HouseIcon} to="/" text="Home" />
        <NavButton iconSrc={PlantIcon} to="/clusters" text="Clusters" />
        <NavButton iconSrc={LifelineIcon} to="/monitoring" text="Monitoring" />
      </div>
    </div>
  );
};

export default Sidebar;
