const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "ChatCore Bot";

//Run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    

    //Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to LiveChat!"));

    // Broadcast when a user connect
    socket.broadcast.emit(
      "message",
      formatMessage(botName, "A user has joined the chat")
    );
  });

  //Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    io.emit("message", formatMessage("USER", msg));
  });

  // Runs when client disconnect
  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botName, "A user has left the chat"));
  });
});

const PORT = 4000 || process.env.PORT;

server.listen(PORT, () => console.log(`Le server tourne sur le port ${PORT}`));
