import React from 'react'
import "../styles/TransactionStats.scss";
function TransactionStats(props) {
    return (
        <div id="transactionStats" style={props.isExpense ?
            { border: "1px solid #007bff" } : { border: "1px solid #28a745" }}>
            <h3 style={props.isExpense ? { color: "#007bff" } :
                { color: "#28a745" }}>{props.isExpense ? "Expenses" : "Income"}</h3>
            <div>#amount here</div>
            <div>
                <div>Number of Transactions: 0</div>
                <div>Minimum Transactions: 0</div>
                <div>Maximum Transactions: 0</div>
                <div>Average Transactions: 0</div>
            </div>
            <button className={`transactionBtn ${props.isExpense ? "btn btn-primary" : "btn btn-success"}`}>{props.isExpense ? "View Expenses" : "View Income"}</button>
        </div>
    )
}

export default TransactionStats
