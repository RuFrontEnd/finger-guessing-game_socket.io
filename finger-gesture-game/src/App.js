import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import webSocket from "socket.io-client"; // npm install socket.io-client

function App() {
  const [ws, setWs] = useState(null);

  const connectWebSocket = () => {
    //開啟
    setWs(webSocket("http://localhost:5000"));
  };

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
  const changeRoom = (event) => {
    let room = event.target.value;
    if (room !== "") {
      ws.emit("addRoom", room);
    }
  };

  useEffect(() => {
    if (ws) {
      //連線成功在 console 中打印訊息
      console.log("client success connect!");
      //設定監聽
      initWebSocket();
    }
  }, [ws]);

  return (
    <div>
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
      />
      <input
        type="button"
        value="送出訊息，讓所有人收到回傳"
        onClick={() => {
          sendMessage("getMessageAll");
        }}
      />
      <input
        type="button"
        value="送出訊息，除了自己外所有人收到回傳"
        onClick={() => {
          sendMessage("getMessageLess");
        }}
      />
    </div>
  );
}

export default App;
