const express = require("express");
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
} = require("../controller/Auth/auth");

const router = express.Router();

router.get("/load-user/:token", loadUser);
router.post("/signup", signUpValidator, signUp);
router.post("/signin", signInValidator, signIn);
// router.post("/login-otp", otpLoginValidator, loginWithOtp);
router.post("/verify-otp", otpVerifyValidator, verifyOtp);
router.post("/login-otp", otpLoginValidator, loginWithOtp);
console.log("✅ Auth routes loaded");

module.exports = router;

