import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "../model";
import { PURCHASE_EMOJIS } from "../constants";
import { formatNumber } from "../utils";
import { updateExpense } from "../api";
import Header from "./Header";
import ExpenseInput from "./ExpenseInput";
import EmojiPicker from "./EmojiPicker";
import Keypad from "./Keypad";
import Button from "./Button";
import Toast, { ToastState } from "./Toast";

// Single-screen entry: type an amount, optionally tag it, tap Save.
// No confirmation sheet - the Save button always shows the exact amount, and a
// toast confirms the write, so a purchase is logged in as few taps as possible.
const ExpenseAppWrapper = () => {

  const [emoji, setEmoji] = useState(PURCHASE_EMOJIS[0]);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const currentExpenseInput = useStoreState(state => state.expense.current);
  const currentExpenseName = useStoreState(state => state.expenseName.current);
  const clearExpenseInput = useStoreActions(actions => actions.expense.clear);
  const spendFromBalance = useStoreActions(actions => actions.balance.spend);
  const savePurchase = useStoreActions(actions => actions.purchases.save);

  const amount = parseInt(currentExpenseInput || '0', 10) || 0;
  const amountLabel = formatNumber(amount);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSave = async () => {
    if (!amount || saving) {
      return;
    }
    setSaving(true);

    let updated = false;
    try {
      updated = await updateExpense(currentExpenseName, amountLabel);
    } catch (err) {
      console.log('COULD_NOT_UPDATE_EXPENSE: ', err);
    }

    if (!updated) {
      setSaving(false);
      setToast({ kind: 'error', message: "Couldn't save. Try again." });
      return;
    }
    spendFromBalance(amount);

    const historySaved = await savePurchase({
      id: crypto.randomUUID(),
      emoji,
      description: note.trim(),
      amount: amountLabel,
      expenseName: currentExpenseName,
      date: new Date().toISOString(),
    });

    clearExpenseInput(null);
    setNote('');
    setEmoji(PURCHASE_EMOJIS[0]);
    setSaving(false);
    setToast(historySaved
      ? { kind: 'success', message: `Spent $${amountLabel} ${emoji}` }
      : { kind: 'error', message: `Spent $${amountLabel}, but not saved to history` });
  };

  return (
    // The empty touchstart handler lets iOS Safari apply :active styles to keys.
    <main
      className="h-dvh flex flex-col bg-white text-neutral-900 select-none px-4 pt-[max(env(safe-area-inset-top),12px)] pb-[max(env(safe-area-inset-bottom),12px)]"
      onTouchStart={() => {}}
    >
      <Toast toast={toast}/>
      <Header/>
      <ExpenseInput note={note} onNoteChange={setNote}/>
      <EmojiPicker selected={emoji} onSelect={setEmoji}/>
      <Keypad onClear={() => setNote('')}/>
      <Button
        className="w-full mt-3"
        disabled={!amount}
        loading={saving}
        onClick={handleSave}
      >
        {amount ? `Spend $${amountLabel}` :'Enter an amount'}
      </Button>
    </main>
  )
}

export default ExpenseAppWrapper
