const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-4 py-2 rounded-full bg-yellow text-white hover:opacity-75 whitespace-nowrap max-w-32"
    >
      {children}
    </button>
  );
};

export default Button;
