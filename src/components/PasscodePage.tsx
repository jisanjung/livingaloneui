import { useEffect, useRef } from "react"

const PasscodePage = () => {

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.click();
        }
    }, []);

  return (
    <div>
        <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="passcode" ref={inputRef}/>
    </div>
  )
}

export default PasscodePage