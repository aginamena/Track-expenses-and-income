
import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from './components/Register';
import Home from './components/Home';
import Expense from './components/Expense';
import { useState, useEffect } from "react"
import Naviation from './components/Naviation';
import Income from './components/Income';
import EditExpense from './components/EditExpense';
import EditIncome from './components/EditIncome';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.emailAddress ? true : false);
  console.log("you email is " + localStorage.emailAddress);
  return (
    <Router>
      <div className="App">
        {isLoggedIn && <Naviation logout={() => setIsLoggedIn(false)} />}
        <Switch>
          {
            isLoggedIn ? <Route exact path="/" component={Home} /> :
              <Route exact path="/">
                <Login setLogin={value => setIsLoggedIn(value)} />
              </Route>
          }

          <Route exact path="/register">
            <Register setLogin={value => setIsLoggedIn(value)} />
          </Route>
          <Route exact path="/income" component={Income} />
          <Route exact path="/expense" component={Expense} />
          <Route exact path="/editExpense/:id" component={EditExpense} />
          <Route exact path="/editIncome/:id" component={EditIncome} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
