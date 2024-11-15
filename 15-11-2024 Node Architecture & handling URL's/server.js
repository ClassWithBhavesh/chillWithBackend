const http = require("http");
const PORT = 8000;
const reqURL = require("url");

const Server = http.createServer((req, res) => {
    if(req.url === "/favicon.ico"){
        res.end();
    }else if(req.url === "/" && req.method === "GET"){
        res.end("Hello from HomePage!");
    }else if(req.url === "/about" && req.method === "GET"){
        res.end("Hello About!");
    }else if(reqURL.parse(req.url).pathname === "/user" && req.method === "GET"){
        console.log(reqURL.parse(req.url, true));
        console.log(typeof(reqURL.parse(req.url, true).query));
        res.end(`Hello ${reqURL.parse(req.url, true).query.username}!`);
    }else{
        res.writeHead(404);
        res.end(`404! ${req.url} Not Found`);
    }
})

Server.listen(PORT, (err) => {
    if(!err){
        console.log("Server is live...")
    }else{
        console.log("Error Encountered : ", err);
    }
})
