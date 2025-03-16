import { IoCheckmark } from "react-icons/io5";
import GenericKey from "./GenericKey";
import { useStoreActions, useStoreState } from "../model";
import { convertToCurrency } from "../utils";

const CheckedKey = () => {

  const currentExpenseInput = useStoreState(state => state.expense.current);
  const triggerPreConfirm = useStoreActions(actions => actions.preConfirm.toggle);

  return (
    <GenericKey
        color="bg-black"
        dark={true}
        icon={
            <IoCheckmark/>
        }
        tappedColor='bg-gray-700'
        onClick={() => {
          const parsedExpenseInput = parseInt(currentExpenseInput, 10); // remove leading 0's
          const currencyConverted = convertToCurrency(parsedExpenseInput);
          console.log(currencyConverted);

          if (
            !currencyConverted ||
            currencyConverted === 'NaN.aN' ||
            currencyConverted === '0.00'

            ) {
            return;
          }
          
          triggerPreConfirm(true);
        }}
    />
  )
}

export default CheckedKey