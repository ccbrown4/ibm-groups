import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {PersonItem, AddPerson, Selector} from '../components';
import setUpAxios from '../utils/setUpAxios';

export const PersonsPage = () => {
    let [persons, setPersons] = useState([]);
    let [color, setColor] = useState("");

    // court.c.brown1@gmail.com
    useEffect(() => {
        setUpAxios(axios);

        axios.get('/api/persons?color=' + color)
            .then(function (response) {
                console.log(response);
                console.log(response.data);
                setPersons(response.data.persons);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [color]);

    return (
        <div>
            <h3>Persons</h3>
            <Selector name='colors' setInput={setColor} />
            {persons.map(person =>
                <PersonItem
                    person={person}
                    persons={persons}
                    key={person.name}
                />
            )}
        </div>
    );

}
