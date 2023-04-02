import React, { useState, useMemo } from "react";
import { JsxElement } from "typescript";
import Checkbox from "./Checkbox";

function Prefecture() {
  let pref_array: {
    message: string;
    result: { prefCode: number; prefName: string }[];
  } = { message: "", result: [] };
  const [prefectures, setPrefectures] = useState(pref_array);
  const getPrefecture_data = useMemo(
    () =>
      fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        method: "GET",
        headers: {
          "X-API-KEY": "x6Cenztodyveqvc5b4RlSf0Dvzwgv5sTK2jgyo05",
        },
      })
        .then((res) => res.json())
        .then((res) => setPrefectures(res))
        .then((res) => console.log("do")),
    []
  );

  const prefectures_style = {
    margin:"0 auto",
    width:"80%",
    display: "grid",
    'grid-template-columns':"17% 17% 17% 17% 17%",
    'grid-template-rows':'7% 7% 7% 7% 7% 7% 7% 7% 7% 7%',
    gap:"3%",
  }

  return (
    <div style={prefectures_style}>
      {prefectures.result.map((value) => {
        console.log("do");
        return (
          <Checkbox
            Code={value.prefCode}
            Name={value.prefName}
            key={value.prefCode}
          />
        );
      })}
    </div>
  );
}

export default Prefecture;
