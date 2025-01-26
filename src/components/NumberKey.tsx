interface NumberKeyProps {
    number: number | string;
}

const NumberKey = ({ number }: NumberKeyProps) => {
  return (
    <button className="w-1/4 m-1">
        <div className="py-6 bg-gray-200 rounded-3xl">
            <span className="text-2xl font-bold">
                {number}
            </span>
        </div>
    </button>
  )
}

export default NumberKey