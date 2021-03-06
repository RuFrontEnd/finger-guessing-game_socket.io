// npm install socket.io
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const corsOptions = {
  credentials: true,
  orogin: function (origin, cb) {
    console.log(`origin: ${origin}`);
    cb(null, true);
  },
};

app.use(express.static(path.join(__dirname, "./public")));
app.use(cors(corsOptions));

server.listen(5000, () => {
  console.log("啟動server port:5000");
});

io.on("connection", (socket) => {
   console.log("socket.id", socket.id);
  //   //經過連線後在 console 中印出訊息
  //   console.log("server success connect!");

  //   //監聽透過 connection 傳進來的事件
  //   /*只回傳給發送訊息的 client*/
  // socket.on("getMessage", (message) => {
  //   socket.emit("getMessage", message);
  // });

  /*回傳給所有連結著的 client*/
  socket.on("getMessageAll", (message) => {
    io.sockets.emit("getMessageAll", message);
    // console.log("socket", socket);
  });

  //   /*回傳給除了發送者外所有連結著的 client*/
  //   socket.on("getMessageLess", (message) => {
  //     socket.broadcast.emit("getMessageLess", message);
  //   });

  // socket.on("addRoom", (room) => {
  //   socket.join(room);
  //   // (1)發送給在同一個 room 中除了自己外的 Client
  //   socket.to(room).emit("addRoom", "已有新人加入聊天室！");
  //   // (2)發送給在 room 中所有的 Client
  //   io.sockets.in(room).emit("addRoom", `已加入聊天室 ${room}！`);
  // });
});
