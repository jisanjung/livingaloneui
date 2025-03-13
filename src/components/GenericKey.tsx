import React, { useState } from "react"

interface GenericKeyProps {
    icon: React.ReactNode;
    color: string;
    dark: boolean;
    tappedColor: string;
};

const GenericKey = ({ icon, color, dark, tappedColor }: GenericKeyProps) => {

  const [keypadTapped, setKeypadTapped] = useState(false);

  return (
    <button className="w-1/4 m-1"
      onMouseDown={() => setKeypadTapped(true)}
      onMouseUp={() => setKeypadTapped(false)}
      onTouchStart={() => setKeypadTapped(true)}
      onTouchEnd={() => setKeypadTapped(false)}
    >
        <div className={`py-6 ${keypadTapped ? tappedColor : color} rounded-3xl`}>
            <span className={`text-2xl font-bold flex justify-center ${dark && 'text-white'}`}>
                {icon}
            </span>
        </div>
    </button>
  )
}

export default GenericKey