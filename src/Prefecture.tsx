import React, { useState, useMemo, useEffect } from "react";
import { JsxElement } from "typescript";
import Checkbox from "./Checkbox";
import Chart from "./Chart";

function Prefecture() {
  //グラフを書く上で必要なフックを定義
  //都道府県の名前を羅列したフック
  let prefecture_array:{prefCode:number, prefName:string}[] = [];
  const [prefectures, setPrefectures] = useState(prefecture_array);
  //チェックした都道府県の名前を格納するフック
  const [checkedPrefecture, setCheckedPrefecture] = useState(prefecture_array);
  //選択したデータを格納したフック
  const [selectedData, setSelectedData] = useState("総人口");
  //グラフを書くために必要なデータを格納するフック
  let prot_data:{year:number, prefName:string , prefCode:number, value:number}[] = [];
  const [prefectureData, setPrefectureData] = useState(prot_data);

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

  //チェックボックスにチェックがされた時、その都道府県コードと名前をフックに格納するため
  const doCheck = (e:any) => {
    console.log('docheck')
    //チェックされた都道府県のデータを確認
    let pref_data = prefectures[e.target.value];
    //すでにそのデータが格納されているかどうかを確認し、あればそのデータを消去、なければ格納。
    if(checkedPrefecture.includes(pref_data)){
      let index_num = checkedPrefecture.indexOf(pref_data);
      checkedPrefecture.splice(index_num, 1);
      setCheckedPrefecture(checkedPrefecture);
    }else{
      checkedPrefecture.push(pref_data);
      setCheckedPrefecture(checkedPrefecture);
    }
    console.log(checkedPrefecture);
    //prefectureDataも更新する。
    getData();
    console.log(prefectureData);
  }

  //グラフを書くために必要なデータをAPIから取得するメソッド
  function getData(){
    prefectureData.splice(0, prefectureData.length);
    setPrefectureData(prefectureData);
    //チェックされた都道府県全てに対して、データを取得する。
    checkedPrefecture.forEach((value) => {
      let url = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=' + value.prefCode;
      fetch(url,{
        method:'GET',
        headers: {
          "X-API-KEY": "x6Cenztodyveqvc5b4RlSf0Dvzwgv5sTK2jgyo05",
        },
      })
      .then(res => res.json())
      .then(res => {
        console.log('getData');

        //受け取ったデータを元に、グラフを作るためのデータを編集し、フックに格納する。
        let data_num = 0;
        if(selectedData == "総人口"){
          data_num = 0;
        }else if(selectedData == "年少人口"){
          data_num = 1;
        }else if(selectedData == "生産年齢人口"){
          data_num = 2;
        }else{
          data_num = 3;
        }
        //指定したデータの配列を取得
        const data_array = res.result.data[data_num].data;
        for(let item of data_array){
          let data = {year:item.year, prefName:value.prefName , prefCode:value.prefCode, value:item.value};
          prefectureData.push(data);
          setPrefectureData(prefectureData);
        }
      })
    })
  }

  const prefectures_style = {
    margin:"0 auto",
    width:"80%",
    display: "grid",
    gridTemplateColumns:"17% 17% 17% 17% 17%",
    gridTemplateRows:'7% 7% 7% 7% 7% 7% 7% 7% 7% 7%',
    gap:"3%",
  }

  return (
    <div style={prefectures_style}>
      {prefectures.map((value, key) => {
        console.log('checkbox');
        return (
          <Checkbox
            Code={value.prefCode}
            Name={value.prefName}
            doCheck={doCheck}
            Num={key}
            key={value.prefCode}
          />
        );
      })}
      {/* <Chart data={prefectureData} checkedPrefecture={checkedPrefecture} key={1} /> */}
    </div>
  );
}

//グラフを描くコンポーネントを追加。


export default Prefecture;
