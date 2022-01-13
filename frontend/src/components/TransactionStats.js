import React from 'react'
import "../styles/TransactionStats.scss";
import ExpenseIncomeStats from './ExpenseIncomeStats';
function TransactionStats(props) {
    const { avg, max, min, numberOfTransactions, total } = props.data;
    function displayStats(event) {
        document.getElementById("ExpenseIncomeStats").style = "opacity:1;width:700px";
        document.getElementById("homepage").style = "filter:brightness(0.5)";
        document.getElementById("createTable").style = "display:table";
        props.setIsExpenseBtnClicked();
    }
    return (
        <div id="transactionStats" style={props.isExpense ?
            { border: "1px solid #007bff" } : { border: "1px solid #28a745" }}>
            <h3 style={props.isExpense ? { color: "#007bff" } :
                { color: "#28a745" }}>{props.isExpense ? "Expenses" : "Income"}</h3>
            <div>
                <div className='totalAmount'>Total Amount: ${new Intl.NumberFormat().format(total)}</div>
                <div>Number of Transactions: {numberOfTransactions}</div>
                <div>Minimum Amount: ${new Intl.NumberFormat().format(min)}</div>
                <div>Maximum Amount: ${new Intl.NumberFormat().format(max)}</div>
                <div>Average Amount: ${new Intl.NumberFormat().format(avg)}</div>
            </div>
            {
                props.shouldDisplayBtn && <button onClick={displayStats} className={`transactionBtn ${props.isExpense ? "btn btn-primary" : "btn btn-success"}`}>{props.isExpense ? "View Expenses" : "View Income"}</button>
            }
        </div>

    )
}

export default TransactionStats
