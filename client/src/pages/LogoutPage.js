import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {AuthContext} from "../modules/AuthHook";

export const LogoutPage = () => {
    const {isAuthenticated, setIsAuthenticated} = React.useContext(AuthContext);

    const [mainMessage, setMainMessage] = useState('');

    if(isAuthenticated) {
        return (
            <form>
                <h3>Log Out</h3>
                <div className="message">{mainMessage}</div>

                <button onClick={e => {
                    localStorage.setItem('authToken', null);
                    axios.defaults.headers.common['Authorization'] = null;
                    setIsAuthenticated(false);
                    setMainMessage("Logged Out");
                }}>Submit
                </button>
            </form>
        );
    } return ( <></> )
}
