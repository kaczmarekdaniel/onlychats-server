// imports

import express from "express";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config.js";

// middlewares

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(morgan("dev"));

const CONNECTION_URL = process.env.MongoURL;
const PORT = process.env.PORT || 4000;
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("mongoose connected"))
  .catch((error) => console.log(error.message));

const server = app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}...`);
});

const io = new Server(server);
io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    const returnValue = {
      room: data.room,
      message: `${data.user} joined`,
      type: data.type,
    };

    io.in(data.room).emit("receive_message", returnValue);
    socket.join(data.room);
    console.log("User Joined Room: " + data.room);
  });

  socket.on("leave_room", (data) => {
    socket.leave(data);
    console.log("User Left Room: " + data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});
