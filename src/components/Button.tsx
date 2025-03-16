import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonParams {
    type: string;
    children: string | JSX.Element;
    className: string | undefined;
    functionOnTapped: () => void;
    loading: boolean;
};

const Button = ({ className, children, functionOnTapped, loading }: ButtonParams) => {

    const [buttonTapped, setButtonTapped] = useState(false);

  return (
    <button
        className={`text-white p-3 rounded-full font-bold ${buttonTapped || loading ? 'bg-gray-700' : 'bg-black'} ${className}`}
        onTouchStart={() => {
            if (loading) {
                return;
            }
            setButtonTapped(true);
            functionOnTapped();
        }}
        onTouchEnd={() => setButtonTapped(false)}
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