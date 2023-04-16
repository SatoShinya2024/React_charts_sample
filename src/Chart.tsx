import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

//年度ごとのデータを取得する上で必要なインターフェース
interface anual {
  year: number;
  北海道: number;
  青森県: number;
  岩手県: number;
  宮城県: number;
  秋田県: number;
  山形県: number;
  福島県: number;
  茨城県: number;
  栃木県: number;
  群馬県: number;
  埼玉県: number;
  千葉県: number;
  東京都: number;
  神奈川県: number;
  新潟県: number;
  富山県: number;
  石川県: number;
  福井県: number;
  山梨県: number;
  長野県: number;
  岐阜県: number;
  静岡県: number;
  愛知県: number;
  三重県: number;
  滋賀県: number;
  京都府: number;
  大阪府: number;
  兵庫県: number;
  奈良県: number;
  和歌山県: number;
  鳥取県: number;
  島根県: number;
  岡山県: number;
  広島県: number;
  山口県: number;
  徳島県: number;
  香川県: number;
  愛媛県: number;
  高知県: number;
  福岡県: number;
  佐賀県: number;
  長崎県: number;
  熊本県: number;
  大分県: number;
  宮崎県: number;
  鹿児島県: number;
  沖縄県: number;
}
interface prefData {
  prefCode: number;
  prefName: string;
}

