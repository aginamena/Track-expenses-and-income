import React from 'react'
import "../styles/Login.scss";

export default function Login() {
    return (
        <div id="loginPage" style={{ backgroundImage: "url(https://www.bradhussey.ca/wp-content/uploads/2014/10/income-graph.jpg)" }}>
            <div id="loginContent">
                <h1>Visualize your income and expenses</h1>
                <small>View all your income and expenses flow from your team in one dashboard</small>
                {/* <form>
                    <label>Email</label>
                    <input type="email" />
                    <label>password</label>
                    <input type="password" />
                </form> */}
                <form>
                    <div className="form-group">
                        <label for="LoginEmailAddress">Email address</label>
                        <input type="email" className="form-control" id="LoginEmailAddress" placeholder="Enter email" />

                    </div>
                    <div className="form-group">
                        <label for="loginPassword">Password</label>
                        <input type="password" className="form-control" id="loginPassword" placeholder="Password" />
                    </div>
                    <div id="loginPageBtns">
                        <button type="submit" className="btn btn-primary">Login</button>
                        <small>OR</small>
                        <button type="submit" className="btn btn-info">Register</button>
                    </div>
                    {/* <div>
                        <h3>Admin Login</h3>
                        <small>User name : admin@gmail.com</small>
                        <password>12345</password>
                    </div> */}
                </form>
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
