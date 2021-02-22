import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {AuthContext} from "../modules/AuthHook";

export const RegisterPage = () => {
    const {isAuthenticated} = React.useContext(AuthContext);

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[password2, setPassword2] = useState('');

    const[mainMessage, setMainMessage] = useState('');
    const[nameMessage, setNameMessage] = useState('');
    const[emailMessage, setEmailMessage] = useState('');
    const[passwordMessage, setPasswordMessage] = useState('');
    const[password2Message, setPassword2Message] = useState('');

    if(!isAuthenticated) {
        return (
            <form>
                <h3>Sign Up</h3>
                <div className="message">{mainMessage}</div>
                <div>
                    <div className="error-message">{nameMessage}</div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}/>
                </div>
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
                <div>
                    <div className="error-message">{password2Message}</div>
                    <input
                        type="text"
                        placeholder="Confirm Password"
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}/>
                </div>
                <button onClick={e => {
                    axios.post('http://localhost:5000/api/users/register', {
                        name: name,
                        email: email,
                        password: password,
                        password2: password2
                    })
                        .then(function (response) {
                            console.log(response);
                            setMainMessage('Account Created');
                            setNameMessage('');
                            setEmailMessage('');
                            setPasswordMessage('');
                            setPassword2Message('');
                        })
                        .catch(function (error, data) {
                            setMainMessage('');
                            let errorData = error.response.data
                            if(errorData.name) { setNameMessage(errorData.name) } else { setNameMessage('') };
                            if(errorData.email) { setEmailMessage(errorData.email) } else { setEmailMessage('') };
                            if(errorData.password) { setPasswordMessage(errorData.password) } else { setPasswordMessage('') };
                            if(errorData.password2) { setPassword2Message(errorData.password2) } else { setPassword2Message('') };
                            console.log(error);
                        });

                    e.preventDefault();
                }}>Submit</button>
            </form>
        );
    } return ( <></> )
}
