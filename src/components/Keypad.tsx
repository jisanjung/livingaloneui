import BackspaceKey from "./BackspaceKey";
import CheckedKey from "./CheckedKey";
import NumberKey from "./NumberKey";

const Keypad = () => {
  return (
    <div className="absolute left-0 right-0 bottom-0">
        <div>
            <div className="flex">
                <NumberKey number={1}/>
                <NumberKey number={2}/>
                <NumberKey number={3}/>
                <BackspaceKey/>
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
                <CheckedKey/>
            </div>
        </div>
    </div>
  )
}

export default Keypad