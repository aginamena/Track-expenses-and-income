const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const path = require("path");
require("./config/dbConnect.js")(); // connecting to the database
// require("dotenv").config({ path: "./dev.env" }); // environment variables
// require("dotenv").config({ path: path.resolve(__dirname, "/.env") }); // environment variables
const userRoute = require("./routes/userRoute");
const incomeRouter = require("./routes/incomeRoute");
const expenseRouter = require("./routes/expensesRoute");


// // connecting to the database
// require("./config/dbConnect.js")();

//middleware
app.use(express.json()); // this must be first to parse incoming request to json
app.use(cors()); // we want the frontend to be albe to access the server
app.use("/api/users", userRoute);
app.use("/api/income", incomeRouter);
app.use("/api/expense", expenseRouter);


app.listen(PORT, () => { console.log("Server is running") })