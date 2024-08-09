const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors');

const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // Allow all origins (you can specify specific origins here)
        methods: ["GET", "POST"], // Allowed methods
        allowedHeaders: ["my-custom-header"], // Custom headers (if any)
        credentials: true // Allow credentials (cookies, authorization headers, etc.)
    }
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("message", (msg) => {
    console.log("Message received: " + msg);
    // Broadcast the message to all connected clients
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
