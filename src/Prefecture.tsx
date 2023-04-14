import React, { useState, useMemo, useEffect } from "react";
import { JsxElement } from "typescript";
import Checkbox from "./Checkbox";
import Chart from "./Chart";

//年度ごとのデータを取得する上で必要なインターフェース
interface anual {
  year: number;
  '北海道':number,'青森県':number, '岩手県':number, '宮城県':number, '秋田県':number, '山形県':number, '福島県':number, '茨城県':number, '栃木県':number, '群馬県':number, '埼玉県':number, '千葉県':number, '東京都':number, '神奈川県':number, '新潟県':number, '富山県':number, '石川県':number, '福井県':number, '山梨県':number, '長野県':number, '岐阜県':number, '静岡県':number, '愛知県':number, '三重県':number, '滋賀県':number, '京都府':number, '大阪府':number, '兵庫県':number, '奈良県':number, '和歌山県':number, '鳥取県':number, '島根県':number, '岡山県':number, '広島県':number, '山口県':number, '徳島県':number, '香川県':number, '愛媛県':number, '高知県':number, '福岡県':number, '佐賀県':number, '長崎県':number, '熊本県':number, '大分県':number, '宮崎県':number, '鹿児島県':number, '沖縄県':number
}

function Prefecture() {
  //グラフを書く上で必要なフックを定義
  //都道府県の名前を羅列したフック
  let prefecture_array:{prefCode:number, prefName:string}[] = [];
  const [prefectures, setPrefectures] = useState(prefecture_array);
  //チェックした都道府県の名前を格納するフック
  const [checkedPrefecture, setCheckedPrefecture] = useState(prefecture_array);
  //選択したデータを格納したフック
  const [selectedData, setSelectedData] = useState("総人口");

  //都道府県一覧のデータをAPIから取得するための関数
  //不必要にレンダリングされないようにする。
  useEffect(
    () => {
      fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        method: "GET",
        headers: {
          "X-API-KEY": "x6Cenztodyveqvc5b4RlSf0Dvzwgv5sTK2jgyo05",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setPrefectures(res.result)
        })
    },[]
  )

  //チェックボックスにチェックがされた時、その都道府県コードと名前をフックに格納するためのメソッド
  const docheck = ((e:any) => {
    //全てのチェックボックスを確認し、チェックがついているものをフックに格納していく。
    let checked_array:{prefCode:number, prefName:string}[] = [];
    for(let item of prefectures){
      let prefId = "prefecture" + item.prefCode;
      if(document.querySelector<HTMLInputElement>("#" + prefId)?.checked){
        checked_array.push(item);
      }
    }
    setCheckedPrefecture(checked_array);
    console.log('docheck')
    console.log(checkedPrefecture);
  })

  


  const prefectures_style = {
    margin:"0 auto",
    width:"80%",
    display: "grid",
    gridTemplateColumns:"17% 17% 17% 17% 17%",
    gridTemplateRows:'7% 7% 7% 7% 7% 7% 7% 7% 7% 7%',
    gap:"3%",
  }

  const chart_style = {
    height:"500px",
  }

  return (
    <div>
      <div style={prefectures_style}>
        {prefectures.map((value, key) => {
          console.log('checkbox');
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
      <div style={chart_style} id="chart_container">
        <Chart selecteddata={selectedData} selectedPrefecture={checkedPrefecture} />
      </div>
    </div>
    
  );
}
export default Prefecture;
