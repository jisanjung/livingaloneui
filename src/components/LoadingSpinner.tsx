import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface LoadingSpinnerProps {
    size: string;
    color: string;
};

const LoadingSpinner = ({ size, color }: LoadingSpinnerProps) => {
  return (
    <>
        <AiOutlineLoading3Quarters
            className={`rotating font-bold ${size} ${color}`}
        />
    </>
  )
}

export default LoadingSpinner