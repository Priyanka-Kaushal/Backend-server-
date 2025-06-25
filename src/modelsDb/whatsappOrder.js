// models/OrderStatus.js
const mongoose = require("mongoose");

const orderSchemaWhatsApp = new mongoose.Schema({
  customerName: String,
  customerPhone: String,
  product: String,
  amount: String,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Unavailable"],
    default: "Pending",
  },
});

module.exports = mongoose.model("OrderStatus", orderSchemaWhatsApp);
