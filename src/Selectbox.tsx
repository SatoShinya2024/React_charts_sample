import React, { ChangeEventHandler } from "react";

function Selectbox(prop: { doSelect: ChangeEventHandler }) {
  return (
    <select id="selectedData" onChange={prop.doSelect}>
      <option defaultValue={"TP"}>総人口</option>
      <option value="YP">年少人口</option>
      <option value="WP">労働生産人口</option>
      <option value="GP">老年人口</option>
    </select>
  );
}

export default Selectbox;
