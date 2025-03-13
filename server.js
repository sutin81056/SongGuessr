const io = require("socket.io")(5000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let users = []; // 存儲在線使用者 [{ id, name }]

io.on("connection", (socket) => {
  console.log("新用戶連線:", socket.id);

  // 接收前端發送的用戶名稱
  socket.on("newUser", (name) => {
    users.push({ id: socket.id, name });
    io.emit("updateUsers", users); // 更新所有用戶的在線列表
  });

  // 監聽新歌曲事件
  socket.on("newSong", (data) => {
    io.emit("newSong", data);
  });

  // 當用戶斷線時移除
  socket.on("disconnect", () => {
    users = users.filter((user) => user.id !== socket.id);
    io.emit("updateUsers", users);
  });
});

// 讓 Railway 自動選擇 PORT
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
