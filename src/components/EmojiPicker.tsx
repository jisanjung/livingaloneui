import { PURCHASE_EMOJIS } from "../constants";

interface EmojiPickerProps {
  selected: string;
  onSelect: (emoji: string) => void;
};

const EmojiPicker = ({ selected, onSelect }: EmojiPickerProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto py-3 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {PURCHASE_EMOJIS.map(emoji => (
        <button
          key={emoji}
          type="button"
          aria-pressed={selected === emoji}
          onClick={() => onSelect(emoji)}
          className={`shrink-0 w-12 h-12 flex items-center justify-center text-2xl rounded-full transition-colors ${selected === emoji ? 'bg-emerald-100 ring-2 ring-emerald-500' : 'bg-neutral-100 active:bg-neutral-200'}`}
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}

export default EmojiPicker
