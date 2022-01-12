import React, { useEffect, useState } from 'react'
import "../styles/Home.scss";
import { PieChart } from 'react-minimal-pie-chart';
import TransactionStats from './TransactionStats';
import baseURL from '../utils/baseUrl';
import ExpenseIncomeStats from './ExpenseIncomeStats';


function Home() {
    const [userStats, setUserStats] = useState()
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const [isExpenseBtnClicked, setIsExpenseBtnClicked] = useState(false);
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
    }, [shouldRefresh])
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
    }
    return (
        <>
            <div id="homepage">

                {
                    !userStats ? <div id="homepageSpinner"><i className="fas fa-spinner fa-spin fa-5x" style={{ color: "white" }} /></div> :
                        <div className='container' id="homepageStats">
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
                                    data={userStats.expenseStats}
                                    setIsExpenseBtnClicked={() => setIsExpenseBtnClicked(true)}
                                />
                                <TransactionStats
                                    isExpense={false}
                                    data={userStats.incomeStats}
                                    setIsExpenseBtnClicked={() => setIsExpenseBtnClicked(false)}
                                />
                            </div>
                        </div>
                }
            </div>
            <ExpenseIncomeStats isExpense={isExpenseBtnClicked} refresh={() => setShouldRefresh(!shouldRefresh)} />
        </>
    )
}

export default Home
