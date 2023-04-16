import React from "react";
import "./App.css";
import Prefecture from "./Prefecture";

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
