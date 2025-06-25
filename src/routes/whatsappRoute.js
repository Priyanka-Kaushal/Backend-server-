const express = require("express");
const router = express.Router();
const { sendPaymentAlert } = require("../controller/whatsAppMessage");

router.post("/send-payment-alert", sendPaymentAlert);

module.exports = router;
