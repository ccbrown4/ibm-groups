const mongoose = require('mongoose');
const Person = require('../models/Person')

module.exports = function AddPerson(person) {
    Person.findOne({name: person.name})
        .then(currPerson => {
            if (currPerson) {
                currPerson.group = person.group;
                currPerson.color = person.color;
                currPerson.save();
            } else {
                new Person({
                    name: person.name,
                    group: person.group,
                    color: person.color
                }).save();
            }
        });
}
