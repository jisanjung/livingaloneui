import { useStoreState } from "../model";
import { convertToCurrency } from "../utils";

const ExpenseInput = () => {

  const currentExpenseInput = useStoreState(state => state.expense.input);
  
  const parseExpense = (currentExpenseInput: string) => {
    try {
      const parsedExpense = parseInt(currentExpenseInput);
      const currencyFormatted = convertToCurrency(parsedExpense);
      
      return !currencyFormatted || currencyFormatted === 'NaN.aN' ? '0' : currencyFormatted;
    } catch (err) {
      console.log('COULD_NOT_PARSE_EXPENSE_INPUT_TO_NUMBER: ', err);
      return '0';
    }
  };

  return (
    <div className="flex justify-center items-end my-10">
        <p className="text-3xl mb-2 mr-1 text-gray-400">$</p>
        <p className="text-6xl font-bold">
          {parseExpense(currentExpenseInput)}
        </p>
    </div>
  )
}

export default ExpenseInput