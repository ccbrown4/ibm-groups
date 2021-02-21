const express = require('express');
const router = express.Router();
const passport = require('passport');

const Person = require('../../models/Person')

const validatePersonsInput = require('../../validation/persons');

router.get('',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

        let dbq = {};
        if(req.query.color) {
            dbq = {color: req.query.color};
        }

        Person.find(dbq)
            .collation({locale: "en" })
            .sort({color: 1, group: 1})
        .then(persons => {
            res.json({persons: persons});
        })
        .catch(err => console.log(err));
});

router.get('/names',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Person.find().distinct('name')
            .then(names => {
                res.json({names: names});
            })
            .catch(err => console.log(err));
    });

router.get('/groups',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Person.find().distinct('group')
            .then(groups => {
                res.json({groups: groups});
            })
            .catch(err => console.log(err));
    });

router.get('/colors',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
    Person.find().distinct('color')
        .then(colors => {
            res.json({colors: colors});
        })
        .catch(err => console.log(err));
});

router.post('',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
    const {errors, isValid} = validatePersonsInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

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
                }).save();
            }

            return res.ok;
        });
});

router.delete('/:name', (req, res) => {
    const name = decodeURIComponent(req.params.name);
    Person.findOne({name: name})
        .then(person => {
            if(person) person.delete();
        });
});

module.exports = router;
