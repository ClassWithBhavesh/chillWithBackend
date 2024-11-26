const express = require("express");
const PORT = 4589;
const server = express();
const userData = require("./userData.json");
const fs = require("fs");
const mongoose = require("mongoose");
const userRouter = require("./Routes/userRoutes.js");

server.use(express.urlencoded({extended: false}));

mongoose.connect("mongodb://127.0.0.1:27017/pracdb").then(() => {
    console.log("database connected!");
}).catch((err) => {
    console.log("Encountered with an error : ", err);
})

server.get("/", (req, res) => {
    res.send("Hello from Home");
})

server.use("/user/api", userRouter);

server.listen(PORT, (err) => {
    if(!err){
        console.log("Server is Live!");
    }else{
        console.log("server did not responded : ", err);
    }
})

