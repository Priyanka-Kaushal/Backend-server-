const { check } = require("express-validator");

const lowerCase = /[a-z]/;
const upperCase = /[A-Z]/;
const numbers = /[0-9]/;

const signUpValidator = [
  check("first_name", "First name is required").not().isEmpty(),
  check("last_name", "Last name is required").not().isEmpty(),
  check("email", "Invalid email address")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("password", "Password is required")
    .not()
    .isEmpty()
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .custom((password) => {
      const errors = [];
      if (!lowerCase.test(password)) errors.push("Lowercase letter required");
      if (!upperCase.test(password)) errors.push("Uppercase letter required");
      if (!numbers.test(password)) errors.push("Number required");

      if (errors.length > 0) {
        throw new Error(errors.join(", "));
      }

      return true;
    }),
  check("role", "Role is required").not().isEmpty(),
];

const signInValidator = [
  check("email", "Invalid email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),

  check("password", "Password is required")
    .not()
    .isEmpty()
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .custom((password) => {
      const errors = [];
      if (!lowerCase.test(password)) errors.push("Lowercase letter required");
      if (!upperCase.test(password)) errors.push("Uppercase letter required");
      if (!numbers.test(password)) errors.push("Number required");

      if (errors.length > 0) {
        throw new Error(errors.join(", "));
      }

      return true;
    }),
];

module.exports = {
  signUpValidator,
  signInValidator,
};