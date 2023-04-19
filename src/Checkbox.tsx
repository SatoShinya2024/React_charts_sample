import React, { ChangeEventHandler } from "react";

function Checkbox(prop: {
  Code: number;
  Name: string;
  Num: number;
  doCheck: ChangeEventHandler;
}) {
  let name = "prefecture" + prop.Code;

  return (
    <div>
      <input
        type="checkbox"
        value={prop.Num}
        name={name}
        id={name}
        onChange={prop.doCheck}
      />
      <label htmlFor={name}>
        {prop.Name}
      </label>
    </div>
  );
}

export default Checkbox;
