import React, { useState, useEffect } from 'react'
import "../styles/Home.scss";
import { PieChart } from 'react-minimal-pie-chart';
import TransactionStats from './TransactionStats';
import baseURL from '../utils/baseUrl';
import ExpenseIncomeStats from './ExpenseIncomeStats';
import { useParams } from 'react-router-dom';

function ViewOtherUserProfile() {
    const params = useParams();
    const userId = params.id;
    console.log(userId);
    const [userStats, setUserStats] = useState()
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const [isExpenseBtnClicked, setIsExpenseBtnClicked] = useState(false);
    useEffect(async () => {
        // const userId = localStorage.getItem("userId");
        const response = await fetch(baseURL + "expense/stats/" + userId);
        const expensesData = await response.json();
        //get users profile image
        const userprofileResponse = await fetch(baseURL + "users/userProfile/" + userId);
        const userProfile = await userprofileResponse.json();

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
                                <div>
                                    <div>Name : {userStats.userProfile.firstName} {userStats.userProfile.lastName}</div>
                                    <div>Email : {userStats.userProfile.email}</div>
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
                                />
                                <TransactionStats
                                    isExpense={false}
                                    data={userStats.incomeStats}
                                    setIsExpenseBtnClicked={() => setIsExpenseBtnClicked(false)}
                                    shouldDisplayBtn={true}
                                />
                            </div>
                        </div>
                }
            </div>
            <ExpenseIncomeStats canDelete={false}
                userId={userId} isExpense={isExpenseBtnClicked}
                refresh={() => setShouldRefresh(!shouldRefresh)} />
        </>
    )
}

export default ViewOtherUserProfile
