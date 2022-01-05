import React, { useEffect, useState } from 'react'
import "../styles/Home.scss";
import { PieChart } from 'react-minimal-pie-chart';
import TransactionStats from './TransactionStats';
import baseURL from '../utils/baseUrl';


function Home() {
    const [userStats, setUserStats] = useState()
    useEffect(async () => {
        const userId = localStorage.getItem("userId");
        const response = await fetch(baseURL + "expense/stats/" + userId);
        const expensesData = await response.json();
        fetch(baseURL + "income/stats/" + userId)
            .then(response => response.json())
            .then(incomeData => {
                const result = {
                    incomeStats: incomeData,
                    expenseStats: expensesData
                }
                setUserStats(result);
            })
    }, [])
    let data;
    if (userStats && userStats.expenseStats.avg == 0 && userStats.incomeStats.avg == 0) {
        data = [
            { title: 'Expenses', value: 30, color: "#007bff" },
            { title: 'Income', value: 30, color: "#28a745" }
        ]
    } else {
        if (userStats) {
            data = [
                { title: 'Expenses', value: userStats.expenseStats.total, color: "#007bff" },
                { title: 'Income', value: userStats.incomeStats.total, color: "#28a745" }
            ]
        }
        // data = [
        //     { title: 'Expenses', value: userStats.expenseStats.avg, color: "#007bff" },
        //     { title: 'Income', value: userStats.incomeStats.avg, color: "#28a745" }
        // ]
    }
    // let data = [
    //     userStats ? (userStats.expenseStats.avg == 0 && userStats.incomeStats.avg == 0 ?
    //         ({ title: 'Expenses', value: 30, color: "#007bff" },
    //             { title: 'Income', value: 30, color: "#28a745" }) :
    //         ({ title: 'Expenses', value: userStats.expenseStats.avg, color: "#007bff" },
    //             { title: 'Income', value: userStats.incomeStats.avg, color: "#28a745" })) : null
    // ];
    return (
        <div id="homepage">
            <div className='container'>
                <div id="userInfo">
                    <div>Name : {localStorage.getItem("userName")}</div>
                    <div>Email : {localStorage.getItem("emailAddress")}</div>
                </div>
                <div id='pieChartDiv'>
                    <h2>Transactions</h2>
                    <PieChart
                        data={data}
                        animate={true}
                    />
                </div>
                <div id="homePageStats">
                    <TransactionStats
                        isExpense={true}
                        data={userStats ? userStats.expenseStats : {}}
                    />
                    <TransactionStats
                        isExpense={false}
                        data={userStats ? userStats.incomeStats : {}}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
