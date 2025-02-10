const { check } = require("express-validator");

exports.registerValidator = [
    check("first_name", "first name is required" ).not().isEmpty(),
    check("last_name", "last name is required" ).not().isEmpty(),
    check("email", "Email id is required" ).isEmail().normalizeEmail({
       gmail_remove_dots: true
    }), 
    check("password", "Password is required" ).not().isEmpty(),
];

exports.loginValidator = [
    check('email' ).isEmail().withMessage('Invalid email').normalizeEmail({
        gmail_remove_dots: true
     }), 
    check('password').isLength({min: 6}).not().isEmpty().withMessage('Password should be at least 6 characters')
]