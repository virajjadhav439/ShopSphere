const {body} = require('express-validator');

const signupValidator = [
    body("name").trim().notEmpty().normalizeEmail().withMessage("Name is Required"),
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:8}).withMessage("Password must be at least 8 characters"),
]

const loginValidator = [
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("password").notEmpty().withMessage("Password is Required"),
]

module.exports = {
    signupValidator,
    loginValidator,
}