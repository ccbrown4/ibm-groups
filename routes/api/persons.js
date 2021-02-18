const express = require('express');
const router = express.Router();

const Person = require('../../models/Person')

router.get('/', (req, res) => {
    Person.find()
        .then(persons => {
            res.json({persons: persons});
        })
        .catch(err => console.log(err));
});

router.get('/groups', (req, res) => {
    Person.find().distinct('group')
        .then(groups => {
            res.json({groups: groups});
        })
        .catch(err => console.log(err));
});

router.get('/colors', (req, res) => {
    Person.find().distinct('color')
        .then(colors => {
            res.json({colors: colors});
        })
        .catch(err => console.log(err));
});

router.post('/person', (req, res) => {
    Person.findOne({name: req.body.name})
        .then(person => {
            if(person) {
                person.group = req.body.group;
                person.color = req.body.color;
                person.save();
            } else {
                new Person({
                    name: req.body.name,
                    group: req.body.group,
                    color: req.body.color
                });
            }
        });
});

router.delete('/person', (req, res) => {
    Person.findOne({_id: req.body.id})
        .then(person => {
            if(person) person.delete();
        });
});

module.exports = router;
