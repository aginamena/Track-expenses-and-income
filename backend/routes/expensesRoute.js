const express = require("express");
const Expense = require("../model/Expense");
const expenseRouter = express.Router();

// get all expenses
expenseRouter.get("/", async (req, res) => {
    const { page } = req.query;
    const allexpenses = await Expense.paginate({}, { limit: 10, page: Number(page) });
    res.send(allexpenses);
})

//create an expense
expenseRouter.post("/create", async (req, res) => {
    const { description, amount, createdBy } = req.body;
    const expense = await Expense.create({ description, amount, createdBy })
    res.json(expense);
})

// get all expenses for a specific user 
expenseRouter.get("/exId/:createdBy", async (req, res) => {
    //this doesn't work. you'll add pagination here too

    // const { createdBy } = req.params;
    // const allExpensesCreatedByUser = await Expense.find({ createdBy: createdBy })
    // res.json(allExpensesCreatedByUser);
})

//update exepnse for specific user
expenseRouter.put("/exId/:updateId", async (req, res) => {
    const { updateId } = req.params;
    const { description, amount } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate({ _id: updateId }, { description: description, amount: amount }, { new: true })
    res.json(updatedExpense);
})

//delete expense for specif user
expenseRouter.delete("/:expenseId", async (req, res) => {
    const { expenseId } = req.params;
    await Expense.findByIdAndDelete({ _id: expenseId });
    res.json("Expense is deleted")
})
module.exports = expenseRouter;