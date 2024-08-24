import React from "react";

type buttonProps = {
  children: React.ReactNode;
  type?: string;
  onClick?: () => void;
  className?: string;
};

function Button({
  children,
  type = "primary",
  onClick,
  className,
}: buttonProps) {
  return (
    <button
      className={`font-semibold rounded-md p-3 items-center flex gap-2 transition-all duration-300 max-h-[60px] ${
        type === "primary"
          ? "bg-grey-900 text-beige-100 hover:bg-grey-500"
          : type === "secondary"
          ? "bg-beige-100 text-beige-900 hover:bg-secondary-white hover:border hover:border-grey-900"
          : type === "tertiary"
          ? "text-grey-500 hover:text-grey-900"
          : type === "danger"
          ? "bg-secondary-red text-beige-100 hover:opacity-70"
          : ""
      } capitalize ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
