import React, { useState } from "react"

interface GenericKeyProps {
    icon: React.ReactNode;
    color: string;
    dark: boolean;
};

const GenericKey = ({ icon, color, dark }: GenericKeyProps) => {

  const [keypadTapped, setKeypadTapped] = useState(false);

  const tappedKeypadColor = (color: string) => {
    if (color === 'bg-black') {
      return 'bg-gray-700';
    }
    // currently, assume the only other color is red (backspace)
    return 'bg-red-300';
  };

  return (
    <button className="w-1/4 m-1"
      onMouseDown={() => setKeypadTapped(true)}
      onMouseUp={() => setKeypadTapped(false)}
      onTouchStart={() => setKeypadTapped(true)}
      onTouchEnd={() => setKeypadTapped(false)}
    >
        <div className={`py-6 ${keypadTapped ? tappedKeypadColor(color) : color} rounded-3xl`}>
            <span className={`text-2xl font-bold flex justify-center ${dark && 'text-white'}`}>
                {icon}
            </span>
        </div>
    </button>
  )
}

export default GenericKey