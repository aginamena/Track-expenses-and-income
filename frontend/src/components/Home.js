import React, { useEffect, useState } from 'react'
import "../styles/Home.scss";
import { PieChart } from 'react-minimal-pie-chart';
import TransactionStats from './TransactionStats';
import baseURL from '../utils/baseUrl';
import ExpenseIncomeStats from './ExpenseIncomeStats';


function Home() {
    console.log(process.env.REACT_APP_BACKEND_SERVER_CONNECTION);
    const [userStats, setUserStats] = useState()
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const [isExpenseBtnClicked, setIsExpenseBtnClicked] = useState(false);
    useEffect(async () => {
        const userId = localStorage.getItem("userId");
        const response = await fetch(baseURL + "expense/stats/" + userId);
        const expensesData = await response.json();
        //get users profile image
        const userProfileResponse = await fetch(baseURL + "users/userProfile/" + localStorage.getItem("userId"));
        const userProfile = await userProfileResponse.json();

        fetch(baseURL + "income/stats/" + userId)
            .then(response => response.json())
            .then(incomeData => {
                const result = {
                    incomeStats: incomeData,
                    expenseStats: expensesData,
                    userProfile: userProfile
                }
                setUserStats(result);
            })
    }, [shouldRefresh])
    let data;
    if (userStats && userStats.expenseStats.total == 0 && userStats.incomeStats.total == 0) {
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
                                <img src={userStats.userProfile.profileImage} alt="userProfile" className='userProfileImage' />
                                <div id="userNameAndEmail">
                                    <div>Name : {localStorage.getItem("userName")}</div>
                                    <div>Email : {localStorage.getItem("emailAddress")}</div>
                                </div>
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
                                    shouldDisplayBtn={true}
                                    className="ExpenseStats"

                                />
                                <TransactionStats
                                    isExpense={false}
                                    data={userStats.incomeStats}
                                    setIsExpenseBtnClicked={() => setIsExpenseBtnClicked(false)}
                                    shouldDisplayBtn={true}
                                    className="InvoiceStats"
                                />
                            </div>
                        </div>
                }
            </div>
            <ExpenseIncomeStats
                canDelete={true}
                isExpense={isExpenseBtnClicked}
                userId={localStorage.getItem("userId")}
                refresh={() => setShouldRefresh(!shouldRefresh)} />
        </>
    )
}

export default Home
