import { useState } from "react"

const ExpenseInput = () => {

    const [expense, setExpense] = useState('0');

  return (
    <div className="flex justify-center">
        <input 
            type="text" 
            inputMode="numeric" 
            value={expense} 
            onChange={(e) => setExpense(e.target.value)}
            className="text-center text-7xl w-full py-2 my-12"
            autoFocus={true}
        />
    </div>
  )
}

export default ExpenseInput