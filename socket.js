// backend/socket.js
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("newSong", ({ videoId, dj, title }) => {
      io.emit("newSong", { videoId, dj, title });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
