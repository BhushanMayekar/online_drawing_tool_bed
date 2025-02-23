const express = require("express")
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors=require('cors');

const app=express();
app.use(cors({origin:'http://localhost:3000/'}))
const httpServer = createServer(app);
const io = new Server(httpServer, {cors:'http://localhost:3000/' });

io.on("connection", (socket) => {
 console.log("Server Connected")
 socket.on("beginPath",(path)=>{
    socket.broadcast.emit("beginPath",path)
 })
 socket.on("drawLine",(path)=>{
    socket.broadcast.emit("drawLine",path)
 })
 socket.on("changeConfig",(config)=>{
    socket.broadcast.emit("changeConfig",config)
 })
});

httpServer.listen(5000);