import { NavLink } from "react-router-dom";

interface NavButtonProps {
  iconSrc: string;
  to: string;
  text?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ iconSrc, to, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-md flex items-center px-4 py-3 font-semibold transition-colors duration-300 ${
          isActive ? "w-full rounded-xl bg-white" : "rounded-full"
        }`
      }
    >
      <div className="flex flex-shrink-0 flex-row items-center">
        <img src={iconSrc} alt="Menu item icon" className="h-5 w-5" />
        {text && (
          <span className="ml-4 text-gray-800 transition-all duration-200">
            {text}
          </span>
        )}
      </div>
    </NavLink>
  );
};

export default NavButton;
