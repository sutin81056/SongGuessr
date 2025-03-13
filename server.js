const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
require("dotenv").config();

const app = express();
app.use(cors()); // 確保 Express API 也允許 CORS

const server = http.createServer(app); // 讓 Express & WebSocket 共享 server

const io = socketIo(server, {
  cors: {
    origin:
      process.env.FRONTEND_URL ||
      "https://song-guessr-frontend-pz8gjnnin-sutin81056s-projects.vercel.app", // 設定允許的前端網址
    methods: ["GET", "POST"],
  },
});

let users = [];

io.on("connection", (socket) => {
  console.log("新用戶連線:", socket.id);

  socket.on("newUser", (name) => {
    users.push({ id: socket.id, name });
    io.emit("updateUsers", users);
  });

  socket.on("newSong", (data) => {
    io.emit("newSong", data);
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.id !== socket.id);
    io.emit("updateUsers", users);
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("🎵 Guess The Song Game Backend is Running! 🎵");
});
