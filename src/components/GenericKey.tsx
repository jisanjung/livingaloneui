import React from "react"

interface GenericKeyProps {
    icon: React.ReactNode;
    color: string;
    dark: boolean;
};

const GenericKey = ({ icon, color, dark }: GenericKeyProps) => {

    const stringifyColor = (color: string) => color === 'black' ? 'bg-black' : `bg-${color}-200`;

  return (
    <button className="w-1/4 m-1">
        <div className={`py-6 ${stringifyColor(color)} rounded-3xl`}>
            <span className={`text-2xl font-bold flex justify-center ${dark && 'text-white'}`}>
                {icon}
            </span>
        </div>
    </button>
  )
}

export default GenericKey