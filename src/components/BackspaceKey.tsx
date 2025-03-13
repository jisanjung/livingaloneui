import GenericKey from "./GenericKey";
import { IoBackspaceOutline } from "react-icons/io5";

const BackspaceKey = () => {
  return (
    <GenericKey 
        color="bg-red-200"
        dark={false}
        icon={
            <IoBackspaceOutline/>
        }
        tappedColor='bg-red-300'
    />
  )
}

export default BackspaceKey