const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    }
});

let Person = mongoose.model(`persons`, PersonSchema)

module.exports = Person;

