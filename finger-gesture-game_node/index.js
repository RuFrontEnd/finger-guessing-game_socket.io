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
  //經過連線後在 console 中印出訊息
  console.log("success connect!");
  //監聽透過 connection 傳進來的事件
  socket.on("getMessage", (message) => {
    //回傳 message 給發送訊息的 Client
    socket.emit("getMessage", message);
  });
});
// app.get("/", (req, res) => {
//   res.send("A");
// });
