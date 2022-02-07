const express = require("express");
const User = require("../model/User.js");
const userRoute = express.Router();

// register a user
userRoute.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, profileImage } = req.body;
    try {
        const user = await User.findOne({ email: email })
        if (user) {
            res.json("user already exists");
        } else {
            const newUser = await User.create({ firstName, lastName, email, password, profileImage })
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
    console.log("here");
    const allUsers = await User.find();
    // res.send(allUsers);
    console.log(allUsers);
    // res.
    // res.json(allUsers);
    // res.json("reached here")
    res.send("reached here")
})

//get user by id
userRoute.get("/userProfile/:id", async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json(user);
})

module.exports = userRoute;