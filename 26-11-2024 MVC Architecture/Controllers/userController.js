const userData = require("../userData.json");


const getAllUsers = (req, res) => {
    // console.log(userData);
    let HTML_body = `
        <ul>
            ${userData.map((user, id) => {
                return `<li>${user.first_name} ${user.last_name}</li> <br>`
            }).join("")}
        </ul>
    `;
    res.send(HTML_body);
}

const getUser = (req, res) => {
    const userId = Number(req.params.id);
    console.log(typeof(userId));
    const userdata = userData.find((user) => {
        return user.id === userId;
    })
    res.send(userdata);
}

const addUser = (req, res) => {
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
}

const updateUser = (req, res) => {
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
}



module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser
}

