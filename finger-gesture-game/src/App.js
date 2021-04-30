import { useEffect, useState } from "react";
import "./App.css";
import "./reset.css";
import webSocket from "socket.io-client"; // npm install socket.io-client
import BattleCircle from "components/BattleCircle/BattleCircle";
import OptionButton from "components/OptionButton/OptionButton";
import empty from "static/empty.svg";
import rock from "static/rock.svg";
import paper from "static/paper.svg";
import scissors from "static/scissors.svg";

function App() {
  const [ws, setWs] = useState();
  // const [right]
  const [rightSvg, setRightSvg] = useState(empty);
  const [leftSvg, setLeftSvg] = useState(empty);

  const connect = () => {
    setWs(webSocket("http://localhost:5000"));
  };

  const initWebSocket = () => {
    // 對 addRoom / getMessage / getMessageAll / getMessageLess 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
    // ws.on("addRoom", (message) => {
    //   console.log(message);
    // });
    // ws.on("getMessage", (message) => {
    //   console.log(message);
    // });
    ws.on("getMessageAll", (message) => {
      console.log(message);
      setRightSvg(message);
    });
    // ws.on("getMessageLess", (message) => {
    //   console.log(message);
    // });
  };

  const sendMessage = (name) => {
    //以 emit 送訊息，並以 getMessage / getMessageAll / getMessageLess 為名稱送給 server 捕捉
    // console.log('b')
    ws.emit("getMessageAll", name);
  };

  //選擇聊天室時觸發，如果有選擇那就將房間 id 送給 Server
  // const changeRoom = (event) => {
  //   let room = event.target.innerHTML;
  //   if (room !== "") {
  //     ws.emit("addRoom", room);
  //   }
  // };

  useEffect(() => {
    if (ws) {
      //連線成功在 console 中打印訊息
      console.log("client success connect!");
      //設定監聽
      ws.on("getMessage", (message) => {
        console.log(message);
      });
      initWebSocket();
    }
  }, []);

  return (
    <div className="container flex">
      <div className="warp">
        <div
          onClick={() => {
            connect();
          }}
        >
          connect
        </div>
        <section className="connect-btn-container flex">
          <div className="connect-btn-warp">
            <h1>ROCK, PAPER, SCISSORS</h1>
          </div>
        </section>
        <section className="battle-room-container">
          <div className="battle-room-warp flex">
            <BattleCircle
              style={{ position: "relative" }}
              imgUrl={leftSvg}
              text={
                leftSvg === rock
                  ? "ROCK"
                  : leftSvg === paper
                  ? "PAPER"
                  : leftSvg === scissors
                  ? "SCISSORS"
                  : "PLAYER1"
              }
              conditionDirection={"right"}
              condition={"tie"}
            >
              <span className="battle-room-turn"></span>
            </BattleCircle>

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
              imgUrl={rightSvg}
              text={
                rightSvg === rock
                  ? "ROCK"
                  : rightSvg === paper
                  ? "PAPER"
                  : rightSvg === scissors
                  ? "SCISSORS"
                  : "PLAYER2"
              }
              conditionDirection={"left"}
              condition={"tie"}
            >
              <span className="battle-room-turn"></span>
            </BattleCircle>
          </div>
        </section>
        <section className="option-btn-container flex">
          <ul className="option-btn-warp flex">
            <li className="rock">
              <div
                onClick={() => {
                  sendMessage(rock);
                }}
              >
                <OptionButton imgUrl={rock} text={"ROCK"} />
              </div>
            </li>
            <div
              onClick={() => {
                sendMessage(paper);
              }}
            >
              <li className="paper">
                <OptionButton imgUrl={paper} text={"PAPER"} />
              </li>
            </div>
            <li className="scissors">
              <div
                onClick={() => {
                  sendMessage(scissors);
                }}
              >
                <OptionButton imgUrl={scissors} text={"SCISSORS"} />
              </div>
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
