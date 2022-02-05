const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 7002;
console.log("port is " + PORT);
const path = require("path");
require("dotenv").config({ path: `${__dirname}/.env` }); // having access to environment variables
require("./config/dbConnect.js")(); // connecting to the database

//route handlers
const userRoute = require("./routes/userRoute");
const incomeRouter = require("./routes/incomeRoute");
const expenseRouter = require("./routes/expensesRoute");


//middleware
app.use(express.json()); // this must be first to parse incoming request to json
app.use(cors()); // we want the frontend to be albe to access the server
app.use(express.urlencoded());
app.get("/", (req, res) => {
    res.send("sdf")
})
app.use("/api/users", userRoute);
app.use("/api/income", incomeRouter);
app.use("/api/expense", expenseRouter);


app.listen(PORT, () => { console.log("Server is running") })