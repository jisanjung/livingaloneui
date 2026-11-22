import { useStoreState } from "../model";
import { formatNumber } from "../utils";

// Read-only display of the amount being typed on the keypad.
const ExpenseInput = () => {

  const currentExpenseInput = useStoreState(state => state.expense.current);
  const amount = parseInt(currentExpenseInput || '0', 10) || 0;
  const label = formatNumber(amount);

  // Shrink the figure as it grows so six digits still fit on a small phone.
  const size = label.length <= 4 ? 'text-7xl' : label.length <= 6 ? 'text-6xl' : 'text-5xl';

  return (
    <section className="flex-1 flex flex-col justify-center items-center min-h-0">
      <div className={`flex items-start font-bold tabular-nums ${amount ? 'text-neutral-900' : 'text-neutral-300'}`}>
        <span className="text-3xl mt-2 mr-1 text-neutral-400">$</span>
        <span className={`${size} tracking-tight`}>{label}</span>
      </div>
    </section>
  )
}

export default ExpenseInput
