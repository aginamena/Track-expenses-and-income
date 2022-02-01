import React, { useEffect, useState } from 'react'
import "../styles/Navigation.scss";
import { Link, useHistory } from "react-router-dom"


function Naviation(props) {
    const [state, setState] = useState(false);
    const isAdmin = localStorage.getItem("emailAddress") === "admin@gmail.com";
    const history = useHistory();
    function logout(event) {
        event.preventDefault();
        localStorage.clear();
        props.logout()
        history.push("/");
    }
    function openNavbar() {
        if (state) {
            // document.querySelector("#navbarNavAltMarkup").style = "height:0; opacity:0;";
            document.querySelector("#navbarNavAltMarkup").style = "display:none";
            document.querySelector("#userNameAndEmail") &&
                (document.querySelector("#userNameAndEmail").style = "opacity:0");
            document.querySelector("#navigation").style = "height:130px";
            setState(false);

        } else {
            // document.querySelector("#navbarNavAltMarkup").style = "height:120px; opacity:1;";
            document.querySelector("#navbarNavAltMarkup").style = "display:block";
            document.querySelector("#userNameAndEmail") && (document.querySelector("#userNameAndEmail").style = "opacity:1");
            document.querySelector("#navigation").style = "height:250px";
            setState(true)
        }
    }
    useEffect(() => {
        //resizing navigation bar for all screen sizes
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                document.querySelector("#navbarNavAltMarkup").style = "display:block";
                document.querySelector("#navigation").style = "height:46px";
            } else {
                state && (document.querySelector("#navbarNavAltMarkup").style = "display:none;");
                document.querySelector("#navigation").style = "height:130px";
                document.querySelector("#userNameAndEmail") &&
                    (document.querySelector("#userNameAndEmail").style = "opacity:0");
                setState(false);
            }
        })
    })
    return (
        <nav className="navbar navbar-expand-lg" id='navigation'>
            <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" style={{ color: "white" }}>
                    <i className="fas fa-bars" onClick={event => openNavbar(event)}></i>
                </span>
            </button>
            <div className="navbar-collapse" id="navbarNavAltMarkup"
            >
                <div className="navbar-nav firstNavbar">
                    {
                        !isAdmin && <Link to="/"><button id='myProfileBtn' type="button" className="btn btn-outline-info">My Profile</button></Link>
                    }
                </div>
                <div className="navbar-nav secondNavbar"
                >
                    {
                        !isAdmin && (
                            <>
                                <Link to="/expense"><button id='newExpenseBtn' className="btn btn-outline-primary">New Expense</button></Link>
                                <Link to="/income"><button id='newIncomeBtn' className="btn btn-outline-success">New Income</button></Link>
                            </>
                        )
                    }
                    <button id='logout' type="submit"
                        className="btn btn-outline-warning"
                        onClick={logout}
                    >Logout</button>
                </div>
            </div>
        </nav>

    )
}

export default Naviation
