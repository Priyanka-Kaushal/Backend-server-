const { check } = require("express-validator");

exports.permissionAddValidator = [
    check("name", "name is required" ).not().isEmpty(),
];

exports.adminValidator = [
    check('email' ).isEmail().withMessage('Invalid email').normalizeEmail({
        gmail_remove_dots: true
     }), 
    check('password').isLength({min: 6}).not().isEmpty().withMessage('Password should be at least 6 characters')
]

exports.userValidator = [
    check('email' ).isEmail().withMessage('Invalid email').normalizeEmail({
        gmail_remove_dots: true
     }), 
    check('password').isLength({min: 6}).not().isEmpty().withMessage('Password should be at least 6 characters')
]