const mongoose = require("mongoose");
const expenseSchema = mongoose.Schema({
    description: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    createdBy: {
        // createdBy will hold the id of the user that created the income
        // the user has to be logged in to be able to create an income
        // the id of the logged in user will be used here
        type: String,
    },
    date: {
        type: String,
        default: new Date().toDateString()
    }
});

module.exports = mongoose.model("Expense", expenseSchema)