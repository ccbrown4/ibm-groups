import React, {useContext, createContext, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

import {
    RegisterPage,
    LoginPage,
    PersonsPage,
    AddPersonsPage,
    ResetPage
} from './pages';

import './App.css';

localStorage.setItem('apiURL', 'http://localhost:5000');

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Persons</Link>
                        </li>
                        <li>
                            <Link to="/add">Add Persons</Link>
                        </li>
                        <li>
                            <Link to="/reset">Reset Data</Link>
                        </li>
                        <li>
                            <Link to="/auth">Login/Register</Link>
                        </li>
                    </ul>

                    <hr/>

                    <Switch>
                        <Route exact path="/">
                            <PersonsPage/>
                        </Route>
                        <Route exact path="/add">
                            <AddPersonsPage/>
                        </Route>
                        <Route path="/reset">
                            <ResetPage/>
                        </Route>
                        <Route path="/auth">
                            <div>
                                <LoginPage/>
                            </div>
                            <div>
                                <RegisterPage/>
                            </div>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
