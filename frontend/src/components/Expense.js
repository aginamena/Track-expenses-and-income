
import React from 'react'
import "../styles/Expense.scss";
import ExpenseIncomeForm from './ExpenseIncomeForm';
function Expense() {
    return (
        <div id="expense">
            <ExpenseIncomeForm
                heading="Record New Expense"
                isExpense={true}
                isEdit={false}
            />
        </div>
    )
}

export default Expense
