const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePersonsInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.group = !isEmpty(data.group) ? data.group : '';
    data.color = !isEmpty(data.color) ? data.color : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'name field is required';
    }

    if (Validator.isEmpty(data.group)) {
        errors.group = 'group field is required';
    }

    if (Validator.isEmpty(data.color)) {
        errors.color = 'color field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
