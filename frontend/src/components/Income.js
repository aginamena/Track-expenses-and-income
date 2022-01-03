import React from 'react'
import ExpenseIncomeForm from './ExpenseIncomeForm'
import "../styles/Income.scss";
function Income() {
    return (
        <div id="income">
            <ExpenseIncomeForm
                isExpense={false}
            />
        </div>
    )
}

export default Income
