import React from "react";
let changeHandler = (x) => {}

function InputA({value, handler}){
    changeHandler = handler
    return (
        <label>
            <input type="text" value={value} onChange={changeHandler}/>
            x^3 +
        </label>
    )
}

export default InputA