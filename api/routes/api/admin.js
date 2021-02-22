const express = require('express');
const router = express.Router();
const fs = require('fs');

const passport = require('passport');
const Person = require('../../models/Person')
const AddPerson = require('../../utils/AddPerson');

router.post('/wipe',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Person.deleteMany({}).then(() => {
            res.send({
                status: 200,
                message: 'All persons are wiped',
            });
        });
    });

router.post('/reset/local',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        let rawdata = fs.readFileSync('./resources/input.json');
        let jsonData = JSON.parse(rawdata);
        Object.entries(jsonData).map(group => {
            Object.entries(group[1]).map(person => {
                AddPerson(
                    new Person({
                        name: person[0],
                        group: group[0],
                        color: person[1]
                    })
                );
            });
        });
    });

router.post('/reset',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        try {
            if (!req.files) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                const input = req.files.input;
                const data = JSON.parse(input.data.toString());

                Object.entries(data).map(group => {
                    Object.entries(group[1]).map(person => {
                        AddPerson(
                            new Person({
                                name: person[0],
                                group: group[0],
                                color: person[1]
                            })
                        );
                    });
                });

                //send response
                res.send({
                    status: 200,
                    message: 'File is uploaded',
                    data: {
                        name: input.name,
                        mimetype: input.mimetype,
                        size: input.size,
                    }
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });

module.exports = router;
