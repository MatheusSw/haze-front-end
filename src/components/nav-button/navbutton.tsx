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
      className="flex items-center rounded-full py-3 px-4 transition-colors duration-300 text-md"
    >
      <div className="flex flex-row flex-shrink-0 items-center">
        <img src={iconSrc} alt="Menu item icon" className="w-5 h-5" />
        {text && (
          <span className="ml-4 text-gray-800 hover:text-haze-green hover:font-semibold transition-all duration-200">{text}</span>
        )}
      </div>
    </NavLink>
  );
};

export default NavButton;