import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import "./reset.css";
import webSocket from "socket.io-client"; // npm install socket.io-client
import scissors from "static/scissors.svg";
import BattleCircle from "components/BattleCircle/BattleCircle";
import OptionButton from "components/OptionButton/OptionButton";

function App() {
  const ws = webSocket("http://localhost:5000");

  const initWebSocket = () => {
    // 對 addRoom / getMessage / getMessageAll / getMessageLess 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
    ws.on("addRoom", (message) => {
      console.log(message);
    });
    ws.on("getMessage", (message) => {
      console.log(message);
    });
    ws.on("getMessageAll", (message) => {
      console.log(message);
    });
    ws.on("getMessageLess", (message) => {
      console.log(message);
    });
  };

  const sendMessage = (name) => {
    //以 emit 送訊息，並以 getMessage / getMessageAll / getMessageLess 為名稱送給 server 捕捉
    ws.emit(name, "發送訊息");
  };

  //選擇聊天室時觸發，如果有選擇那就將房間 id 送給 Server
  // const changeRoom = (event) => {
  //   let room = event.target.innerHTML;
  //   if (room !== "") {
  //     ws.emit("addRoom", room);
  //   }
  // };

  useEffect(() => {
    // if (ws) {
    //連線成功在 console 中打印訊息
    console.log("client success connect!");
    //設定監聽
    initWebSocket();
    // }
  }, []);

  return (
    <div className="container flex">
      <div className="warp">
        <section className="connect-btn-container flex">
          <div className="connect-btn-warp">
            <h1>ROCK, PAPER, SCISSORS</h1>
          </div>
        </section>
        <section className="battle-room-container">
          <div className="battle-room-warp flex">
            <BattleCircle
              imgUrl={scissors}
              text={"ROCK"}
              conditionDirection={"right"}
              condition={"tie"}
            />
            <section className="hint-container flex">
              <div className="hint-wrap">
                <h5>3 seconds later in the next round...</h5>
              </div>
            </section>
            {/* <div className="room-container flex">
              <ul className="room-warp"> */}
            {/* NEXT STAGE AFTER 3 SECONDS */}
            {/* <li
                  onClick={(event) => {
                    changeRoom(event);
                  }}
                >
                  Room01
                </li>
                <li
                  onClick={(event) => {
                    changeRoom(event);
                  }}
                >
                  Room02
                </li>
                <li
                  onClick={(event) => {
                    changeRoom(event);
                  }}
                >
                  Room03
                </li>
                <li
                  onClick={(event) => {
                    changeRoom(event);
                  }}
                >
                  Room04
                </li>
                <li
                  onClick={(event) => {
                    changeRoom(event);
                  }}
                >
                  Room05
                </li> */}
            {/* </ul>
            </div> */}
            <BattleCircle
              imgUrl={scissors}
              text={"ROCK"}
              conditionDirection={"left"}
              condition={"tie"}
            />
          </div>
        </section>
        <section className="option-btn-container flex">
          <ul className="option-btn-warp flex">
            <li className="rock">
              <OptionButton imgUrl={scissors} text={"ROCK"} />
            </li>
            <li className="paper">
              <OptionButton imgUrl={scissors} text={"PAPER"} />
            </li>
            <li className="scissors">
              <OptionButton imgUrl={scissors} text={"SCISSORS"} />
            </li>
          </ul>
        </section>
        {/* <input
      <select
        onChange={(event) => {
          changeRoom(event);
        }}
      >
        <option value="">請選擇房間</option>
        <option value="room1">房間一</option>
        <option value="room2">房間二</option>
      </select>
      <input
        type="button"
        value="連線"
        onClick={() => {
          connectWebSocket();
        }}
      />
      <input
        type="button"
        value="送出訊息，只有自己收到回傳"
        onClick={() => {
          sendMessage("getMessage");
        }}
      /> */}
        {/* <input
        type="button"
        value="送出訊息，讓所有人收到回傳"
        onClick={() => {
          sendMessage("getMessageAll");
        }}
      /> */}
        {/* <input
        type="button"
        value="送出訊息，除了自己外所有人收到回傳"
        onClick={() => {
          sendMessage("getMessageLess");
        }}
      /> */}
      </div>
    </div>
  );
}

export default App;
