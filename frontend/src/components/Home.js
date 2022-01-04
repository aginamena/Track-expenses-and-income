import React, { useEffect, useState } from 'react'
import "../styles/Home.scss";
import { PieChart } from 'react-minimal-pie-chart';
import TransactionStats from './TransactionStats';

function Home() {
    const [stats, setStats] = useState({})
    useEffect(() => {

    }, [])
    const data = [
        { title: 'Expenses', value: 400, color: "#007bff" },
        { title: 'Income', value: 100, color: "#28a745" }
    ];
    return (
        <div id="homepage">
            <div className='container'>
                <div id="userInfo">
                    <div>Name here</div>
                    <div>Email here</div>
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
                    />
                    <TransactionStats
                        isExpense={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
