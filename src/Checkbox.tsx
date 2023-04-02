import React from "react";

function Checkbox(prop: { Code: number; Name: string }) {
  const checkbox_style = {
    margin:"0 5px"
  }
  const label_style = {
    height:"100%",
  }

  let name = "prefecture" + prop.Code;

  return (
    <div>
      <input type="checkbox" value={prop.Code} style={checkbox_style} name={name} id={name}/>
      <label style={label_style} htmlFor={name}>{prop.Name}</label>
    </div>
  );
}

export default Checkbox;
