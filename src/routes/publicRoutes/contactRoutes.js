const express = require("express");
const router = express.Router();
const { contactForm } = require("../../controller/contact/contactController");

router.post("/contact-details", contactForm);

module.exports = router;
