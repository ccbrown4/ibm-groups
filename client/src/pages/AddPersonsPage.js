import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Selector} from '../components';
import setUpAxios from '../utils/setUpAxios';

export const AddPersonsPage = () => {
    const [name, setName] = useState('');
    const [group, setGroup] = useState('');
    const [color, setColor] = useState('');

    const [mainMessage, setMainMessage] = useState('');
    const [nameMessage, setNameMessage] = useState('');
    const [groupMessage, setGroupMessage] = useState('');
    const [colorMessage, setColorMessage] = useState('');


    return (
        <form>
            <h3>Add Person</h3>
            <div className="message">{mainMessage}</div>
            <div>
                <div className="error-message">{nameMessage}</div>
                <Selector name='names' setInput={setName} />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}/>
            </div>
            <div>
                <div className="error-message">{groupMessage}</div>
                <Selector name='groups' setInput={setGroup} />
                <input
                    type="text"
                    placeholder="Group"
                    value={group}
                    onChange={e => setGroup(e.target.value)}/>
            </div>
            <div>
                <div className="error-message">{colorMessage}</div>
                <Selector name='colors' setInput={setColor} />
                <input
                    type="text"
                    placeholder="Color"
                    value={color}
                    onChange={e => setColor(e.target.value)}/>
            </div>

            <button onClick={e => {
                setMainMessage('');
                setNameMessage('');
                setGroupMessage('');
                setColorMessage('');

                let person = {
                    name: name,
                    group: group,
                    color: color
                }
                setUpAxios(axios);
                axios.post('/api/persons', person)
                    .then( (res) => {
                        setMainMessage('Person Added');
                        console.log(res);
                        console.log(res.data);
                    })
                    .catch( (err) => {
                        let errorData = err.response.data;
                        if(errorData.name) setNameMessage(errorData.name)
                        if(errorData.group) setGroupMessage(errorData.group)
                        if(errorData.color) setColorMessage(errorData.color)
                        console.log(err);
                    });

                e.preventDefault();
            }}>Submit</button>
        </form>
    );


}
