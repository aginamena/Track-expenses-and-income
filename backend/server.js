const express = require("express");
const app = express();
const PORT = 4000;
const userRoute = require("./routes/userRoute");
const incomeRouter = require("./routes/incomeRoute");
const expenseRouter = require("./routes/expensesRoute");


// connecting to the database
require("./config/dbConnect.js")();

//middleware

app.use(express.json()); // this must be first to parse incoming request to json
app.use("/api/users", userRoute);
app.use("/api/income", incomeRouter);
app.use("/api/expense", expenseRouter);


app.listen(PORT, () => { console.log("Server is running") })