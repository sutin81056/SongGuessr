const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

let test = "connection success";
let users = [];
let currentSong = { videoId: "", title: "", dj: "" };

app.post("/users", (req, res) => {
  const { name } = req.body;
  if (name && !users.some((user) => user.name === name)) {
    users.push({ name });
  }
  res.json(users);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/song", (req, res) => {
  const { videoId, title, dj } = req.body;
  if (videoId && title && dj) {
    currentSong = { videoId, title, dj };
  }
  res.json(currentSong);
});

app.get("/song", (req, res) => {
  res.json(currentSong);
});

app.get("/", (req, res) => {
  res.json(test);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/*
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

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("🎵 Guess The Song Game Backend is Running! 🎵");
});
*/
