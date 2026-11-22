import { forwardRef } from "react";

interface NoteInputProps {
  note: string;
  onNoteChange: (note: string) => void;
  // Called when the keyboard's return key is pressed, so a purchase can be
  // saved straight from the note field without reaching for the Spend button.
  onSubmit: () => void;
};

const NoteInput = forwardRef<HTMLInputElement, NoteInputProps>(({ note, onNoteChange, onSubmit }, ref) => (
  <input
    ref={ref}
    type="text"
    value={note}
    onChange={e => onNoteChange(e.target.value)}
    onKeyDown={e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
        onSubmit();
      }
    }}
    enterKeyHint="send"
    placeholder="Add a note"
    maxLength={40}
    className="w-full h-12 px-4 rounded-2xl bg-neutral-100 text-base outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-emerald-500 select-text"
  />
));

NoteInput.displayName = 'NoteInput';

export default NoteInput
