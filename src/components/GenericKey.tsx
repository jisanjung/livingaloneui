import React from "react"

interface GenericKeyProps {
    icon: React.ReactNode | string;
    color: string;
    dark: boolean;
};

const GenericKey = ({ icon, color, dark }: GenericKeyProps) => {

  return (
    <button className="w-1/4 m-1">
        <div className={`py-6 ${color} rounded-3xl`}>
            <span className={`text-2xl font-bold flex justify-center ${dark && 'text-white'}`}>
                {icon}
            </span>
        </div>
    </button>
  )
}

export default GenericKey