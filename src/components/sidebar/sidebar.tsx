import { ReactComponent as Logo } from "../../logo.svg";
import AddIcon from "../../icons/add.svg";
import HouseIcon from "../../icons/house.svg";
import AlertIcon from "../../icons/alert.svg";
import PulseLineIcon from "../../icons/pulse-line.svg";
import NavButton from "../nav-button/navbutton";
import NavGroup from "../nav-group/navgroup";

const Sidebar: React.FC = () => {
  return (
    <div className="m-4 flex flex-col gap-24 rounded-3xl bg-white p-12">
      <div className="col-span-1 flex items-center gap-2" aria-colspan={1}>
        <Logo className="mr-4 w-10" />
        <span className="text-2xl font-bold text-gray-800">Haze</span>
      </div>
      <div className="flex flex-col gap-10">
        <NavButton iconSrc={HouseIcon} to="/" text="Home" />
        <div className="flex flex-col gap-20">
          <NavGroup heading="Clusters">
            <nav aria-label="ClustersMenu" className="flex flex-col gap-4">
              <NavButton
                iconSrc={AddIcon}
                to="clusters/create"
                text="Add new cluster"
              />
              <NavButton
                iconSrc={PulseLineIcon}
                to="clusters"
                text="Active Clusters"
              />
            </nav>
          </NavGroup>
          <NavGroup heading="Monitoring">
            <nav aria-label="MonitoringMenu">
              <NavButton
                iconSrc={AddIcon}
                to="alerts/create"
                text="Add new alert"
              />
              <NavButton
                iconSrc={AlertIcon}
                to="alerts"
                text="Clusters in alert"
              />
            </nav>
          </NavGroup>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
