import React, { useState } from "react";
import { JsxElement } from "typescript";
import Checkbox from "./Checkbox";

function Prefecture() {
  let pref_array: { prefCode: number; prefName: string }[] = [
    { prefCode: 0, prefName: "問題が発生しました。一度ページを離れて入りなおしてください。" },
  ];
  const [prefectures, setPrefectures] = useState(pref_array);

  //ステートにAPIから取得した都道府県一覧のオブジェクトを格納する関数
  const getPrefecture = async () => {
    //リクエスト
    const resp = await fetch(
      "https://opendata.resas-portal.go.jp/api/v1/prefectures",
      {
        method: "GET",
        headers: {
          "X-API-KEY": "x6Cenztodyveqvc5b4RlSf0Dvzwgv5sTK2jgyo05",
        },
      }
    );
    //APIから取得したデータをJSON形式に変換
    const result: {
      message: string;
      result: { prefCode: number; prefName: string }[];
    } = await resp.json();

    console.log(result);
    //取得したデータをステートに格納する
    setPrefectures(result.result);
  };
  getPrefecture();
  return (
    <div>
      {pref_array.map((value) => {
        return (
          <Checkbox
            prefCode={value.prefCode}
            prefName={value.prefName}
            key={value.prefCode}
          />
        );
      })}
    </div>
  );
}

export default Prefecture;