function Chart(prop: { selecteddata: string; selectedPrefecture: prefData[] }) {
  //総人口、年少人口、労働生産人口、老年人口のデータを格納するフック。
  let prot_anual_data: anual[] = [];
  const [TPData, setTPData] = useState(prot_anual_data);
  const [YPData, setYPData] = useState(prot_anual_data);
  const [WPData, setWPData] = useState(prot_anual_data);
  const [GPData, setGPData] = useState(prot_anual_data);
  //グラフに反映させる、選択されたデータを格納するフック
  const [chartData, setChartData] = useState(TPData);
  //グラフを作る際に使用する色を原色大辞典から47色をフックに格納する。
  const color_array = [
    "#0000ff",
    "#008000",
    "#ffff00",
    "#ff0000",
    "#00ffff",
    "#00ff00",
    "#ffa500",
    "#800080",
    "#000080",
    "#556b2f",
    "#800000",
    "#ff1493",
    "#00ced1",
    "#808000",
    "#a52a2a",
    "#9400d3",
    "#808080",
    "#778899",
    "#008080",
    "#f08080",
    "#ff00ff",
    "#ffdead",
    "#00bfff",
    "#006400",
    "#f0e68c",
    "#ff6347",
    "#a9a9a9",
    "#5f9ea0",
    "#00fa9a",
    "#b8860b",
    "#ff00ff",
    "#ffebcd",
    "#6495ed",
    "#7fffd4",
    "#bc8f8f",
    "#7b68ee",
    "#ffe4e1",
    "#40e0d0",
    "#bdb76b",
    "#b22222",
    "#8a2be2",
    "#87cefa",
    "#eee8aa",
    "#b8860b",
    "#ee82ee",
    "#008b8b",
    "#ffd700",
    "#d8bfd8",
    "#2f4f4f",
  ];
  const [Colors, setColors] = useState(color_array);
  //APIからデータを取得し、それをグラフ作成用にまとめる。
  useEffect(() => {
    let TP_data: anual[] = [];
    let YP_data: anual[] = [];
    let WP_data: anual[] = [];
    let GP_data: anual[] = [];
    let all_data: {
      year: number;
      prefCode: number;
      TP: number;
      YP: number;
      WP: number;
      GP: number;
    }[] = [];
    for (let i = 1; i < 48; i++) {
      //APIから各都道府県のデータを取得
      console.log("useChartData");
      let url =
        "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=" +
        i;
      fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": "x6Cenztodyveqvc5b4RlSf0Dvzwgv5sTK2jgyo05",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const result_data00 = res.result.data[0].data;
          const result_data01 = res.result.data[1].data;
          const result_data02 = res.result.data[2].data;
          const result_data03 = res.result.data[3].data;
          //APIから取得したデータを各データリストに振り分けるための準備をする。
          for (let j = 0; j < result_data00.length; j++) {
            let data = {
              year: result_data00[j].year,
              prefCode: i,
              TP: result_data00[j].value,
              YP: result_data01[j].value,
              WP: result_data02[j].value,
              GP: result_data03[j].value,
            };
            all_data.push(data);
          }
        })
        .then(() => {
          //全てのデータがそろった時のみ、次の処理を行う。
          if (all_data.length % 47 === 0) {
            // console.log(all_data);
            //データを年代順にソート
            all_data.sort((a, b) => {
              return a.year - b.year;
            });
            //都道府県データを各個別データに振り分けるための配列
            let pf_data01: number[] = [];
            let pf_data02: number[] = [];
            let pf_data03: number[] = [];
            let pf_data04: number[] = [];

            pf_data01.push(all_data[0].year);
            pf_data02.push(all_data[0].year);
            pf_data03.push(all_data[0].year);
            pf_data04.push(all_data[0].year);
            for (let j = 0; j < 47; j++) {
              pf_data01.push(0);
              pf_data02.push(0);
              pf_data03.push(0);
              pf_data04.push(0);
            }
            all_data.forEach((value) => {
              if (value.year === pf_data01[0]) {
                //年代が変わっていないのであれば、配列にデータを格納する。
                pf_data01[value.prefCode] = value.TP;
                pf_data02[value.prefCode] = value.YP;
                pf_data03[value.prefCode] = value.WP;
                pf_data04[value.prefCode] = value.GP;
              } else {
                //年代が変わっていたのならば、配列に格納していたデータを各データリストに振り分ける。
                let data01 = {
                  year: pf_data01[0],
                  北海道: pf_data01[1],
                  青森県: pf_data01[2],
                  岩手県: pf_data01[3],
                  宮城県: pf_data01[4],
                  秋田県: pf_data01[5],
                  山形県: pf_data01[6],
                  福島県: pf_data01[7],
                  茨城県: pf_data01[8],
                  栃木県: pf_data01[9],
                  群馬県: pf_data01[10],
                  埼玉県: pf_data01[11],
                  千葉県: pf_data01[12],
                  東京都: pf_data01[13],
                  神奈川県: pf_data01[14],
                  新潟県: pf_data01[15],
                  富山県: pf_data01[16],
                  石川県: pf_data01[17],
                  福井県: pf_data01[18],
                  山梨県: pf_data01[19],
                  長野県: pf_data01[20],
                  岐阜県: pf_data01[21],
                  静岡県: pf_data01[22],
                  愛知県: pf_data01[23],
                  三重県: pf_data01[24],
                  滋賀県: pf_data01[25],
                  京都府: pf_data01[26],
                  大阪府: pf_data01[27],
                  兵庫県: pf_data01[28],
                  奈良県: pf_data01[29],
                  和歌山県: pf_data01[30],
                  鳥取県: pf_data01[31],
                  島根県: pf_data01[32],
                  岡山県: pf_data01[33],
                  広島県: pf_data01[34],
                  山口県: pf_data01[35],
                  徳島県: pf_data01[36],
                  香川県: pf_data01[37],
                  愛媛県: pf_data01[38],
                  高知県: pf_data01[39],
                  福岡県: pf_data01[40],
                  佐賀県: pf_data01[41],
                  長崎県: pf_data01[42],
                  熊本県: pf_data01[43],
                  大分県: pf_data01[44],
                  宮崎県: pf_data01[45],
                  鹿児島県: pf_data01[46],
                  沖縄県: pf_data01[47],
                };
                let data02 = {
                  year: pf_data02[0],
                  北海道: pf_data02[1],
                  青森県: pf_data02[2],
                  岩手県: pf_data02[3],
                  宮城県: pf_data02[4],
                  秋田県: pf_data02[5],
                  山形県: pf_data02[6],
                  福島県: pf_data02[7],
                  茨城県: pf_data02[8],
                  栃木県: pf_data02[9],
                  群馬県: pf_data02[10],
                  埼玉県: pf_data02[11],
                  千葉県: pf_data02[12],
                  東京都: pf_data02[13],
                  神奈川県: pf_data02[14],
                  新潟県: pf_data02[15],
                  富山県: pf_data02[16],
                  石川県: pf_data02[17],
                  福井県: pf_data02[18],
                  山梨県: pf_data02[19],
                  長野県: pf_data02[20],
                  岐阜県: pf_data02[21],
                  静岡県: pf_data02[22],
                  愛知県: pf_data02[23],
                  三重県: pf_data02[24],
                  滋賀県: pf_data02[25],
                  京都府: pf_data02[26],
                  大阪府: pf_data02[27],
                  兵庫県: pf_data02[28],
                  奈良県: pf_data02[29],
                  和歌山県: pf_data02[30],
                  鳥取県: pf_data02[31],
                  島根県: pf_data02[32],
                  岡山県: pf_data02[33],
                  広島県: pf_data02[34],
                  山口県: pf_data02[35],
                  徳島県: pf_data02[36],
                  香川県: pf_data02[37],
                  愛媛県: pf_data02[38],
                  高知県: pf_data02[39],
                  福岡県: pf_data02[40],
                  佐賀県: pf_data02[41],
                  長崎県: pf_data02[42],
                  熊本県: pf_data02[43],
                  大分県: pf_data02[44],
                  宮崎県: pf_data02[45],
                  鹿児島県: pf_data02[46],
                  沖縄県: pf_data02[47],
                };
                let data03 = {
                  year: pf_data03[0],
                  北海道: pf_data03[1],
                  青森県: pf_data03[2],
                  岩手県: pf_data03[3],
                  宮城県: pf_data03[4],
                  秋田県: pf_data03[5],
                  山形県: pf_data03[6],
                  福島県: pf_data03[7],
                  茨城県: pf_data03[8],
                  栃木県: pf_data03[9],
                  群馬県: pf_data03[10],
                  埼玉県: pf_data03[11],
                  千葉県: pf_data03[12],
                  東京都: pf_data03[13],
                  神奈川県: pf_data03[14],
                  新潟県: pf_data03[15],
                  富山県: pf_data03[16],
                  石川県: pf_data03[17],
                  福井県: pf_data03[18],
                  山梨県: pf_data03[19],
                  長野県: pf_data03[20],
                  岐阜県: pf_data03[21],
                  静岡県: pf_data03[22],
                  愛知県: pf_data03[23],
                  三重県: pf_data03[24],
                  滋賀県: pf_data03[25],
                  京都府: pf_data03[26],
                  大阪府: pf_data03[27],
                  兵庫県: pf_data03[28],
                  奈良県: pf_data03[29],
                  和歌山県: pf_data03[30],
                  鳥取県: pf_data03[31],
                  島根県: pf_data03[32],
                  岡山県: pf_data03[33],
                  広島県: pf_data03[34],
                  山口県: pf_data03[35],
                  徳島県: pf_data03[36],
                  香川県: pf_data03[37],
                  愛媛県: pf_data03[38],
                  高知県: pf_data03[39],
                  福岡県: pf_data03[40],
                  佐賀県: pf_data03[41],
                  長崎県: pf_data03[42],
                  熊本県: pf_data03[43],
                  大分県: pf_data03[44],
                  宮崎県: pf_data03[45],
                  鹿児島県: pf_data03[46],
                  沖縄県: pf_data03[47],
                };
                let data04 = {
                  year: pf_data04[0],
                  北海道: pf_data04[1],
                  青森県: pf_data04[2],
                  岩手県: pf_data04[3],
                  宮城県: pf_data04[4],
                  秋田県: pf_data04[5],
                  山形県: pf_data04[6],
                  福島県: pf_data04[7],
                  茨城県: pf_data04[8],
                  栃木県: pf_data04[9],
                  群馬県: pf_data04[10],
                  埼玉県: pf_data04[11],
                  千葉県: pf_data04[12],
                  東京都: pf_data04[13],
                  神奈川県: pf_data04[14],
                  新潟県: pf_data04[15],
                  富山県: pf_data04[16],
                  石川県: pf_data04[17],
                  福井県: pf_data04[18],
                  山梨県: pf_data04[19],
                  長野県: pf_data04[20],
                  岐阜県: pf_data04[21],
                  静岡県: pf_data04[22],
                  愛知県: pf_data04[23],
                  三重県: pf_data04[24],
                  滋賀県: pf_data04[25],
                  京都府: pf_data04[26],
                  大阪府: pf_data04[27],
                  兵庫県: pf_data04[28],
                  奈良県: pf_data04[29],
                  和歌山県: pf_data04[30],
                  鳥取県: pf_data04[31],
                  島根県: pf_data04[32],
                  岡山県: pf_data04[33],
                  広島県: pf_data04[34],
                  山口県: pf_data04[35],
                  徳島県: pf_data04[36],
                  香川県: pf_data04[37],
                  愛媛県: pf_data04[38],
                  高知県: pf_data04[39],
                  福岡県: pf_data04[40],
                  佐賀県: pf_data04[41],
                  長崎県: pf_data04[42],
                  熊本県: pf_data04[43],
                  大分県: pf_data04[44],
                  宮崎県: pf_data04[45],
                  鹿児島県: pf_data04[46],
                  沖縄県: pf_data04[47],
                };
                TP_data.push(data01);
                YP_data.push(data02);
                WP_data.push(data03);
                GP_data.push(data04);

                //振り分けあと、配列をリセットする。
                pf_data01[0] = value.year;
                pf_data02[0] = value.year;
                pf_data03[0] = value.year;
                pf_data04[0] = value.year;
                for (let j = 1; j < 48; j++) {
                  if (i === value.prefCode) {
                    pf_data01[j] = value.TP;
                    pf_data02[j] = value.YP;
                    pf_data03[j] = value.WP;
                    pf_data04[j] = value.GP;
                  } else {
                    pf_data01[i] = 0;
                    pf_data02[i] = 0;
                    pf_data03[i] = 0;
                    pf_data04[i] = 0;
                  }
                }
              }
              //最後の年代の時は、データを格納する。
              if (all_data.indexOf(value) === all_data.length - 1) {
                let data01 = {
                  year: pf_data01[0],
                  北海道: pf_data01[1],
                  青森県: pf_data01[2],
                  岩手県: pf_data01[3],
                  宮城県: pf_data01[4],
                  秋田県: pf_data01[5],
                  山形県: pf_data01[6],
                  福島県: pf_data01[7],
                  茨城県: pf_data01[8],
                  栃木県: pf_data01[9],
                  群馬県: pf_data01[10],
                  埼玉県: pf_data01[11],
                  千葉県: pf_data01[12],
                  東京都: pf_data01[13],
                  神奈川県: pf_data01[14],
                  新潟県: pf_data01[15],
                  富山県: pf_data01[16],
                  石川県: pf_data01[17],
                  福井県: pf_data01[18],
                  山梨県: pf_data01[19],
                  長野県: pf_data01[20],
                  岐阜県: pf_data01[21],
                  静岡県: pf_data01[22],
                  愛知県: pf_data01[23],
                  三重県: pf_data01[24],
                  滋賀県: pf_data01[25],
                  京都府: pf_data01[26],
                  大阪府: pf_data01[27],
                  兵庫県: pf_data01[28],
                  奈良県: pf_data01[29],
                  和歌山県: pf_data01[30],
                  鳥取県: pf_data01[31],
                  島根県: pf_data01[32],
                  岡山県: pf_data01[33],
                  広島県: pf_data01[34],
                  山口県: pf_data01[35],
                  徳島県: pf_data01[36],
                  香川県: pf_data01[37],
                  愛媛県: pf_data01[38],
                  高知県: pf_data01[39],
                  福岡県: pf_data01[40],
                  佐賀県: pf_data01[41],
                  長崎県: pf_data01[42],
                  熊本県: pf_data01[43],
                  大分県: pf_data01[44],
                  宮崎県: pf_data01[45],
                  鹿児島県: pf_data01[46],
                  沖縄県: pf_data01[47],
                };
                let data02 = {
                  year: pf_data02[0],
                  北海道: pf_data02[1],
                  青森県: pf_data02[2],
                  岩手県: pf_data02[3],
                  宮城県: pf_data02[4],
                  秋田県: pf_data02[5],
                  山形県: pf_data02[6],
                  福島県: pf_data02[7],
                  茨城県: pf_data02[8],
                  栃木県: pf_data02[9],
                  群馬県: pf_data02[10],
                  埼玉県: pf_data02[11],
                  千葉県: pf_data02[12],
                  東京都: pf_data02[13],
                  神奈川県: pf_data02[14],
                  新潟県: pf_data02[15],
                  富山県: pf_data02[16],
                  石川県: pf_data02[17],
                  福井県: pf_data02[18],
                  山梨県: pf_data02[19],
                  長野県: pf_data02[20],
                  岐阜県: pf_data02[21],
                  静岡県: pf_data02[22],
                  愛知県: pf_data02[23],
                  三重県: pf_data02[24],
                  滋賀県: pf_data02[25],
                  京都府: pf_data02[26],
                  大阪府: pf_data02[27],
                  兵庫県: pf_data02[28],
                  奈良県: pf_data02[29],
                  和歌山県: pf_data02[30],
                  鳥取県: pf_data02[31],
                  島根県: pf_data02[32],
                  岡山県: pf_data02[33],
                  広島県: pf_data02[34],
                  山口県: pf_data02[35],
                  徳島県: pf_data02[36],
                  香川県: pf_data02[37],
                  愛媛県: pf_data02[38],
                  高知県: pf_data02[39],
                  福岡県: pf_data02[40],
                  佐賀県: pf_data02[41],
                  長崎県: pf_data02[42],
                  熊本県: pf_data02[43],
                  大分県: pf_data02[44],
                  宮崎県: pf_data02[45],
                  鹿児島県: pf_data02[46],
                  沖縄県: pf_data02[47],
                };
                let data03 = {
                  year: pf_data03[0],
                  北海道: pf_data03[1],
                  青森県: pf_data03[2],
                  岩手県: pf_data03[3],
                  宮城県: pf_data03[4],
                  秋田県: pf_data03[5],
                  山形県: pf_data03[6],
                  福島県: pf_data03[7],
                  茨城県: pf_data03[8],
                  栃木県: pf_data03[9],
                  群馬県: pf_data03[10],
                  埼玉県: pf_data03[11],
                  千葉県: pf_data03[12],
                  東京都: pf_data03[13],
                  神奈川県: pf_data03[14],
                  新潟県: pf_data03[15],
                  富山県: pf_data03[16],
                  石川県: pf_data03[17],
                  福井県: pf_data03[18],
                  山梨県: pf_data03[19],
                  長野県: pf_data03[20],
                  岐阜県: pf_data03[21],
                  静岡県: pf_data03[22],
                  愛知県: pf_data03[23],
                  三重県: pf_data03[24],
                  滋賀県: pf_data03[25],
                  京都府: pf_data03[26],
                  大阪府: pf_data03[27],
                  兵庫県: pf_data03[28],
                  奈良県: pf_data03[29],
                  和歌山県: pf_data03[30],
                  鳥取県: pf_data03[31],
                  島根県: pf_data03[32],
                  岡山県: pf_data03[33],
                  広島県: pf_data03[34],
                  山口県: pf_data03[35],
                  徳島県: pf_data03[36],
                  香川県: pf_data03[37],
                  愛媛県: pf_data03[38],
                  高知県: pf_data03[39],
                  福岡県: pf_data03[40],
                  佐賀県: pf_data03[41],
                  長崎県: pf_data03[42],
                  熊本県: pf_data03[43],
                  大分県: pf_data03[44],
                  宮崎県: pf_data03[45],
                  鹿児島県: pf_data03[46],
                  沖縄県: pf_data03[47],
                };
                let data04 = {
                  year: pf_data04[0],
                  北海道: pf_data04[1],
                  青森県: pf_data04[2],
                  岩手県: pf_data04[3],
                  宮城県: pf_data04[4],
                  秋田県: pf_data04[5],
                  山形県: pf_data04[6],
                  福島県: pf_data04[7],
                  茨城県: pf_data04[8],
                  栃木県: pf_data04[9],
                  群馬県: pf_data04[10],
                  埼玉県: pf_data04[11],
                  千葉県: pf_data04[12],
                  東京都: pf_data04[13],
                  神奈川県: pf_data04[14],
                  新潟県: pf_data04[15],
                  富山県: pf_data04[16],
                  石川県: pf_data04[17],
                  福井県: pf_data04[18],
                  山梨県: pf_data04[19],
                  長野県: pf_data04[20],
                  岐阜県: pf_data04[21],
                  静岡県: pf_data04[22],
                  愛知県: pf_data04[23],
                  三重県: pf_data04[24],
                  滋賀県: pf_data04[25],
                  京都府: pf_data04[26],
                  大阪府: pf_data04[27],
                  兵庫県: pf_data04[28],
                  奈良県: pf_data04[29],
                  和歌山県: pf_data04[30],
                  鳥取県: pf_data04[31],
                  島根県: pf_data04[32],
                  岡山県: pf_data04[33],
                  広島県: pf_data04[34],
                  山口県: pf_data04[35],
                  徳島県: pf_data04[36],
                  香川県: pf_data04[37],
                  愛媛県: pf_data04[38],
                  高知県: pf_data04[39],
                  福岡県: pf_data04[40],
                  佐賀県: pf_data04[41],
                  長崎県: pf_data04[42],
                  熊本県: pf_data04[43],
                  大分県: pf_data04[44],
                  宮崎県: pf_data04[45],
                  鹿児島県: pf_data04[46],
                  沖縄県: pf_data04[47],
                };
                TP_data.push(data01);
                setTPData(TP_data);
                YP_data.push(data02);
                setYPData(YP_data);
                WP_data.push(data03);
                setWPData(WP_data);
                GP_data.push(data04);
                setGPData(GP_data);
              }
            });
          }
        });
    }
  }, []);

  //selectedDataの変化と各人口データの変化に合わせてグラフに使用するデータを変化させる副作用フック
  useEffect(() => {
    if (prop.selecteddata === "YP") {
      setChartData(YPData);
    } else if (prop.selecteddata === "WP") {
      setChartData(WPData);
    } else if (prop.selecteddata === "GP") {
      setChartData(GPData);
    } else {
      setChartData(TPData);
    }
  }, [TPData, YPData, WPData, GPData, prop.selecteddata]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        {prop.selectedPrefecture.map((value, key) => {
          //グラフの色をここで決定。
          let color = Colors[key];
          console.log(Colors.length);
          return (
            <Line
              type="monotone"
              dataKey={value.prefName}
              stroke={color}
              key={key}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
