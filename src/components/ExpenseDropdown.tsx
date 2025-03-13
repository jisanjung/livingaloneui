import { EXPENSE_NAMES } from "../constants";
import { useStoreActions } from "../model"

const ExpenseDropdown = () => {

  const changeExpenseName = useStoreActions(actions => actions.expenseName.change);

  return (
    <>
    <div className="bg-blue-100 rounded-full py-2 px-3 text-sm"
      onChange={e => {
        const target = e.target as HTMLTextAreaElement;
        changeExpenseName(target.value || EXPENSE_NAMES.ACCUMULATED_SPENDING);
      }}
    >
        <select className='font-bold bg-blue-100'>
            <option value='accumulated_spending'>Spending</option>
            <option value='groceries'>Groceries</option>
            <option value='gas'>Gas</option>
        </select>
    </div>
    </>
  )
}

export default ExpenseDropdown