interface NavGroupProps {
  heading: string,
  children: JSX.Element,
}

const NavGroup: React.FC<NavGroupProps> = ({ heading, children }) => {
  return (
    <div>
      <div className="text-gray-800 text-lg font-semibold mb-6">{heading}</div>
      {children}
    </div>
  );
};

export default NavGroup;