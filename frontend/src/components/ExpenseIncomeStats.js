import React from 'react'
import "../styles/ExpenseIncomeStats.scss";

function ExpenseIncomeStats(props) {
    let isExpense = props.isExpense;
    function closeStats(event) {
        document.getElementById("ExpenseIncomeStats").style = "opacity:0;width:0";
        document.getElementById("homepage").style = "filter:brightness(1)"
    }
    return (
        <div id="ExpenseIncomeStats"
        >
            <i className="fas fa-times fa-lg closeStats" onClick={closeStats} />
            <div id="emptyStats">
                <img src="/illustration-empty.svg" />
                <div>No Transaction</div>
            </div>

        </div>
    )
}

export default ExpenseIncomeStats
