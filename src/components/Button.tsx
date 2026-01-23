import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  type?: "yellow" | "purple" | "primary" | "secondary" | "blue" | "green";
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled = false,
  type = "primary",
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md text-white w-full ${
        type === "secondary"
          ? "btn-primary hover:bg-gray-600"
          : type === "yellow"
            ? "btn-yellow hover:bg-yellow-700"
            : type === "purple"
              ? "btn-purple hover:bg-purple-700"
              : type === "blue"
                ? "btn-blue hover:bg-blue-700"
                : type === "green"
                  ? "btn-green hover:bg-green-700"
                  : disabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {text}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
