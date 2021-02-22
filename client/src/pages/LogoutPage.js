import React, {useState, useEffect} from 'react';
import axios from 'axios';

export const LogoutPage = () => {

    const [mainMessage, setMainMessage] = useState('');

    return (
        <form>
            <h3>Log Out</h3>
            <div className="message">{mainMessage}</div>

            <button onClick={e => {
                localStorage.setItem('authToken', null);
                axios.defaults.headers.common['Authorization'] = null;
                setMainMessage("Logged Out");
            }}>Submit
            </button>
        </form>
    );
}
