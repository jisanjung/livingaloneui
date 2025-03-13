import { IoCheckmark } from "react-icons/io5";
import GenericKey from "./GenericKey";

const CheckedKey = () => {
  return (
    <GenericKey
        color="bg-black"
        dark={true}
        icon={
            <IoCheckmark/>
        }
        tappedColor='bg-gray-700'
    />
  )
}

export default CheckedKey