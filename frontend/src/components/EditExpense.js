import React from 'react'
import ExpenseIncomeForm from "./ExpenseIncomeForm";
import "../styles/Expense.scss";
import EditIncomeAndExpenseForm from './EditIncomeAndExpenseForm';
function EditExpense() {
    return (
        <div id="expense">
            <EditIncomeAndExpenseForm
                heading="Edit Expense"
                isExpense={true}
            />

        </div>
    )
}

export default EditExpense
