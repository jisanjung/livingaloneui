import ShimmerLoading from "./ShimmerLoading"
import { useStoreState } from "../model";
import { currencyStringToFloat, formatCurrency } from "../utils";

// Loaded once per app load (App.tsx); ExpenseAppWrapper adjusts it after each save.
const Balance = () => {

  const loading = useStoreState(state => state.balance.loading);
  const currentBalance = useStoreState(state => state.balance.current);

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
