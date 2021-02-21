import React from 'react';
import axios from "axios";
import setUpAxios from "../utils/setUpAxios";

export const PersonItem = (props) => {
    let {key, rerender, person, persons} = props;
    return (
        <div>
            <span>{person.color} | {person.group} | {person.name}</span>
        </div>
    );
}
