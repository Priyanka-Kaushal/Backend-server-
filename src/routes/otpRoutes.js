// routes/otpRoutes.js
const express = require("express");
const { sendOTP, verifyOTP } = require("../controller/otpController");

const router = express.Router();

router.get("/sendOTP", sendOTP);
router.get("/verifyOTP", verifyOTP);

module.exports = router;
