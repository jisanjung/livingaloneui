import { useEffect } from "react"
import ShimmerLoading from "./ShimmerLoading"
import { useStoreActions, useStoreState } from "../model";
import { currencyStringToFloat, formatCurrency } from "../utils";

// Fetched once per session (the store skips repeat loads). Each save updates
// it from the /spend response.
const Balance = () => {

  const currentBalance = useStoreState(state => state.balance.current);
  const status = useStoreState(state => state.balance.status);
  const loadBalance = useStoreActions(actions => actions.balance.load);
  const loading = status === 'idle' || status === 'loading';

  useEffect(() => {
    loadBalance();
  }, [loadBalance]);

  return (
    <div className="flex flex-col">
      <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">Balance</span>
      {loading ?
        <ShimmerLoading/> :
        <span className="text-lg font-bold text-emerald-600 leading-6">
          ${formatCurrency(currencyStringToFloat(currentBalance))}
        </span>
      }
    </div>
  )
}

export default Balance
