import React from 'react';
import { useHistory } from 'react-router-dom';
import baseURL from '../utils/baseUrl';


function ExpenseIncomeForm(props) {
    const history = useHistory();
    async function handleSubmit(event) {
        event.preventDefault();
        const description = document.querySelector("#formDescription").value;
        const amount = document.querySelector("#formAmount").value;
        const options = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ description, amount, createdBy: localStorage.getItem("userId") })
        }
        const endpoint = props.isExpense ? "expense/create" : "income/create";
        await fetch(baseURL + endpoint, options)
        // we don't care about the response. we just send it to the server
        // and go to home page
        history.push("/");
    }
    return (
        <form>
            <h3>{props.isExpense ? "Record New Expense" : "Record New Income"}</h3>
            <div className="form-group">
                <input type="text" className="form-control" id="formDescription" placeholder="Enter description" />
            </div>
            <div className="form-group">
                <input type="Number" className="form-control" id="formAmount" placeholder='Enter Amount' min={0} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    )
}

export default ExpenseIncomeForm
