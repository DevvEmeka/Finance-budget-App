import React from "react";

type buttonProps = {
  children: React.ReactNode;
  type?: string;
};

function Button({ children, type = "primary" }: buttonProps) {
  return (
    <button
      className={`font-semibold rounded-md px-6 py-2 items-center flex gap-2 transition-all duration-300 min-h-[60px] ${
        type === "primary"
          ? "bg-grey-900 text-beige-100 hover:bg-grey-500"
          : type === "secondary"
          ? "bg-beige-100 text-beige-900 hover:bg-secondary-white hover:border hover:border-grey-900"
          : type === "tertiary"
          ? "text-grey-500 hover:text-grey-900"
          : type === "danger"
          ? "bg-secondary-red text-beige-100 hover:opacity-70"
          : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
