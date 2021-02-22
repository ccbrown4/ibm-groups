import React, {useEffect, useState} from 'react';
import {
    Route,
    Link,
    useHistory
} from "react-router-dom";

const AuthContext = React.createContext();

function SecureLink({to, children}) {
    const {isAuthenticated} = React.useContext(AuthContext);
    if (isAuthenticated) {
        return (
            <div  className="main-nav-tab">
                <Link to={to}>{children}</Link>
            </div>
        )
    } return ( <></> )
}

function SecureRoute({path, children}) {
    const {isAuthenticated} = React.useContext(AuthContext);
    if (isAuthenticated) {
        return (
            <Route exact path={path}>{children}</Route>
        )
    } return ( <></> )
}

function AuthProvider({children}) {
    const [isAuthenticated, setAuthenticated] = useState(!!(localStorage.getItem('authToken')));



    function setIsAuthenticated(isAuthenticated) {
        setAuthenticated(isAuthenticated);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider, AuthContext, SecureLink, SecureRoute}
