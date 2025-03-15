import { IoCheckmark } from "react-icons/io5";
import GenericKey from "./GenericKey";
import { useStoreState } from "../model";
import { convertToCurrency } from "../utils";

const CheckedKey = () => {

  const currentExpenseInput = useStoreState(state => state.expense.current);

  return (
    <GenericKey
        color="bg-black"
        dark={true}
        icon={
            <IoCheckmark/>
        }
        tappedColor='bg-gray-700'
        onTouchStart={() => {
          const parsedExpenseInput = parseInt(currentExpenseInput, 10); // remove leading 0's
          console.log(convertToCurrency(parsedExpenseInput));
        }}
    />
  )
}

export default CheckedKey