const { ifError } = require("assert");
const fs = require("fs");
const http = require("http");
const PORT = 2563;
const user = "Chandni";
const timeStamp = new Date().toLocaleString();

const server = http.createServer((req, res) => {
    if(req.url == "/home" && req.method == "GET"){
        res.end("Hello from Home");
    }else if(req.url == "/about" && req.method == "GET"){
        fs.writeFileSync("log.txt", `${user} visited ${req.url} at ${timeStamp} \n`);
        res.end("Hello from About")
    }else if(req.url == "/about" && req.method == "POST"){
        fs.writeFileSync("log.txt", `${user} visited ${req.url} at ${timeStamp} \n`);
        res.end("New User Created!");
    }else if(req.url == "/users"){
        fs.writeFileSync("log.txt", `${user} visited ${req.url} at ${timeStamp} \n`);
        res.end("Hello from users");
    }else{
        fs.writeFileSync("log.txt", `${user} visited ${req.url} at ${timeStamp} \n`);
        res.end("Hello from the Server");
    }
})

server.listen(PORT, (err) => {
    if(!err){
        console.log("Server is live!");
    }else{
        console.log("enoucntered with an error ", err);
    }
})

