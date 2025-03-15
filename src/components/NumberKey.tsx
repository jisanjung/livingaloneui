import { useState } from "react";
import { useStoreActions } from "../model";

interface NumberKeyProps {
    number: number;
}

const NumberKey = ({ number }: NumberKeyProps) => {

  const [keypadTapped, setKeypadTapped] = useState(false);
  const inputExpense = useStoreActions(actions => actions.expense.input);

  const handleNumberTap = (number: number) => {
    setKeypadTapped(true);
    inputExpense(number);
  };

  return (
    <button className="w-1/4 m-1"
      onMouseDown={() => setKeypadTapped(true)}
      onMouseUp={() => setKeypadTapped(false)}
      onTouchStart={() => handleNumberTap(number)}
      onTouchEnd={() => setKeypadTapped(false)}
    >
        <div className={`py-6 ${keypadTapped ? 'bg-gray-300' : 'bg-gray-200'} rounded-3xl`}>
            <span className="text-2xl font-bold">
                {number}
            </span>
        </div>
    </button>
  )
}

export default NumberKey