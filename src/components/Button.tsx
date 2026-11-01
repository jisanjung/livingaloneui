import type React from "react";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    onClick: () => void;
};

const Button = ({
    className = '',
    children,
    disabled = false,
    loading = false,
    onClick,
}: ButtonProps) => {
  const inactive = disabled || loading;

  return (
    <button
        type="button"
        disabled={inactive}
        className={`h-14 rounded-2xl text-lg font-bold transition-colors flex items-center justify-center ${disabled ? 'bg-neutral-100 text-neutral-400' : 'bg-neutral-900 text-white active:bg-neutral-700'} ${className}`}
        onClick={() => !inactive && onClick()}
    >
        {loading ? <LoadingSpinner size="text-xl" color="text-white"/> : children}
    </button>
  )
}

export default Button
