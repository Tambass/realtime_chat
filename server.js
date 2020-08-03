const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Run when client connects
io.on("connection", (socket) => {
  //Welcome current user
  socket.emit("message", "Welcome to LiveChat!");

  // Broadcast when a user connect
  socket.broadcast.emit("message", "A user has joined the chat");

  // Runs when client disconnect
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat");
  });
});

const PORT = 4000 || process.env.PORT;

server.listen(PORT, () => console.log(`Le server tourne sur le port ${PORT}`));
