import { useStoreState } from "../model"

const ExpenseInput = () => {

  const currentExpenseInput = useStoreState(state => state.expense.input);

  return (
    <div className="flex justify-center items-end my-10">
        <p className="text-3xl mb-2 mr-1 text-gray-400">$</p>
        <p className="text-6xl font-bold">
          {currentExpenseInput || '0'}
        </p>
    </div>
  )
}

export default ExpenseInput