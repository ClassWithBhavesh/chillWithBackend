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

// Middlewares : 
server.use((req, res, next) => {
    console.log("User Data Exists!");
    next();
})

server.use(validateData);


server.get("/users", (req, res) => {
    // console.log(userData);
    let HTML_body = `
        <ul>
            ${userData.map((user, id) => {
                return `<li>${user.first_name} ${user.last_name}</li> <br>`
            }).join("")}
        </ul>
    `;
    res.send(HTML_body);
})

function validateData(req, res, next) {
    console.log("User data validated successfully!");
    next()
}

server.get("/user/:id", (req, res) => {
    const userId = Number(req.params.id);
    console.log(typeof(userId));
    const userdata = userData.find((user) => {
        return user.id === userId;
    })
    res.send(userdata);
})

server.post("/addUser", (req, res) => {
    const newUser = req.body;
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

server.put("/api/updateUser/:id", (req, res) => {
    const userId = Number(req.params.id);
    const existData = req.body;

    const userIndex = userData.findIndex(user => user.id === userId);
    if(userIndex !== -1){
        userData[userIndex] = {...userData[userIndex], ...existData};
        fs.writeFile("userData.json", JSON.stringify(userData), (err, data) => {
            res.status(201).json({
                message: `user with ${userId} is updated successfully!`
            })
        })
    }else{
        res.status(404).json({
            errorMessage: `user with ${userId} not found!`
        })
    }
    res.end("User Updated Successfully!");
})

server.listen(PORT, (err) => {
    if(!err){
        console.log("Server is Live!");
    }else{
        console.log("server did not responded : ", err);
    }
})

