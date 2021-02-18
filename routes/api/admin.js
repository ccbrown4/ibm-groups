const express = require('express');
const router = express.Router();

const Person = require('../../models/Person')

router.post('/wipe', (req, res) => {
    Person.deleteMany({}).then(() => {
        res.send({
            status: 200,
            message: 'All persons are wiped',
        });
    });
});

router.post('/reset', (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            const input = req.files.input;
            const data = JSON.parse(input.data.toString());

            Person.deleteMany({})
                .then(() => {
                    Object.entries(data).map(group => {
                        Object.entries(group[1]).map(person => {
                            return new Person({
                                name: person[0],
                                group: group[0],
                                color: person[1]
                            }).save();
                        });
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
