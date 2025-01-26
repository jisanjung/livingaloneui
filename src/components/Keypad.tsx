import NumberKey from "./NumberKey"

const Keypad = () => {
  return (
    <div className="absolute left-0 right-0 bottom-0">
        <div>
            <div className="flex">
                <NumberKey number={1}/>
                <NumberKey number={2}/>
                <NumberKey number={3}/>
                <NumberKey number='D'/>
            </div>
            <div className="flex">
                <NumberKey number={1}/>
                <NumberKey number={2}/>
                <NumberKey number={3}/>
                <NumberKey number='D'/>
            </div>
            <div className="flex">
                <NumberKey number={1}/>
                <NumberKey number={2}/>
                <NumberKey number={3}/>
                <NumberKey number='D'/>
            </div>
            <div className="flex">
                <NumberKey number={1}/>
                <NumberKey number={2}/>
                <NumberKey number={3}/>
                <NumberKey number='D'/>
            </div>
        </div>
    </div>
  )
}

export default Keypad