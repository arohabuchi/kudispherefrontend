

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
}

const Button: React.FC<ButtonProps> = ({
  size = "md",
  variant = "solid",
  className = "",
  children,
  ...props
}) => {
  const sizeClasses =
    size === "sm"
      ? "px-4 py-2.5 text-sm"
      : size === "lg"
      ? "px-6 py-3 text-lg"
      : "px-5 py-2.5 text-base";

  const variantClasses =
    variant === "outline"
      ? "border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-100"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button
      {...props}
      className={`rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
