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
    LogoutPage,
    PersonsPage,
    AddPersonsPage,
    ResetPage
} from './pages';

import {AuthProvider, AuthContext, SecureLink, SecureRoute} from './modules/AuthHook';
import './App.css';

localStorage.setItem('apiURL', 'http://localhost:5000');

function App() {
    return (<AuthProvider>
        <div className="App">
            <Router>
                <div>
                    <SecureLink to="/">Persons</SecureLink>
                    <SecureLink to="/add">Add Persons</SecureLink>
                    <SecureLink to="/reset">Update Data</SecureLink>
                    <div className="main-nav-tab">
                        <Link to="/auth">Login/Register</Link>
                    </div>

                    <hr/>

                    <Switch>
                        <Route path="/auth">
                            <div>
                                <LoginPage/>
                            </div>
                            <div>
                                <RegisterPage/>
                            </div>
                            <div>
                                <LogoutPage/>
                            </div>
                        </Route>
                        <SecureRoute path="/">
                            <PersonsPage/>
                        </SecureRoute>
                        <SecureRoute path="/add">
                            <AddPersonsPage/>
                        </SecureRoute>
                        <SecureRoute path="/reset">
                            <ResetPage/>
                        </SecureRoute>

                    </Switch>
                </div>
            </Router>
        </div>
    </AuthProvider>);
}

export default App;
