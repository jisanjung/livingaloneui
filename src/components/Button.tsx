import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonParams {
    type: string;
    children: string | JSX.Element;
    className: string | undefined;
    onClick: () => void;
    loading: boolean;
};

const Button = ({ 
    className,
    children,
    onClick,
    loading,
}: ButtonParams) => {

    const [buttonTapped, setButtonTapped] = useState(false);

  return (
    <button
        className={`text-white p-3 rounded-full font-bold ${buttonTapped || loading ? 'bg-gray-700' : 'bg-black'} ${className}`}
        onTouchStart={() => {
            if (loading) {
                return;
            }
            setButtonTapped(true);
        }}
        onTouchEnd={() => setButtonTapped(false)}
        onClick={() => {
            if (loading) {
                return;
            }
            onClick();
        }}
    >
        {loading ? 
        <div className="flex justify-center items-center p-1">
            <LoadingSpinner
                size="text-xl"
                color="text-white"
            />
        </div> : 
        children}
    </button>
  )
}

export default Button