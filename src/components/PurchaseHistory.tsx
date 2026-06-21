import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useStoreState } from "../model";
import { EXPENSE_NAMES } from "../constants";

const PurchaseHistory = () => {

  const navigate = useNavigate();
  const purchases = useStoreState(state => state.purchases.items);

  const sorted = [...purchases].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="p-3 min-h-screen">
      <header className="pb-6">
        <button type="button" onClick={() => navigate('/')} className="flex items-center gap-3">
          <IoArrowBack className="text-2xl"/>
          <h1 className="text-xl font-bold">Purchase History</h1>
        </button>
      </header>

      {sorted.length === 0 ?
        <p className="text-center text-gray-400 pt-10">No purchases yet.</p> :
        <ul className="flex flex-col gap-2">
          {sorted.map(purchase => (
            <li
              key={purchase.id}
              className="flex items-center gap-3 p-3 rounded-2xl bg-gray-100"
            >
              <span className="text-2xl">{purchase.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {purchase.description || EXPENSE_NAMES.map[purchase.expenseName]}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(purchase.date).toLocaleDateString()}
                </p>
              </div>
              <p className="font-bold text-emerald-600 whitespace-nowrap">
                ${purchase.amount}
              </p>
            </li>
          ))}
        </ul>
      }
    </main>
  )
}

export default PurchaseHistory
