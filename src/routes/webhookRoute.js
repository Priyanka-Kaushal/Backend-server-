const express = require("express");
const router = express.Router();
const webhookController = require("../controller/whatsAppWebhook"); 

router.get("/webhook-response", webhookController.verifyWebhook);
router.post("/webhook", webhookController.receiveWhatsappWebhook);

module.exports = router;

