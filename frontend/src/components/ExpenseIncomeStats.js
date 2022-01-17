import React, { useState, useEffect } from 'react'
import "../styles/ExpenseIncomeStats.scss";
import baseUrl from "../utils/baseUrl.js";
import CreateTable from './CreateTable';

function ExpenseIncomeStats(props) {
    const [data, setData] = useState();
    const [shouldRefresh, setShouldRefresh] = useState(false);
    function closeStats(event) {
        document.getElementById("ExpenseIncomeStats").style = "opacity:0;width:0";
        document.getElementById("homepage").style = "filter:brightness(1)"
        document.getElementById("createTable").style = "display:none";
    }
    useEffect(async () => {
        const endPoint = props.isExpense ? "expense/exId/" + props.userId :
            "income/incId/" + props.userId;
        const url = baseUrl + endPoint;
        const options = {
            method: "GET",
            headers: {
                "content-type": "Application/json"
            }
        }
        const response = await fetch(url, options)
        const data = await response.json();
        setData(data);
    }, [props.isExpense, shouldRefresh])
    return (
        <div id="ExpenseIncomeStats">
            <i className="fas fa-times fa-lg closeStats" onClick={closeStats} />
            {
                data && <CreateTable data={data}
                    isExpense={props.isExpense}
                    refresh={() => {
                        setShouldRefresh(!shouldRefresh)
                        props.refresh()
                    }}
                    canDelete={props.canDelete}
                />
            }


        </div>
    )
}

export default ExpenseIncomeStats
