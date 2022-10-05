interface ButtonProps {
  text: string;
}

const Button: React.FC<
  ButtonProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ type, text, ...rest }) => {
  return (
    <input
      type={type ?? "button"}
      value={text}
      className="rounded-lg bg-black px-4 py-2 text-white transition-colors duration-500 hover:cursor-pointer hover:bg-haze-green"
      {...rest}
    />
  );
};
export default Button;
