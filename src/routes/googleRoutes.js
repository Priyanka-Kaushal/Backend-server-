const express = require("express");
const router = express.Router();
const googleAuthController = require("../controller/Auth/googleAuthController");

router.post("/google-login", googleAuthController.googleLogin);

module.exports = router;
