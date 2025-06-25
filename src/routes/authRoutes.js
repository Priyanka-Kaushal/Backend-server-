const express = require("express");
const { validationResult } = require("express-validator");
const {
  signUpValidator,
  signInValidator,
  otpLoginValidator,
  otpVerifyValidator,
} = require("../helpers/validatonMessages");

const {
  signUp,
  signIn,
  verifyOtp,
  loginWithOtp,
  loadUser,
  forgotPassword
} = require("../controller/Auth/auth");

const router = express.Router();

router.get("/load-user/:token", loadUser);

router.post("/signup", signUpValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  return signUp(req, res, next);
});

router.post("/signin", signInValidator, signIn);
router.post("/login-otp", otpLoginValidator, loginWithOtp);


router.post("/verify-otp", otpVerifyValidator, verifyOtp);

console.log("Auth routes loaded");

router.post("/forgot-password", forgotPassword)

module.exports = router;


