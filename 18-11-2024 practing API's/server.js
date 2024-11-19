const express = require("express");
const PORT = 4589;
const server = express();
const userData = require("./userData.json");

server.get("/", (req, res) => {
    res.send("Hello from Home");
})

server.get("/about", (req, res) => {
    res.send("Hello from About!");
})

server.get("/contact", (req, res) => {
    res.send("How may we Assist You!");
})

server.get("/user", (req, res) => {
    console.log(userData);
    let HTML_body = `
        <ul>
            ${userData.map((user, id) => {
                return `<li>${user.first_name} ${user.last_name}</li>`
            }).join("")}
        </ul>
    `;
    res.send(HTML_body);
})

server.listen(PORT, (err) => {
    if(!err){
        console.log("Server is Live!");
    }else{
        console.log("server did not responded : ", err);
    }
})

