import { IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router";
import Balance from "./Balance"

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center">
      <Balance/>
      <button
        type="button"
        onClick={() => navigate('/history')}
        className="flex items-center gap-1 text-sm font-semibold text-neutral-500 px-3 py-2 -mr-3 rounded-full active:bg-neutral-100"
      >
        History
        <IoChevronForward/>
      </button>
    </header>
  )
}

export default Header
