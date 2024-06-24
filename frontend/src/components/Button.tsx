const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button onClick={onClick} className="ml-3 p-3 rounded-full bg-yellow text-white hover:opacity-75">
      {children}
    </button>
  );
};

export default Button;
