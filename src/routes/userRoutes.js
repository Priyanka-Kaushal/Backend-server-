const express = require("express");
const { signUpValidator, signInValidator } = require("../helpers/validatonMessages");
const { signUp, signIn, verifyOtp, loadUser } = require("../controller/auth");

const router = express.Router();

router.get("/load-user/:token", loadUser);
router.post("/signup", signUpValidator, signUp);
router.post("/signin", signInValidator, signIn);
router.post("/verify-otp", verifyOtp);

module.exports = router;
