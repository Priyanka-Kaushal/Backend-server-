// const { check, validationResult } = require("express-validator");

// const Validate = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     let error = {};
//     errors.array().map((err) => (error[err.param] = err.msg));
//     return res.status(422).json({ error });
//   }
//   next();
// };

// // const signInValidator = [
// //   check("email").isEmail().withMessage("Invalid email"),
// //   check("password")
// //     .isLength({ min: 6 })
// //     .withMessage("Password should be at least 6 characters"),
// // ];

// // module.exports = {
// //   Validate,
// //   signInValidator,
// // };


const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = {};
    errors.array().map((err) => (error[err.param] = err.msg));
    return res.status(422).json({ error });
  }
  next();
};

module.exports = {
  validate,
};
