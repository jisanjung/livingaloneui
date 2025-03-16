import { useState } from "react"
import ShimmerLoading from "./ShimmerLoading"

const Balance = () => {
  
  const [loading, setLoading] = useState(false);

  return (
    <>
      {
        loading ? 
        <ShimmerLoading/> :
        <p className="text-2xl font-bold text-emerald-600">
          <span>$</span>
          <span>1000</span>
        </p>
      }
    </>
  )
}

export default Balance