import { useStoreState } from "../model";
import { formatNumber } from "../utils";

interface ExpenseInputProps {
  note: string;
  onNoteChange: (note: string) => void;
};

const ExpenseInput = ({ note, onNoteChange }: ExpenseInputProps) => {

  const currentExpenseInput = useStoreState(state => state.expense.current);
  const amount = parseInt(currentExpenseInput || '0', 10) || 0;
  const label = formatNumber(amount);

  // Shrink the figure as it grows so six digits still fit on a small phone.
  const size = label.length <= 4 ? 'text-7xl' : label.length <= 6 ? 'text-6xl' : 'text-5xl';

  return (
    <section className="flex-1 flex flex-col justify-center items-center gap-5 min-h-0">
      <div className={`flex items-start font-bold tabular-nums ${amount ? 'text-neutral-900' : 'text-neutral-300'}`}>
        <span className="text-3xl mt-2 mr-1 text-neutral-400">$</span>
        <span className={`${size} tracking-tight`}>{label}</span>
      </div>
      <input
        type="text"
        value={note}
        onChange={e => onNoteChange(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
        enterKeyHint="done"
        placeholder="Add a note"
        maxLength={40}
        className="w-full max-w-64 px-4 py-2 rounded-full bg-neutral-100 text-center text-base outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-emerald-500 select-text"
      />
    </section>
  )
}

export default ExpenseInput
