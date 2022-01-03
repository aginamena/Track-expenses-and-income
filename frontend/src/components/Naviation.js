import React from 'react'
import "../styles/Navigation.scss";
import { Link } from "react-router-dom"

function Naviation() {
    return (
        // <>
        // <nav className="navbar navbar-expand-md" id='naviagation'>
        //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        //         <span className="navbar-toggler-icon" style={{ color: "white" }}>
        //             <i class="fas fa-bars"></i>
        //         </span>
        //     </button>
        //     <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        //         {/* <ul className="navbar-nav">
        //             <li className="nav-item">
        //                 <Link to="/"><button id='myProfileBtn' type="button" className="btn btn-outline-info">My Profile</button></Link>
        //             </li>

        //             <li className="nav-item">
        //                 <Link to="/"><button id='dashboardBtn' class="btn btn-outline-secondary">Dashboard</button></Link>
        //             </li>
        //         </ul> */}
        //         <div className="navbar-nav">
        //             <li className="nav-item">
        //                 <Link to="/"><button id='newExpenseBtn' class="btn btn-outline-primary">New Expense</button></Link>
        //             </li>
        //             <li className="nav-item">
        //                 <Link to="/"><button id='newIncomeBtn' class="btn btn-outline-success">New Income</button></Link>
        //             </li>
        //             <li className="nav-item">
        //                 <Link to="/"><button id='logout' class="btn btn-outline-warning">Logout</button></Link>
        //             </li>
        //         </div>
        //     </div>
        // </nav>

        <nav className="navbar navbar-expand-lg" id='navigation'>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" style={{ color: "white" }}>
                    <i class="fas fa-bars"></i>
                </span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link to="/"><button id='myProfileBtn' type="button" className="btn btn-outline-info">My Profile</button></Link>
                    <Link to="/"><button id='dashboardBtn' class="btn btn-outline-secondary">Dashboard</button></Link>
                </div>
                <div className="navbar-nav">
                    <Link to="/"><button id='newExpenseBtn' class="btn btn-outline-primary">New Expense</button></Link>
                    <Link to="/"><button id='newIncomeBtn' class="btn btn-outline-success">New Income</button></Link>
                    <Link to="/"><button id='logout' class="btn btn-outline-warning">Logout</button></Link>
                </div>
            </div>
        </nav>

    )
}

export default Naviation
