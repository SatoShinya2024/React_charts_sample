import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

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
  let TP_mock_data: anual[] = [];
  let YP_mock_data: anual[] = [];
  let WP_mock_data: anual[] = [];
  let GP_mock_data: anual[] = [];
  for (let i = 0; i < 5; i++) {
    let year = 1960 + i * 5;
    let TP_data = {
      year: year,
      北海道: 10,
      青森県: 10,
      岩手県: 10,
      宮城県: 10,
      秋田県: 10,
      山形県: 10,
      福島県: 10,
      茨城県: 10,
      栃木県: 10,
      群馬県: 10,
      埼玉県: 10,
      千葉県: 10,
      東京都: 10,
      神奈川県: 10,
      新潟県: 10,
      富山県: 10,
      石川県: 10,
      福井県: 10,
      山梨県: 10,
      長野県: 10,
      岐阜県: 10,
      静岡県: 10,
      愛知県: 10,
      三重県: 10,
      滋賀県: 10,
      京都府: 10,
      大阪府: 10,
      兵庫県: 10,
      奈良県: 10,
      和歌山県: 10,
      鳥取県: 10,
      島根県: 10,
      岡山県: 10,
      広島県: 10,
      山口県: 10,
      徳島県: 10,
      香川県: 10,
      愛媛県: 10,
      高知県: 10,
      福岡県: 10,
      佐賀県: 10,
      長崎県: 10,
      熊本県: 10,
      大分県: 10,
      宮崎県: 10,
      鹿児島県: 10,
      沖縄県: 10,
    };
    let YP_data = {
      year: year,
      北海道: 100,
      青森県: 100,
      岩手県: 100,
      宮城県: 100,
      秋田県: 100,
      山形県: 100,
      福島県: 100,
      茨城県: 100,
      栃木県: 100,
      群馬県: 100,
      埼玉県: 100,
      千葉県: 100,
      東京都: 100,
      神奈川県: 100,
      新潟県: 100,
      富山県: 100,
      石川県: 100,
      福井県: 100,
      山梨県: 100,
      長野県: 100,
      岐阜県: 100,
      静岡県: 100,
      愛知県: 100,
      三重県: 100,
      滋賀県: 100,
      京都府: 100,
      大阪府: 100,
      兵庫県: 100,
      奈良県: 100,
      和歌山県: 100,
      鳥取県: 100,
      島根県: 100,
      岡山県: 100,
      広島県: 100,
      山口県: 100,
      徳島県: 100,
      香川県: 100,
      愛媛県: 100,
      高知県: 100,
      福岡県: 100,
      佐賀県: 100,
      長崎県: 100,
      熊本県: 100,
      大分県: 100,
      宮崎県: 100,
      鹿児島県: 100,
      沖縄県: 100,
    };
    let WP_data = {
      year: year,
      北海道: 1000,
      青森県: 1000,
      岩手県: 1000,
      宮城県: 1000,
      秋田県: 1000,
      山形県: 1000,
      福島県: 1000,
      茨城県: 1000,
      栃木県: 1000,
      群馬県: 1000,
      埼玉県: 1000,
      千葉県: 1000,
      東京都: 1000,
      神奈川県: 1000,
      新潟県: 1000,
      富山県: 1000,
      石川県: 1000,
      福井県: 1000,
      山梨県: 1000,
      長野県: 1000,
      岐阜県: 1000,
      静岡県: 1000,
      愛知県: 1000,
      三重県: 1000,
      滋賀県: 1000,
      京都府: 1000,
      大阪府: 1000,
      兵庫県: 1000,
      奈良県: 1000,
      和歌山県: 1000,
      鳥取県: 1000,
      島根県: 1000,
      岡山県: 1000,
      広島県: 1000,
      山口県: 1000,
      徳島県: 1000,
      香川県: 1000,
      愛媛県: 1000,
      高知県: 1000,
      福岡県: 1000,
      佐賀県: 1000,
      長崎県: 1000,
      熊本県: 1000,
      大分県: 1000,
      宮崎県: 1000,
      鹿児島県: 1000,
      沖縄県: 1000,
    };
    let GP_data = {
      year: year,
      北海道: 10000,
      青森県: 10000,
      岩手県: 10000,
      宮城県: 10000,
      秋田県: 10000,
      山形県: 10000,
      福島県: 10000,
      茨城県: 10000,
      栃木県: 10000,
      群馬県: 10000,
      埼玉県: 10000,
      千葉県: 10000,
      東京都: 10000,
      神奈川県: 10000,
      新潟県: 10000,
      富山県: 10000,
      石川県: 10000,
      福井県: 10000,
      山梨県: 10000,
      長野県: 10000,
      岐阜県: 10000,
      静岡県: 10000,
      愛知県: 10000,
      三重県: 10000,
      滋賀県: 10000,
      京都府: 10000,
      大阪府: 10000,
      兵庫県: 10000,
      奈良県: 10000,
      和歌山県: 10000,
      鳥取県: 10000,
      島根県: 10000,
      岡山県: 10000,
      広島県: 10000,
      山口県: 10000,
      徳島県: 10000,
      香川県: 10000,
      愛媛県: 10000,
      高知県: 10000,
      福岡県: 10000,
      佐賀県: 10000,
      長崎県: 10000,
      熊本県: 10000,
      大分県: 10000,
      宮崎県: 10000,
      鹿児島県: 10000,
      沖縄県: 10000,
    };
    TP_mock_data.push(TP_data);
    YP_mock_data.push(YP_data);
    WP_mock_data.push(WP_data);
    GP_mock_data.push(GP_data);
  }

  const [TPData, setTPData] = useState(TP_mock_data);
  const [YPData, setYPData] = useState(YP_mock_data);
  const [WPData, setWPData] = useState(WP_mock_data);
  const [GPData, setGPData] = useState(GP_mock_data);
  //グラフに反映させる、選択されたデータを格納するフック
  const [chartData, setChartData] = useState(TPData);
  //グラフを作る際に使用する色を原色大辞典から47色をフックに格納する。
  const color_array = [
    "#0000ff",
    "#008000",
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
    "#ffff00",
  ];
  const [Colors, setColors] = useState(color_array);

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
      <Legend />
      {prop.selectedPrefecture.map((value, key) => {
        //グラフの色をここで決定。
        let color = Colors[key];
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
  );
}

export default Chart;
