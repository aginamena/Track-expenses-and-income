import React from 'react'
import ExpenseIncomeForm from './ExpenseIncomeForm'
import "../styles/Income.scss";
function Income() {
    return (
        <div id="income">
            <ExpenseIncomeForm
                heading="Record New Income"
                isExpense={false}
                isEdit={false}
            />
        </div>
    )
}

export default Income
