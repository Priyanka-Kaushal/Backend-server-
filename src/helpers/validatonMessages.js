const { check } = require("express-validator");

const lowerCase = /[a-z]/;
const upperCase = /[A-Z]/;
const numbers = /[0-9]/;

const signUpValidator = [
  check("first_name", "First name is required").trim().not().isEmpty(),
  check("last_name", "Last name is required").trim().not().isEmpty(),
  check("email", "Invalid email address")
    .trim()
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true })
    .custom((email) => {
      const domain = email.split('@')[1];
      if (!domain || !domain.includes('.')) {
        throw new Error('Email must contain a valid domain (e.g., .com, .in)');
      }

    const validTLDs = ['com', 'in', 'org', 'net', 'co'];
    const tld = domain.split('.').pop()?.toLowerCase();
    if (!validTLDs.includes(tld)) {
      throw new Error('Email must have a valid TLD (e.g., .com, .in)');
    }

      return true;
    }),
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

// Signin Validator
const signInValidator = [
  // check("email", "Invalid email")
  //   .isEmail()
  //   .normalizeEmail({ gmail_remove_dots: true }),
  // check("password", "Password is required")
  //   .not()
  //   .isEmpty()
  //   .bail()
  //   .isLength({ min: 8 })
  //   .withMessage("Password must be at least 8 characters")
  //   .custom((password) => {
  //     const errors = [];
  //     if (!lowerCase.test(password)) errors.push("Lowercase letter required");
  //     if (!upperCase.test(password)) errors.push("Uppercase letter required");
  //     if (!numbers.test(password)) errors.push("Number required");

  //     if (errors.length > 0) {
  //       throw new Error(errors.join(", "));
  //     }
  //     return true;
  //   }),
   check("email", "Invalid email address")
    .trim()
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true })
    .custom((email) => {
      const domain = email.split('@')[1];
      if (!domain || !domain.includes('.')) {
        throw new Error('Email must contain a valid domain (e.g., .com, .in)');
      }
      return true;
    }),
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

const otpLoginValidator = [
  check("email", "Invalid email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
];

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
