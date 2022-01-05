import React from 'react'
import "../styles/Navigation.scss";
import { Link } from "react-router-dom"

function Naviation(props) {
    function logout(event) {
        event.preventDefault();
        localStorage.clear();
        props.logout()
    }
    return (
        <nav className="navbar navbar-expand-lg" id='navigation'>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" style={{ color: "white" }}>
                    <i className="fas fa-bars"></i>
                </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link to="/"><button id='myProfileBtn' type="button" className="btn btn-outline-info">My Profile</button></Link>
                    {
                        // only the admin has access to the dashboard
                        localStorage.getItem("emailAddress") === "admin@gmail.com" && <Link to="/"><button id='dashboardBtn' class="btn btn-outline-secondary">Dashboard</button></Link>
                    }
                </div>
                <div className="navbar-nav">
                    <Link to="/expense"><button id='newExpenseBtn' className="btn btn-outline-primary">New Expense</button></Link>
                    <Link to="/income"><button id='newIncomeBtn' className="btn btn-outline-success">New Income</button></Link>
                    <button id='logout' type="submit" className="btn btn-outline-warning" onClick={logout}>Logout</button>
                </div>
            </div>
        </nav>

    )
}

export default Naviation
