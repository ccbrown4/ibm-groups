import React, {useEffect, useState} from 'react';
import setUpAxios from "../utils/setUpAxios";
import axios from "axios";
import {AuthContext} from "../modules/AuthHook";

export const Selector = (props) => {
    const {setIsAuthenticated} = React.useContext(AuthContext);
    const {name, setInput} = props;

    const[selections, setSelections] = useState([]);

    useEffect(() => {
        setUpAxios(axios);
        axios.get('/api/persons/' + name)
            .then(function (response) {
                console.log(response);
                console.log(response.data);
                setSelections(response.data[name]);
            })
            .catch(function (error) {
                if (error.code === 401) setIsAuthenticated(false);
            });
    }, []);

    return (
        <select name="{name}" id="{name}" onChange={e => {
            const value = e.currentTarget.selectedOptions[0].value;
            setInput(value);
            e.preventDefault();
        }}>
            <option value=""> </option>
            {
                selections.map(item => <option value={item} >{item}</option>)
            }
        </select>
    );
}
