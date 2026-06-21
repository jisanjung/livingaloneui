import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import ShimmerLoading from "./ShimmerLoading"
import { getBalance } from "../api";
import { useStoreActions, useStoreState } from "../model";

const Balance = () => {

  const navigate = useNavigate();
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
        <button
          type="button"
          onClick={() => navigate('/history')}
          className="text-2xl font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full active:bg-emerald-100"
        >
          <span>$</span>
          <span>{currentBalance}</span>
        </button>
      }
    </>
  )
}

export default Balance