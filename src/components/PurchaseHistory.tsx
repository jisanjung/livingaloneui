import { useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useStoreActions, useStoreState } from "../model";
import { EXPENSE_NAMES } from "../constants";
import { Purchase } from "../storage";
import { currencyStringToFloat, formatCurrency } from "../utils";
import ShimmerLoading from "./ShimmerLoading";

const dayKey = (date: Date) => date.toDateString();

const dayLabel = (date: Date) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (dayKey(date) === dayKey(today)) return 'Today';
  if (dayKey(date) === dayKey(yesterday)) return 'Yesterday';
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() === today.getFullYear() ? undefined : 'numeric',
  });
};

interface DayGroup {
  key: string;
  label: string;
  total: number;
  items: Purchase[];
};

// Expects purchases already sorted newest first.
const groupByDay = (purchases: Purchase[]): DayGroup[] => {
  const groups: DayGroup[] = [];
  for (const purchase of purchases) {
    const date = new Date(purchase.date);
    const key = dayKey(date);
    let group = groups[groups.length - 1];
    if (!group || group.key !== key) {
      group = { key, label: dayLabel(date), total: 0, items: [] };
      groups.push(group);
    }
    group.items.push(purchase);
    group.total += currencyStringToFloat(purchase.amount);
  }
  return groups;
};

const PurchaseHistory = () => {

  const navigate = useNavigate();
  const purchases = useStoreState(state => state.purchases.items);
  const loading = useStoreState(state => state.purchases.loading);
  const error = useStoreState(state => state.purchases.error);
  const loadPurchases = useStoreActions(actions => actions.purchases.load);

  useEffect(() => {
    loadPurchases();
  }, [loadPurchases]);

  const sorted = [...purchases].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Older rows were stored with an uppercase expense name, so match on a
  // lowercased key and fall back to the raw value rather than rendering blank.
  const expenseLabel = (expenseName: string) =>
    EXPENSE_NAMES.map[expenseName?.toLowerCase()] || expenseName;

  const renderPurchases = () => {
    if (loading) {
      return (
        <div className="flex flex-col gap-3 pt-2">
          {[0, 1, 2].map(key => (
            <div key={key} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-neutral-100"/>
              <ShimmerLoading/>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center pt-16">
          <p className="text-neutral-400 pb-4">{error}</p>
          <button
            type="button"
            onClick={() => loadPurchases()}
            className="font-semibold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full active:bg-emerald-100"
          >
            Try again
          </button>
        </div>
      );
    }

    if (sorted.length === 0) {
      return (
        <div className="text-center pt-16">
          <p className="text-4xl pb-3">🧾</p>
          <p className="text-neutral-400">No purchases yet.</p>
        </div>
      );
    }

    return groupByDay(sorted).map(group => (
      <section key={group.key} className="pb-4">
        <div className="flex justify-between items-baseline py-2 text-sm font-semibold text-neutral-400">
          <h2>{group.label}</h2>
          <span className="tabular-nums">${formatCurrency(group.total)}</span>
        </div>
        <ul className="flex flex-col">
          {group.items.map(purchase => (
            <li key={purchase.id} className="flex items-center gap-3 py-2">
              <span className="w-11 h-11 shrink-0 flex items-center justify-center text-2xl rounded-full bg-neutral-100">
                {purchase.emoji}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {purchase.description || expenseLabel(purchase.expenseName)}
                </p>
                <p className="text-sm text-neutral-400">
                  {new Date(purchase.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </p>
              </div>
              <p className="font-semibold tabular-nums whitespace-nowrap">
                ${purchase.amount}
              </p>
            </li>
          ))}
        </ul>
      </section>
    ));
  };

  return (
    <main className="min-h-dvh bg-white text-neutral-900 px-4 pb-[max(env(safe-area-inset-bottom),16px)]">
      <header className="sticky top-0 bg-white/90 backdrop-blur pt-[max(env(safe-area-inset-top),12px)] pb-3 -mx-4 px-2">
        {/* Arrow and title are one button so either one goes back. */}
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="Back to spending"
          className="flex items-center gap-1 py-2 pl-2 pr-4 rounded-full active:bg-neutral-100"
        >
          <IoChevronBack className="text-2xl"/>
          <h1 className="text-xl font-bold">History</h1>
        </button>
      </header>

      {renderPurchases()}
    </main>
  )
}

export default PurchaseHistory
