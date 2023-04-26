import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
//APIリクエストを行わず、ダミーのデータを表示させるためのモック関数
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
}
interface prefData {
  prefCode: number;
  prefName: string;
}

function Chart(prop: { selecteddata: string; selectedPrefecture: prefData[] }) {
  //総人口、年少人口、労働生産人口、老年人口のデータを格納するフック。
  //テストの結果を見やすくするため、全ての都道府県でデータを同一にする。
  //総人口、年少人口、労働生産人口、老年人口の区別がつきやすいように、10倍の変化をつける。
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
  //グラフを作る際に使用する色を原色大辞典から8色をフックに格納する。
  const color_array = [
    "#0000ff",
    "#008000",
    "#ff0000",
    "#00ffff",
    "#00ff00",
    "#ffa500",
    "#800080",
    "#000080",
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

  //responsivecontainerとtooltipはテスト時にエラーが発生するので、使わない。
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
