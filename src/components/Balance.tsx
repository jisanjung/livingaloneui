import { useEffect, useState } from "react"
import ShimmerLoading from "./ShimmerLoading"
import { getBalance } from "../api";
import { useStoreActions, useStoreState } from "../model";

const Balance = () => {
  
  const [loading, setLoading] = useState(false);
  const currentBalance = useStoreState(state => state.balance.current);
  const updateBalance = useStoreActions(actions => actions.balance.update);

  useEffect(() => {
    setLoading(true);

    getBalance()
    .then(balance => {
      if (!balance) {
        return;
      }
      setLoading(false);
      updateBalance(balance);
    });
  }, [currentBalance]);

  return (
    <>
      {
        loading ? 
        <ShimmerLoading/> :
        <p className="text-2xl font-bold text-emerald-600">
          <span>$</span>
          <span>{currentBalance}</span>
        </p>
      }
    </>
  )
}

export default Balance