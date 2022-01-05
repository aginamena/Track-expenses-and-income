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
    //you'll add pagination here too
    const { createdBy } = req.params;
    const allExpensesCreatedByUser = await Expense.find({ createdBy })
    res.json(allExpensesCreatedByUser);
})


//update exepnse for specific user
expenseRouter.put("/exId/:updateId", async (req, res) => {
    const { updateId } = req.params;
    console.log(req.params);
    console.log(req.params.updateId);
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

//get statistics of current user
expenseRouter.get("/stats/:userId", async (req, res) => {
    const { userId } = req.params;
    const allExpensesCreatedByUser = await Expense.find({ createdBy: userId })
    let maxValue = 0, minValue = Number.MAX_VALUE, sum = 0;
    allExpensesCreatedByUser.map(expense => {
        maxValue = Math.max(maxValue, expense.amount);
        minValue = Math.min(minValue, expense.amount);
        sum += expense.amount;
    })
    const result = {
        numberOfTransactions: allExpensesCreatedByUser.length,
        min: minValue,
        max: maxValue,
        total: sum,
        avg: Math.round(sum / allExpensesCreatedByUser.length * 10) / 10
    };
    res.json(result);

})
module.exports = expenseRouter;