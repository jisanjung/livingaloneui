import { useState } from "react";

interface NumberKeyProps {
    number: number | string;
}

const NumberKey = ({ number }: NumberKeyProps) => {

  const [keypadTapped, setKeypadTapped] = useState(false);

  return (
    <button className="w-1/4 m-1"
      onMouseDown={() => setKeypadTapped(true)}
      onMouseUp={() => setKeypadTapped(false)}
      onTouchStart={() => setKeypadTapped(true)}
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