const express = require("express");
const app = express();
const PORT = 4000;
// connecting to the database
require("./config/dbConnect.js")();
app.get("/", (req, res) => {
    res.send("hello world");
})
app.listen(PORT, () => { console.log("Server is running") })