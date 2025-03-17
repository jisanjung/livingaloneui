import { useEffect, useState } from "react";
import Button from "./Button";
import { useStoreActions, useStoreState } from "../model";
import { EXPENSE_NAMES } from "../constants";
import { convertToCurrency } from "../utils";
import ConfirmationMessage from "./ConfirmationMessage";
import { getBalance, updateExpense } from "../api";

const ConfirmModal = () => {

    const [loading, setLoading] = useState(false);
    const [openAnimation, setOpenAnimation] = useState(false);
    const currentExpenseInput = useStoreState(state => state.expense.current);
    const currentExpenseName = useStoreState(state => state.expenseName.current);
    const confirmed = useStoreState(state => state.postConfirm.triggered);
    const togglePostConfirm = useStoreActions(actions => actions.postConfirm.toggle);
    const updateBalance = useStoreActions(actions => actions.balance.update);

    const parsedExpenseInput = parseInt(currentExpenseInput, 10); // remove leading 0's
    const currencyConverted = convertToCurrency(parsedExpenseInput);

    useEffect(() => {
        setOpenAnimation(true);
    }, []);

    const handleConfirmClick = async () => {
        setLoading(true);
        const updateSuccess = await updateExpense(currentExpenseName, currencyConverted);

        if (!updateSuccess) {
            return;
        }
        setLoading(false);
        togglePostConfirm(true);

        const newBalance = await getBalance();
        updateBalance(newBalance);
    };

  return (
    <div className="fixed right-0 left-0 bg-white py-6 px-3 rounded-t-3xl"
        style={{
            bottom: openAnimation ? '0' : '-185px',
            transition: 'bottom 0.25s',
        }}
    >
        <div className="text-center pb-6">
            <h1 className="font-bold text-4xl">
                $<span>{currencyConverted}</span>
            </h1>
            <p className="text-gray-500">in <span>{EXPENSE_NAMES.map[currentExpenseName]}</span></p>
        </div>
        {confirmed ? 
        <ConfirmationMessage/> :
        <Button
            type="primary"
            className='w-full'
            onClick={async () => {
                await handleConfirmClick();
            }}
            loading={loading}
        >
            Confirm
        </Button>
        }
    </div>
  )
}

export default ConfirmModal