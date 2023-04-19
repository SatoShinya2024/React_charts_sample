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
  const docheck = () => {
    //全てのチェックボックスを確認し、チェックがついているものをフックに格納していく。
    let checked_array: { prefCode: number; prefName: string }[] = [];
    for (let item of prefectures) {
      let prefId = "prefecture" + item.prefCode;
      if (document.querySelector<HTMLInputElement>("#" + prefId)?.checked) {
        checked_array.push(item);
      }
    }
    setCheckedPrefecture(checked_array);
  };

  //セレクトボックスを変更したときにデータを変更するためのメソッド
  const doSelect = () => {
    let data =
      document.querySelector<HTMLSelectElement>("#selectedData")?.value;
    if (data === "YP" || data === "WP" || data === "GP") {
      setSelectedData(data);
    } else {
      setSelectedData("TP");
    }
  };

  return (
    <div className="large-wrapper">
      <div className="checkbox-wrapper">
        {prefectures.map((value, key) => {
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
      <div className="selectbox-and-chart-wrapper">
        <div className="selectbox-wrapper">
          <Selectbox doSelect={doSelect} />
        </div>
        <div id="chart_container" className="Chart-wrapper">
          <Chart
            selecteddata={selectedData}
            selectedPrefecture={checkedPrefecture}
          />
        </div>
      </div>
    </div>
  );
}
export default Prefecture;
