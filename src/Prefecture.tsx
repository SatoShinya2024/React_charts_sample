import React, { useState, useEffect } from "react";
import Checkbox from "./Checkbox";
import Chart from "./Chart";
import Selectbox from "./Selectbox";

function Prefecture() {
  //グラフを書く上で必要なフックを定義
  //都道府県の名前を羅列したフック
  let prefecture_array: { prefCode: number; prefName: string }[] = [];
  const [prefectures, setPrefectures] = useState(prefecture_array);
  //チェックした都道府県の名前を格納するフック
  const [checkedPrefecture, setCheckedPrefecture] = useState(prefecture_array);
  //選択したデータを格納したフック
  const [selectedData, setSelectedData] = useState("TP");

  //都道府県一覧のデータをAPIから取得するための関数
  //不必要にレンダリングされないようにする。
  useEffect(() => {
    fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
      method: "GET",
      headers: {
        "X-API-KEY": "x6Cenztodyveqvc5b4RlSf0Dvzwgv5sTK2jgyo05",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPrefectures(res.result);
      });
  }, []);

  //チェックボックスにチェックがされた時、その都道府県コードと名前をフックに格納するためのメソッド
  const docheck = (e: any) => {
    //全てのチェックボックスを確認し、チェックがついているものをフックに格納していく。
    let checked_array: { prefCode: number; prefName: string }[] = [];
    for (let item of prefectures) {
      let prefId = "prefecture" + item.prefCode;
      if (document.querySelector<HTMLInputElement>("#" + prefId)?.checked) {
        checked_array.push(item);
      }
    }
    setCheckedPrefecture(checked_array);
    console.log("docheck");
    console.log(checkedPrefecture);
  };

  //セレクトボックスを変更したときにデータを変更するためのメソッド
  const doSelect = (e: any) => {
    let data =
      document.querySelector<HTMLSelectElement>("#selectedData")?.value;
    if (data === "YP" || data === "WP" || data === "GP") {
      setSelectedData(data);
    } else {
      setSelectedData("TP");
    }
  };

  const prefectures_style = {
    margin: "0 auto",
    width: "80%",
    display: "grid",
    gridTemplateColumns: "17% 17% 17% 17% 17%",
    gridTemplateRows: "7% 7% 7% 7% 7% 7% 7% 7% 7% 7%",
    gap: "3%",
  };

  const chart_style = {
    height: "500px",
  };

  return (
    <div>
      <div style={prefectures_style}>
        {prefectures.map((value, key) => {
          console.log("checkbox");
          return (
            <Checkbox
              Code={value.prefCode}
              Name={value.prefName}
              doCheck={docheck}
              Num={key}
              key={value.prefCode}
            />
          );
        })}
      </div>
      <div>
        <Selectbox doSelect={doSelect} />
      </div>
      <div style={chart_style} id="chart_container">
        <Chart
          selecteddata={selectedData}
          selectedPrefecture={checkedPrefecture}
        />
      </div>
    </div>
  );
}
export default Prefecture;
