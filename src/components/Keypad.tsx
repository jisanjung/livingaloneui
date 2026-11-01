import React from "react";
import { IoBackspaceOutline } from "react-icons/io5";
import { useStoreActions } from "../model";

interface KeyProps {
  label: React.ReactNode;
  ariaLabel?: string;
  muted?: boolean;
  onPress: () => void;
};

const Key = ({ label, ariaLabel, muted, onPress }: KeyProps) => (
  <button
    type="button"
    aria-label={ariaLabel}
    onClick={() => {
      navigator.vibrate?.(8);
      onPress();
    }}
    className={`h-14 rounded-2xl flex items-center justify-center text-2xl font-semibold transition-colors active:bg-neutral-200 ${muted ? 'text-neutral-500' : 'text-neutral-900'}`}
  >
    {label}
  </button>
);

interface KeypadProps {
  // Runs alongside clearing the amount, so the parent can reset its own fields.
  onClear?: () => void;
};

// Standard phone layout so muscle memory works: 1-9, then clear / 0 / delete.
const Keypad = ({ onClear }: KeypadProps) => {

  const input = useStoreActions(actions => actions.expense.input);
  const backspace = useStoreActions(actions => actions.expense.delete);
  const clear = useStoreActions(actions => actions.expense.clear);

  return (
    <div className="grid grid-cols-3 gap-1">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
        <Key key={n} label={n} onPress={() => input(n)}/>
      ))}
      <Key label={<span className="text-base">Clear</span>} muted onPress={() => {
        clear(null);
        onClear?.();
      }}/>
      <Key label={0} onPress={() => input(0)}/>
      <Key label={<IoBackspaceOutline/>} ariaLabel="Delete" muted onPress={() => backspace(null)}/>
    </div>
  )
}

export default Keypad
