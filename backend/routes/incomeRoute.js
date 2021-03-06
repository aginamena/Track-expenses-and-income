
const express = require("express");
const Income = require("../model/Income");
const incomeRouter = express.Router();

// get all incomes stats
incomeRouter.get("/", async (req, res) => {
    const allIncomes = await Income.find()
    let maxValue = 0, minValue = Number.MAX_VALUE, sum = 0;
    allIncomes.map(income => {
        maxValue = Math.max(maxValue, income.amount);
        minValue = Math.min(minValue, income.amount);
        sum += income.amount;
    })
    const result = {
        numberOfTransactions: allIncomes.length,
        min: minValue == Number.MAX_VALUE ? 0 : minValue,
        max: maxValue,
        total: sum,
        avg: allIncomes.length >= 1 ? Math.round(sum / allIncomes.length * 10) / 10 : 0
    };
    res.json(result);
})

//create an income
incomeRouter.post("/create", async (req, res) => {
    const { description, amount, createdBy } = req.body;
    const income = await Income.create({ description, amount, createdBy })
    res.json(income);
})
// get income for a specific user 
incomeRouter.get("/incId/:createdBy", async (req, res) => {
    //this doesn't work. you'll need pagination here too

    const { createdBy } = req.params;
    const allIncomesCreatedByUser = await Income.find({ createdBy: createdBy })
    res.json(allIncomesCreatedByUser);
})

//update income for specific user
incomeRouter.put("/incId/:updateId", async (req, res) => {
    const { updateId } = req.params;
    const { description, amount } = req.body;
    const updatedIncome = await Income.findByIdAndUpdate({ _id: updateId }, { description: description, amount: amount }, { new: true })
    res.json(updatedIncome);
})

//get statistics of current user
incomeRouter.get("/stats/:userId", async (req, res) => {
    const { userId } = req.params;
    const allIncomeCreatedByUser = await Income.find({ createdBy: userId })
    let maxValue = 0, minValue = Number.MAX_VALUE, sum = 0;
    allIncomeCreatedByUser.map(expense => {
        maxValue = Math.max(maxValue, expense.amount);
        minValue = Math.min(minValue, expense.amount);
        sum += expense.amount;
    })
    const result = {
        numberOfTransactions: allIncomeCreatedByUser.length,
        min: minValue == Number.MAX_VALUE ? 0 : minValue,
        max: maxValue,
        total: sum,
        avg: allIncomeCreatedByUser.length >= 1 ? Math.round(sum / allIncomeCreatedByUser.length * 10) / 10 : 0
    };
    res.json(result);

})

//delete income for specif user
incomeRouter.delete("/:incomeId", async (req, res) => {
    const { incomeId } = req.params;
    await Income.findByIdAndDelete({ _id: incomeId });
    res.json("income is deleted")
})

// get a spcific income by its id
incomeRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const result = await Income.findById(id);
    res.json(result);
})

module.exports = incomeRouter;
