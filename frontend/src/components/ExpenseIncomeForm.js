import React from 'react'

function ExpenseIncomeForm(props) {
    return (
        <form>
            <h3>{props.isExpense ? "Record New Expense" : "Record New Income"}</h3>
            <div className="form-group">
                <input type="text" className="form-control" id="expenseTitle" placeholder="Enter Title" />
            </div>
            <div className="form-group">
                <input type="text" className="form-control" id="expenseDescription" placeholder="Enter description" />
            </div>
            <div className="form-group">
                <input type="Number" className="form-control" id="expenseAmount" placeholder='Enter Amount' min={0} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default ExpenseIncomeForm
