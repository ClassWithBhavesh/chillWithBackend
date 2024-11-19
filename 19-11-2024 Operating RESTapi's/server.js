const express = require("express");
const PORT = 4589;
const server = express();
const userData = require("./userData.json");
const fs = require("fs");

server.use(express.urlencoded({extended: false}));

server.get("/", (req, res) => {
    res.send("Hello from Home");
})

server.get("/about", (req, res) => {
    res.send("Hello from About!");
})

server.get("/contact", (req, res) => {
    res.send("How may we Assist You!");
})

server.get("/users", (req, res) => {
    console.log(userData);
    let HTML_body = `
        <ul>
            ${userData.map((user, id) => {
                return `<li>${user.first_name} ${user.last_name}</li> <br>`
            }).join("")}
        </ul>
    `;
    res.send(HTML_body);
})

server.get("/user/:id", (req, res) => {
    const userId = Number(req.params.id);
    console.log(typeof(userId));
    const userdata = userData.find((user) => {
        return user.id === userId;
    })
    res.send(userdata);
})

server.post("/addUser", async (req, res) => {
    const newUser = await req.body;
    userData.push({id: userData.length + 1, ...newUser});
    // console.log(newUser);
    fs.writeFile("userData.json", JSON.stringify(userData), (err, data) => {
        if(!err){
            console.log(data);
        }else{
            console.log(data);
            console.log(err);
        }
    })  
    res.status(201).json({
        serverMessage: "User Created Successfully"
    });
})

server.listen(PORT, (err) => {
    if(!err){
        console.log("Server is Live!");
    }else{
        console.log("server did not responded : ", err);
    }
})

