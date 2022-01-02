import React, { useState } from 'react'
import "../styles/Register.scss";
import baseURL from '../utils/baseUrl';
import { useHistory } from "react-router-dom";

function Register() {
    const history = useHistory();
    const [shouldShowErrow, setError] = useState(false);
    function handleSubmit(event) {
        event.preventDefault();
        const firstName = document.getElementById("registerFirstName").value;
        const lastName = document.getElementById("registerLastName").value;
        const email = document.getElementById("registerEmailAddress").value;
        const password = document.getElementById("registerPassword").value;

        const options = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ firstName, lastName, email, password })
        }
        fetch(baseURL + "users/register", options)
            .then(response => response.json())
            .then(data => {
                if (data === "user already exists") setError(true);
                else {
                    setError(false);
                    localStorage.setItem("emailAddress", email);
                    history.push("/home");
                }
            });
    }
    return (
        <div id="registerCmp">
            <div id="firstInfo">
                <h1>Visualize and keep track of what you spend</h1>
                <form id="registerForm" onSubmit={handleSubmit} id="registerForm">
                    <div className="form-group">
                        <label for="registerFirstName">First name</label>
                        <input type="text" className="form-control" id="registerFirstName" placeholder="Mena" required />

                    </div>
                    <div className="form-group">
                        <label for="registerLastName">Last name</label>
                        <input type="text" className="form-control" id="registerLastName" placeholder="Agina" required />

                    </div>
                    <div className="form-group">
                        <label for="registerEmailAddress">Email address</label>
                        <input type="email" className="form-control" id="registerEmailAddress" placeholder="Enter email" required />

                    </div>
                    <div className="form-group">
                        <label for="registerPassword">Password</label>
                        <input type="password" className="form-control" id="registerPassword" placeholder="Password" required />
                    </div>
                    <div id="loginPageBtns">
                        <button type="submit" className="btn btn-info">Register</button>
                    </div>
                </form>
            </div>
            {shouldShowErrow && <div style={{ color: "red" }} id="useExists">User already exists</div>}
        </div>
    )
}

export default Register
