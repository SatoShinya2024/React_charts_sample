import React, { ChangeEventHandler } from "react";

function Selectbox(prop: { doSelect: ChangeEventHandler }) {
  return (
    <div>
      <label>表示中のデータ：</label>
      <select id="selectedData" onChange={prop.doSelect}>
        <option defaultValue={"TP"}>総人口</option>
        <option value="YP">年少人口</option>
        <option value="WP">生産年齢人口</option>
        <option value="GP">老年人口</option>
      </select>
    </div>
  );
}

export default Selectbox;
