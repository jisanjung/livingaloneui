import { useStoreActions } from "../model";
import GenericKey from "./GenericKey";
import { IoBackspaceOutline } from "react-icons/io5";

const BackspaceKey = () => {

  const backspaceInput = useStoreActions(actions => actions.expense.delete);

  return (
    <GenericKey 
        color="bg-red-200"
        dark={false}
        icon={
            <IoBackspaceOutline/>
        }
        tappedColor='bg-red-300'
        onClick={() => {
          backspaceInput(null);
        }}
    />
  )
}

export default BackspaceKey