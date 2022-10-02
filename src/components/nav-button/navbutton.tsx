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
      className="text-md flex items-center rounded-full py-3 transition-colors duration-300"
    >
      <div className="flex flex-shrink-0 flex-row items-center">
        <img src={iconSrc} alt="Menu item icon" className="h-5 w-5" />
        {text && (
          <span className="ml-4 text-gray-800 transition-all duration-200 hover:font-semibold hover:text-haze-green">
            {text}
          </span>
        )}
      </div>
    </NavLink>
  );
};

export default NavButton;
