// const { check } = require("express-validator");

// const lowerCase = /[a-z]/;
// const upperCase = /[A-Z]/;
// const numbers = /[0-9]/;

// const signUpValidator = [
//   check("first_name", "First name is required").not().isEmpty(),
//   check("last_name", "Last name is required").not().isEmpty(),
//   check("email", "Invalid email address")
//     .isEmail()
//     .normalizeEmail({ gmail_remove_dots: true }),
//   check("password", "Password is required")
//     .not()
//     .isEmpty()
//     .bail()
//     .isLength({ min: 8 })
//     .withMessage("Password must be at least 8 characters")
//     .custom((password) => {
//       const errors = [];
//       if (!lowerCase.test(password)) errors.push("Lowercase letter required");
//       if (!upperCase.test(password)) errors.push("Uppercase letter required");
//       if (!numbers.test(password)) errors.push("Number required");

//       if (errors.length > 0) {
//         throw new Error(errors.join(", "));
//       }

//       return true;
//     }),
//   check("role", "Role is required").not().isEmpty(),
// ];

// const signInValidator = [
//   check("email", "Invalid email")
//     .isEmail()
//     .normalizeEmail({ gmail_remove_dots: true }),

//   check("password", "Password is required")
//     .not()
//     .isEmpty()
//     .bail()
//     .isLength({ min: 8 })
//     .withMessage("Password must be at least 8 characters")
//     .custom((password) => {
//       const errors = [];
//       if (!lowerCase.test(password)) errors.push("Lowercase letter required");
//       if (!upperCase.test(password)) errors.push("Uppercase letter required");
//       if (!numbers.test(password)) errors.push("Number required");

//       if (errors.length > 0) {
//         throw new Error(errors.join(", "));
//       }

//       return true;
//     }),
// ];

// module.exports = {
//   signUpValidator,
//   signInValidator,
// };

const { check } = require("express-validator");

const lowerCase = /[a-z]/;
const upperCase = /[A-Z]/;
const numbers = /[0-9]/;

// Signup Validator
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
  // check("role", "Role is required").not().isEmpty(),
];

// Signin Validator
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

// OTP Login Validator (email only)
const otpLoginValidator = [
  check("email", "Invalid email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
];

// OTP Verify Validator (email + otp)
const otpVerifyValidator = [
  check("email", "Invalid email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("otp", "OTP is required and must be 6 digits")
    .isLength({ min: 6, max: 6 })
    .isNumeric(),
];

module.exports = {
  signUpValidator,
  signInValidator,
  otpLoginValidator,
  otpVerifyValidator,
};
