import React, { useState, useEffect } from 'react'
import "../styles/AdminDashboard.scss";
import baseUrl from "../utils/baseUrl.js";
import { PieChart } from 'react-minimal-pie-chart';
import baseURL from '../utils/baseUrl.js';
import TransactionStats from './TransactionStats';
function AdminDashboard() {
    const [allUsers, setAllUsers] = useState();
    const [totalTransactions, setTotalTransactions] = useState();
    useEffect(async () => {
        //getting all the users
        const options = {
            method: "get",
            headers: {
                "content-type": "application/json",
            }
        }
        const response = await fetch(baseUrl + "users/", options);
        const users = await response.json();
        setAllUsers(users);
        const incomeResponse = await fetch(baseURL + "income");
        const incomeData = await incomeResponse.json();
        const expenseResponse = await fetch(baseURL + "expense");
        const expenseData = await expenseResponse.json();
        const result = {
            income: incomeData,
            expense: expenseData
        }
        setTotalTransactions(result);
        // let data = [{}, {}];
        // if (totalTransactions && totalTransactions.income.total == 0 && totalTransactions.expense.total == 0) {
        //     data = [
        //         { title: 'Expenses', value: 30, color: "#007bff" },
        //         { title: 'Income', value: 30, color: "#28a745" }
        //     ]
        // } else {
        //     if (totalTransactions) {
        //         data = [
        //             { title: 'Expenses', value: totalTransactions.income.total, color: "#007bff" },
        //             { title: 'Income', value: totalTransactions.expense.total, color: "#28a745" }
        //         ]
        //     }
        // }
    }, [])
    let data;
    if (totalTransactions && totalTransactions.income.total == 0 && totalTransactions.expense.total == 0) {
        data = [
            { title: 'Expenses', value: 30, color: "#007bff" },
            { title: 'Income', value: 30, color: "#28a745" }
        ]
    } else {
        if (totalTransactions) {
            data = [
                { title: 'Expenses', value: totalTransactions.income.total, color: "#007bff" },
                { title: 'Income', value: totalTransactions.expense.total, color: "#28a745" }
            ]
        }
    }
    return (
        <div id='adminDashboard'>
            {
                (!allUsers || !totalTransactions) ? <div id="homepageSpinner"><i className="fas fa-spinner fa-spin fa-5x" style={{ color: "white" }} /></div> :
                    <>
                        <div id="leftDashboardStats">
                            <div id='pieChartDiv'>
                                <h2>All transactions</h2>
                                <PieChart
                                    data={data}
                                    animate={true}
                                />
                            </div>
                            <div id="allUsersStats">
                                <TransactionStats
                                    isExpense={false}
                                    data={totalTransactions.income}
                                    shouldDisplayBtn={false}
                                />
                                <TransactionStats
                                    isExpense={true}
                                    data={totalTransactions.expense}
                                    shouldDisplayBtn={false}
                                />
                            </div>
                        </div>
                        <div id="rightDashbaordAllUsers">
                            <h3>All Users</h3>
                            {allUsers.map(user => (
                                <div id={user._id} key={user._id} className='userInfo'>
                                    <div>{user.firstName} {user.lastName}</div>
                                    <div>{user.email}</div>
                                </div>
                            ))}
                        </div>
                    </>
            }
        </div>
    )
}

export default AdminDashboard
