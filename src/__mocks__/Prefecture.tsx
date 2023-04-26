import React, { useState, useEffect } from "react";
import Checkbox from "../Checkbox";
import Chart from "../Chart";
import Selectbox from "../Selectbox";
//APIリクエストを行う代わりに、ダミーのデータを表示させるためのモック関数
function Prefecture() {
  //グラフを書く上で必要なフックを定義
  //都道府県の名前を羅列したフック。テスト用なので、8個だけにする。
  let prefecture_array: { prefCode: number; prefName: string }[] = [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森県" },
    { prefCode: 3, prefName: "岩手県" },
    { prefCode: 4, prefName: "宮城県" },
    { prefCode: 5, prefName: "秋田県" },
    { prefCode: 6, prefName: "山形県" },
    { prefCode: 7, prefName: "福島県" },
    { prefCode: 8, prefName: "茨城県" },
  ];
  let prefecture_empty_array: { prefCode: number; prefName: string }[] = [];
  const [prefectures, setPrefectures] = useState(prefecture_array);
  //チェックした都道府県の名前を格納するフック
  const [checkedPrefecture, setCheckedPrefecture] = useState(
    prefecture_empty_array
  );
  //選択したデータを格納したフック
  const [selectedData, setSelectedData] = useState("TP");

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
