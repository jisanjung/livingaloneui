import Balance from "./Balance"
import ExpenseDropdown from "./ExpenseDropdown"

const Header = () => {
  return (
    <header className="flex justify-between">
        <Balance/>
        <ExpenseDropdown/>
    </header>
  )
}

export default Header