import React from 'react';
interface ButtonProps {
  label: string;
  tabIndex?: number;
  variant?: 'retro';
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  label,
  onClick,
  tabIndex,
  variant,
  disabled,
}: ButtonProps) => (
  <button
    className={
      variant === 'retro'
        ? 'px-6 py-2 bg-gradient-to-b from-gray-100 to-gray-300 border border-gray-300 dark:text-gray-700'
        : 'px-6 py-3 bg-gray-900 font-semibold text-white rounded-xl hover:bg-gray-800 active:scale-105 transition-all ease-in-out'
    }
    onClick={onClick}
    tabIndex={tabIndex}
    disabled={disabled}
  >
    {label}
  </button>
);

export default Button;
