import GenericKey from "./GenericKey";
import NumberKey from "./NumberKey";
// import { IoBackspaceOutline, IoCheckmark } from "react-icons/io5";

const Keypad = () => {
  return (
    <div className="absolute left-0 right-0 bottom-0">
        <div>
            <div className="flex">
                <NumberKey number={1}/>
                <NumberKey number={2}/>
                <NumberKey number={3}/>
                <GenericKey color="bg-red-200" dark={false} icon={
                    'C'
                }/>
            </div>
            <div className="flex">
                <NumberKey number={4}/>
                <NumberKey number={5}/>
                <NumberKey number={6}/>
                <NumberKey number={0}/>
            </div>
            <div className="flex">
                <NumberKey number={7}/>
                <NumberKey number={8}/>
                <NumberKey number={9}/>
                <GenericKey color="bg-black" dark={true} icon={
                    'OK'
                }/>
            </div>
        </div>
    </div>
  )
}

export default Keypad