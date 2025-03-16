import { useStoreState } from "../model"
import ConfirmDrawer from "./ConfirmDrawer"
import ExpenseInput from "./ExpenseInput"
import Header from "./Header"
import Keypad from "./Keypad"

const ExpenseAppWrapper = () => {

    const preConfirmTriggered = useStoreState(state => state.preConfirm.triggered);

  return (
    <main className="p-3">
        {preConfirmTriggered && <ConfirmDrawer/>}
        <Header/>
        <ExpenseInput/>
        <Keypad/>
    </main>
  )
}

export default ExpenseAppWrapper