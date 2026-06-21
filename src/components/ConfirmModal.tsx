import { useEffect, useState } from "react";
import Button from "./Button";
import { useStoreActions, useStoreState } from "../model";
import { EXPENSE_NAMES, PURCHASE_EMOJIS } from "../constants";
import { formatNumber } from "../utils";
import ConfirmationMessage from "./ConfirmationMessage";
import { getBalance, updateExpense } from "../api";

const ConfirmModal = () => {

    const [loading, setLoading] = useState(false);
    const [openAnimation, setOpenAnimation] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(PURCHASE_EMOJIS[0]);
    const [description, setDescription] = useState('');
    const currentExpenseInput = useStoreState(state => state.expense.current);
    const currentExpenseName = useStoreState(state => state.expenseName.current);
    const confirmed = useStoreState(state => state.postConfirm.triggered);
    const togglePostConfirm = useStoreActions(actions => actions.postConfirm.toggle);
    const updateBalance = useStoreActions(actions => actions.balance.update);
    const addPurchase = useStoreActions(actions => actions.purchases.add);

    const parsedExpenseInput = parseInt(currentExpenseInput, 10); // remove leading 0's
    const currencyConverted = formatNumber(parsedExpenseInput);

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

        addPurchase({
            id: crypto.randomUUID(),
            emoji: selectedEmoji,
            description: description.trim(),
            amount: currencyConverted,
            expenseName: currentExpenseName,
            date: new Date().toISOString(),
        });

        const newBalance = await getBalance();
        updateBalance(newBalance);
    };

  return (
    <div className="fixed right-0 left-0 bg-white py-6 px-3 rounded-t-3xl"
        style={{
            bottom: openAnimation ? '0' : '-100%',
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
        <>
            <div className="flex gap-1 overflow-x-auto pb-4">
                {PURCHASE_EMOJIS.map(emoji => (
                    <button
                        key={emoji}
                        type="button"
                        onClick={() => setSelectedEmoji(emoji)}
                        className={`text-2xl p-1 rounded-full shrink-0 ${selectedEmoji === emoji ? 'bg-gray-200 ring-2 ring-emerald-500' : ''}`}
                    >
                        {emoji}
                    </button>
                ))}
            </div>
            <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="What was it? (optional)"
                maxLength={40}
                className="w-full mb-4 p-3 rounded-full bg-gray-100 text-center outline-none focus:ring-2 focus:ring-emerald-500"
            />
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
        </>
        }
    </div>
  )
}

export default ConfirmModal