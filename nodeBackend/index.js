const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  // socket.emit("connected", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
  });

  socket.on("user_html", (html, room) => {
    // socket.to(data.room).emit("receive_message", data);
    console.log(html);
    socket.to(room).emit("receive_message", html);
  });
});

io.on("disconnect", (socket) => {
  console.log("User Disconnected", socket.id);
})

server.listen(5000, () => {
  console.log("SERVER IS RUNNING");
});