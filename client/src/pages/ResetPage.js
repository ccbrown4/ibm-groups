import React, {useState} from 'react';
import axios from 'axios';

import setAuthToken from "../utils/setUpAxios";
import setUpAxios from "../utils/setUpAxios";

export const ResetPage = () => {
    const [message, setMessage] = useState('');

    return (
        <>
            <h3>Reset Page</h3>
            <div style={{ width: '48%', float: 'left' }}>
                <h5>(Wipe out all person data)</h5>
                <div className='message'>{message}</div>
                <button type="button" onClick={ e => {
                    setUpAxios(axios);
                    axios.post("http://localhost:6000/api/admin/wipe")
                        .catch(err => {
                            console.log(err);
                        })
                }}>wipe persons</button>
            </div>
            <div style={{ width: '48%', float: 'left' }}>
                <h5>(Upload persons from the local disk)</h5>
                <div className='message'>{message}</div>
                <button type="button" onClick={ e => {
                    setUpAxios(axios);
                    axios.post("http://localhost:6000/api/admin/reset/local")
                        .catch(err => {
                            console.log(err);
                        })
                }}>load persons</button>
            </div>
        </>
    )
}
