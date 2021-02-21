import React, {useState, useEffect} from 'react';
import axios from 'axios';

export const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [mainMessage, setMainMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    return (
        <form>
            <h3>Sign In</h3>
            <div className="message">{mainMessage}</div>
            <div>
                <div className="error-message">{emailMessage}</div>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
                <div className="error-message">{passwordMessage}</div>
                <input
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
            </div>
            <button onClick={e => {
                axios.post('http://localhost:5000/api/users/login', {
                        email: email,
                        password: password
                    })
                    .then(function (response) {
                        let token = response.data.token;
                        localStorage.setItem('authToken', token);
                        axios.defaults.headers.common['Authorization'] = token;
                        setMainMessage('Logged In');
                        setEmailMessage('');
                        setPasswordMessage('');
                        console.log(response);
                    })
                    .catch(function (error) {
                        let errorData = error.response.data
                        if(errorData.email) setEmailMessage(errorData.email)
                        if(errorData.password) setPasswordMessage(errorData.password)
                        console.log(error);
                    });

                e.preventDefault();
            }}>Submit
            </button>
        </form>
    );
}
