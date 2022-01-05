const express = require("express");
const User = require("../model/User.js");
const userRoute = express.Router();

// register a user
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

//login a user
userRoute.post("/login", async (req, res) => {
    // if the user has to be registered before they can login
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, password: password });
    if (user) {
        res.json(user)
    } else {
        res.json("Invalid credentials")
    }
})

//get all users of the site
userRoute.get("/", async (req, res) => {
    const allUsers = await User.find();
    res.send(allUsers);
})

module.exports = userRoute;