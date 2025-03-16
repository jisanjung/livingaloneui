import { useState } from "react";
import Button from "./Button";
import { useStoreState } from "../model";
import { EXPENSE_NAMES } from "../constants";
import { convertToCurrency } from "../utils";

const ConfirmModal = () => {

    const [loading, setLoading] = useState(false);
    const currentExpenseInput = useStoreState(state => state.expense.current);
    const currentExpenseName = useStoreState(state => state.expenseName.current);

    const parsedExpenseInput = parseInt(currentExpenseInput, 10); // remove leading 0's
    const currencyConverted = convertToCurrency(parsedExpenseInput);

  return (
    <div className="fixed bottom-0 right-0 left-0 bg-white p-6 rounded-t-3xl">
        <div className="text-center pb-6">
            <h1 className="font-bold text-4xl">
                $<span>{currencyConverted}</span>
            </h1>
            <p className="text-gray-500">in <span>{EXPENSE_NAMES.map[currentExpenseName]}</span></p>
        </div>
        <Button
            type="primary"
            className='w-full'
            functionOnTapped={() => {
                setLoading(true);
            }}
            loading={loading}
        >
            Confirm
        </Button>
    </div>
  )
}

export default ConfirmModal