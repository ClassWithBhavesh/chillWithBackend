const express = require("express");
const userData = require("../userData.json");
const router = express.Router();
const { getAllUsers, getUser, addUser, updateUser } = require("../Controllers/userController.js");

router.get("/", getAllUsers)

router.get("/:id", getUser)

router.post("/addUser", addUser)

router.put("/updateUser/:id", updateUser)



module.exports = router