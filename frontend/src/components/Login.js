import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import "../styles/Login.scss";
import baseURL from '../utils/baseUrl';

export default function Login(props) {
    const [shouldShowErrow, setShowError] = useState()
    const history = useHistory();
    async function handleSubmit(event) {
        event.preventDefault();
        const password = document.querySelector("#loginPassword").value;
        const emailAddress = document.querySelector("#loginEmailAddress").value;
        // const unspplash = await fetch("https://api.unsplash.com/photos/random/?client_id=" + process.env.API_KEY)
        // console.log(unspplash);
        const options = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email: emailAddress, password: password })
        }
        const response = await fetch(baseURL + "users/login", options)
        const result = await response.json();
        if (result === "Invalid credentials") {
            setShowError(true);
        } else {
            localStorage.setItem("emailAddress", emailAddress)
            //user id for identification
            localStorage.setItem("userId", result._id)
            localStorage.setItem("userName", result.firstName + " " + result.lastName)
            setShowError(false);
            history.push("/");
            props.setLogin(true);
        }
    }
    return (
        <div id="loginPage"
        // style={{ backgroundImage: "url(https://www.worldofrental.com/helpdesk/wp-content/themes/worldofrental-help/images/post-images/dashboard/pie-chart.jpg)" }}
        >
            <img src="/pie-chart.jpg" />
            <div id="loginContent">
                <h1>Visualize your income and expenses</h1>
                <small>View all your income and expenses flow from your team in one dashboard</small>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label for="loginEmailAddress">Email address</label>
                        <input type="email" className="form-control" id="loginEmailAddress" placeholder="Enter email" required />

                    </div>
                    <div className="form-group">
                        <label for="loginPassword">Password</label>
                        <input type="password" className="form-control" id="loginPassword" placeholder="Password" required />
                    </div>
                    <div id="loginPageBtns">
                        <button type="submit" className="btn btn-primary">Login</button>
                        <small>OR</small>
                        <Link to="/register"><button type="submit" className="btn btn-info">Register</button></Link>
                    </div>
                </form>
                {
                    shouldShowErrow && <div style={{ color: "red" }}>Invalid email or password</div>
                }
                <div>
                    <h3 style={{ color: "red" }}>Admin Login</h3>
                    <small style={{ fontWeight: "bold" }}>email : admin@gmail.com</small>
                    <br />
                    <small style={{ fontWeight: "bold" }}>Password : 12345</small>
                </div>
            </div>
        </div>
    )
}
