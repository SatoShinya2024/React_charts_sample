import React from "react";

function Checkbox(prop: { prefCode: number; prefName: string }) {
  return (
    <div>
      <input type="checkbox" value={prop.prefCode} />
      <span>{prop.prefName}</span>
    </div>
  );
}

export default Checkbox;
