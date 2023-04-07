import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Checkbox from "./Checkbox";
import Prefecture from "./Prefecture";
import Chart from "./Chart";

function App() {
  return (
    <div className="App">
      <header className="App-header">都道府県別　総人口推移グラフ</header>
      <div>
      <Prefecture />
      </div>
      {/* <footer>
        <p>出典：RESAS（地域経済分析システム）</p>
        <p>RESAS（地域経済分析システム）を加工して作成</p>
      </footer> */}
    </div>
  );
}

export default App;
