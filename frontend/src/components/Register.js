import React, { useState } from 'react'
import "../styles/Register.scss";
import { useHistory } from "react-router-dom";

function Register(props) {
    const backend_server_connection = process.env.REACT_APP_BACKEND_SERVER_CONNECTION;
    const history = useHistory();
    const [shouldShowErrow, setError] = useState(false);
    async function handleSubmit(event) {
        event.preventDefault();
        const firstName = document.getElementById("registerFirstName").value;
        const lastName = document.getElementById("registerLastName").value;
        const email = document.getElementById("registerEmailAddress").value;
        const password = document.getElementById("registerPassword").value;

        //getting the profile image
        const unsplash = await fetch("https://api.unsplash.com/photos/random/?client_id=" + process.env.REACT_APP_API_KEY)
        const unsplashData = await unsplash.json();
        const profileImage = unsplashData.urls.small;
        const options = {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ firstName, lastName, email, password, profileImage })
        }
        fetch(backend_server_connection + "users/register", options)
            .then(response => response.json())
            .then(data => {
                if (data === "user already exists") setError(true);
                else {
                    setError(false);
                    localStorage.setItem("userName", firstName + " " + lastName);
                    localStorage.setItem("userId", data._id)
                    localStorage.setItem("emailAddress", email);
                    history.push("/");
                    props.setLogin(true);
                }
            });
    }
    return (
        <div id="registerCmp">
            <div id="firstInfo">
                <h1>Visualize and keep track of what you spend</h1>
                <form id="registerForm" onSubmit={handleSubmit} id="registerForm">
                    <div className="form-group">
                        <label htmlFor="registerFirstName">First name</label>
                        <input type="text" className="form-control" id="registerFirstName" placeholder="Mena" required />

                    </div>
                    <div className="form-group">
                        <label htmlFor="registerLastName">Last name</label>
                        <input type="text" className="form-control" id="registerLastName" placeholder="Agina" required />

                    </div>
                    <div className="form-group">
                        <label htmlFor="registerEmailAddress">Email address</label>
                        <input type="email" className="form-control" id="registerEmailAddress" placeholder="Enter email" required />

                    </div>
                    <div className="form-group">
                        <label htmlFor="registerPassword">Password</label>
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
