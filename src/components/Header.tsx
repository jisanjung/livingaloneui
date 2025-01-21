import Balance from "./Balance"
import ExpenseDropdown from "./ExpenseDropdown"

const Header = () => {
  return (
    <header className="flex justify-between items-center">
        <Balance/>
        <ExpenseDropdown/>
    </header>
  )
}

export default Header