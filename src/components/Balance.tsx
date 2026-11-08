import { useEffect, useState } from "react"
import ShimmerLoading from "./ShimmerLoading"
import { getBalance } from "../api";
import { useStoreActions, useStoreState } from "../model";
import { currencyStringToFloat, formatCurrency } from "../utils";

// Fetched once on mount; ExpenseAppWrapper refreshes it after each save.
const Balance = () => {

  const [loading, setLoading] = useState(true);
  const currentBalance = useStoreState(state => state.balance.current);
  const updateBalance = useStoreActions(actions => actions.balance.update);

  useEffect(() => {
    getBalance()
      .then(balance => balance && updateBalance(balance))
      .catch(err => console.log('COULD_NOT_LOAD_BALANCE: ', err))
      .finally(() => setLoading(false));
  }, [updateBalance]);

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
