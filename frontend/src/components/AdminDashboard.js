import React, { useState, useEffect } from 'react'
import "../styles/AdminDashboard.scss";
import { PieChart } from 'react-minimal-pie-chart';
import TransactionStats from './TransactionStats';
import { Link } from 'react-router-dom';
function AdminDashboard() {
    const backend_server_connection = process.env.REACT_APP_BACKEND_SERVER_CONNECTION;
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
        const response = await fetch(backend_server_connection + "users/", options);
        const users = await response.json();
        setAllUsers(users);
        const incomeResponse = await fetch(backend_server_connection + "income");
        const incomeData = await incomeResponse.json();
        const expenseResponse = await fetch(backend_server_connection + "expense");
        const expenseData = await expenseResponse.json();
        const result = {
            income: incomeData,
            expense: expenseData
        }
        setTotalTransactions(result);
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
                { title: 'Expenses', value: totalTransactions.expense.total, color: "#007bff" },
                { title: 'Income', value: totalTransactions.income.total, color: "#28a745" }
            ]
        }
    }
    function displayAllUsers(event) {
        // viewAllUsers
        let windowWidth = window.innerWidth;
        if (windowWidth > 768)
            document.querySelector("#rightDashbaordAllUsers").style = "opacity:1;width:40%;"
        else if (windowWidth == 768)
            document.querySelector("#rightDashbaordAllUsers").style = "opacity:1;width:80%;"
        else {
            document.querySelector("#rightDashbaordAllUsers").style = "opacity:1;width:90%;"
            document.querySelector("#viewAllUsers").style = "z-index:-1";
        }
        //     document.querySelector("#rightDashbaordAllUsers").style = "opacity:1;width:90%;"
        // document.querySelector("#viewAllUsers").style = "z-index:-1";
    }
    function closeAllUsers(event) {
        document.querySelector("#rightDashbaordAllUsers").style = "opacity:0;width:0;"
        document.querySelector("#viewAllUsers").style = "z-index:3";
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
                        <div id="viewAllUsers" onClick={e => displayAllUsers(e)}>View all users</div>
                        <div id="rightDashbaordAllUsers">
                            <div id="allUsersCon">
                                <h3>All Users</h3>
                                <i className="fas fa-times fa-lg closeStats" onClick={e => closeAllUsers(e)} />
                            </div>
                            {allUsers.filter(user => user.email !== "admin@gmail.com").map(user => (
                                <div key={user._id} className='userInfo'>
                                    <img src={user.profileImage} alt="user profile" />
                                    <div>
                                        <Link to={"/otherUser/" + user._id}><div id={user._id} className="usersFirstNLastName">{user.firstName} {user.lastName}</div></Link>
                                        <div>{user.email}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
            }
        </div>
    )
}

export default AdminDashboard
