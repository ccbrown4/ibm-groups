const assert  = require('chai').assert;

const isEmpty = require('../validation/is-empty');
const validateLoginInput = require('../validation/login');
const validateRegisterInput = require('../validation/register');

const User = require('../models/User')


/*let testUser = null;

setup((done), () => {
    new User({
        name: "test user",
        email: "test@users.com",
        password: "password"})
        .save()
        .then(user => testUser = user)
        .catch(err => console.log(err));
});

teardown((done), () => {
    testUser.delete().catch(err => console.log(err));
});*/


describe("is empty", () => {
    describe("#object is undefined", () => {
        it('should return true if the given value is undefined', () => {
            assert.isTrue(isEmpty(undefined), 'undefined is not empty');
        });
    });

    describe("#object is null", () => {
        it('should return true if the given value is null', () => {
            assert.isTrue(isEmpty(null), 'null is not empty');
        });
    });

    describe("#object is empty", () => {
        it('should return true if the given value is an empty object', () => {
            assert.isTrue(isEmpty({}), 'object is not empty');
        });
    });

    describe("#array is empty", () => {
        it('should return true if the given value is an empty array', () => {
            assert.isTrue(isEmpty({}), 'array is not empty');
        });
    });

    describe("#string is empty", () => {
        it('should return true if the given value is a empty string', () => {
            assert.isTrue(isEmpty(""), 'blank string is not empty');
        });
    });

    describe("#string is empty", () => {
        it('should return true if the given value is not a empty string', () => {
            assert.isFalse(isEmpty('string is not empty'), 'string is empty');
        });
    });

    const notEmptyArray = [1];
    describe("#array is not empty", () => {
        it('should return true if the given value is not a empty array', () => {
            assert.isFalse(isEmpty(notEmptyArray), 'array is empty');
        });
    });

    const notEmptyObject = {empty:false};
    describe("#object is not empty", () => {
        it('should return true if the given value is not a empty object', () => {
            assert.isFalse(isEmpty(notEmptyObject), 'object is empty');
        });
    });
});


describe("login validation", () => {
    describe("#non-valid email", () => {
        it('should return an error message for the email', () => {
            const {errors, isValid} = validateLoginInput({
                name: "test user",
                email: "testusers.com",
                password: "password"
            });

            if (!isValid) {
                assert.equal(errors.email, "Email is invalid", "non-valid email not detected");
            } else {
                assert.fail("non-valid email not detected")
            }
        });
    });
    describe("#empty email", () => {
        it('should return an error message for the email', () => {
            const {errors, isValid} = validateLoginInput({
                name: "test user",
                email: "",
                password: "password"
            });

            if (!isValid) {
                assert.equal(errors.email, "Email field is required", "non-valid email not detected");
            } else {
                assert.fail("non-valid email not detected")
            }
        });
    });
    describe("#empty password", () => {
        it('should return an error message for the password', () => {
            const {errors, isValid} = validateLoginInput({
                name: "test user",
                email: "test@users.com",
                password: ""
            });

            if (!isValid) {
                assert.equal(errors.password, "Password field is required", "non-valid password not detected");
            } else {
                assert.fail("non-valid password not detected")
            }
        });
    });
    describe("#valid", () => {
        it('should pass validation', () => {
            const {errors, isValid} = validateLoginInput({
                name: "test user",
                email: "test@users.com",
                password: "password"
            });

            if (isValid) {
                assert.isOk('passes', 'login passes field validation');
            } else {
                assert.fail("login didn't pass field validation")
            }
        });
    });
});

describe("register validation", () => {
    describe("#name length", () => {
        it('check if the name between 2 and 30 characters', () => {
            const {errors, isValid} = validateRegisterInput({
                name: "t",
                email: "test@users.com",
                password: "password",
                password2: "password"
            });

            if (!isValid) {
                assert.equal(errors.name, 'Name must be between 2 and 30 characters', "name feild is not the right length");
            } else {
                assert.fail("registration should have not passed")
            }

        });
    });

    describe("#Name is required", () => {
        it('Name field is required', () => {
            const {errors, isValid} = validateRegisterInput({
                name: "",
                email: "test@users.com",
                password: "password",
                password2: "password"
            });

            if (!isValid) {
                assert.equal(errors.name, "Name field is required", "Name field is required");
            } else {
                assert.fail("registration should have not passed")
            }

        });
    });

    describe("#email isn't set", () => {
        it('#email not set', () => {
            const {errors, isValid} = validateRegisterInput({
                name: "test user",
                email: "",
                password: "password",
                password2: "password"
            });

            if (!isValid) {
                assert.equal(errors.email, "Email field is required", "email is not set in the data");
            } else {
                assert.fail("registration should have not passed")
            }

        });
    });

    describe('#Email is invalid', () => {
        it('email is not formated correctly', () => {
            const {errors, isValid} = validateRegisterInput({
                name: "test user",
                email: "testusers.com",
                password: "password",
                password2: "password"
            });

            if (!isValid) {
                assert.equal(errors.email, 'Email is invalid', 'Email is invalid');
            } else {
                assert.fail("registration should have not passed")
            }

        });
    });

    describe("#Password field is required", () => {
        it('password not set', () => {
            const {errors, isValid} = validateRegisterInput({
                name: "test user",
                email: "test@users.com",
                password: "",
                password2: "password"
            });

            if (!isValid) {
                assert.equal(errors.password, 'Password field is required', "password was set");
            } else {
                assert.fail("registration should have not passed")
            }

        });
    });

    describe('#Password must be at least 6 characters', () => {
        it('Password is under 6 characters', () => {
            const {errors, isValid} = validateRegisterInput({
                name: "test user",
                email: "test@users.com",
                password: "pass",
                password2: "pass"
            });

            if (!isValid) {
                assert.equal(errors.password, 'Password must be at least 6 characters', "password is above 6 characters");
            } else {
                assert.fail("registration should have not passed")
            }

        });
    });

    describe('#the second password is missing', () => {
        it('both password fields are required', () => {
            const {errors, isValid} = validateRegisterInput({
                name: "test user",
                email: "test@users.com",
                password: "password",
                password2: ""
            });

            if (!isValid) {
                assert.equal(errors.password2, 'Confirm Password field is required', "empty password2 field was not caught");
            } else {
                assert.fail("registration should have not passed")
            }

        });
    });

    describe('#Passwords must match but are different', () => {
        it('test if the passwords are the same', () => {
            const {errors, isValid} = validateRegisterInput({
                name: "test user",
                email: "test@users.com",
                password: "password",
                password2: "password1"
            });

            if (!isValid) {
                assert.equal(errors.password2, "Passwords must match", "passwords should not have matched");
            } else {
                assert.fail("registration should have not passed")
            }

        });
    });

    describe("#valid", () => {
        it('should pass validation', () => {
            const {errors, isValid} = validateRegisterInput({
                name: "test user",
                email: "test@users.com",
                password: "password",
                password2: "password"
            });

            if (isValid) {
                assert.isOk('passes', 'registration passes field validation');
            } else {
                assert.fail("registration didn't pass field validation")
            }

        });
    });
});


