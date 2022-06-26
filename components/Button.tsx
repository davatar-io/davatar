import React from "react";
interface ButtonProps {
  label: string;
  tabIndex?: number;
  onClick?: () => void;
}

const Button = ({ label, onClick, tabIndex }: ButtonProps) => (
  <button
    className={`px-6 py-3 bg-gray-900 font-semibold text-white rounded-xl hover:bg-gray-800 active:scale-105 transition-all ease-in-out`}
    onClick={onClick}
    tabIndex={tabIndex}
  >
    {label}
  </button>
);

export default Button;
