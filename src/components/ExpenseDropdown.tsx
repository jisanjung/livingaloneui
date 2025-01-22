
const ExpenseDropdown = () => {
  return (
    <>
    <div className="bg-blue-100 rounded-full py-2 px-3 text-sm">
        <select className='font-bold bg-blue-100'>
            <option value='accumulated_spending'>Spending</option>
            <option value='groceries'>Groceries</option>
            <option value='gas'>Gas</option>
        </select>
    </div>
    </>
  )
}

export default ExpenseDropdown