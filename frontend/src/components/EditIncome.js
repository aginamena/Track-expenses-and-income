import React from 'react'
import ExpenseIncomeForm from './ExpenseIncomeForm'
import "../styles/Income.scss";
import EditIncomeAndExpenseForm from './EditIncomeAndExpenseForm';
function EditIncome() {
    return (
        <div id="income">
            <EditIncomeAndExpenseForm
                isExpense={false}
                heading="Edit Income"
            />

        </div>
    )
}

export default EditIncome
