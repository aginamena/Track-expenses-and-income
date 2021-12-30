const express = require("express");
const User = require("../model/User.js");
const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = await User.findOne({ email: email })
        if (user) {
            res.json("user already exists");
        } else {
            const newUser = await User.create({ firstName, lastName, email, password })
            res.json(newUser);
        }
    } catch (error) {

    }
})

userRoute.get("/", async (req, res) => {
    const allUsers = await User.find();
    res.send(allUsers);
})

module.exports = userRoute;