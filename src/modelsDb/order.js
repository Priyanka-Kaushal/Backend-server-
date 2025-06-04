// const mongoose =  require ("mongoose");
// const OrderSchema = mongoose.Schema(
//   {
//     razorpay_order_id: {
//       type: String,
//       required: true,
//     },
//     razorpay_payment_id: {
//       type: String,
//       required: true,
//     },
//     razorpay_signature: {
//       type: String,
//       required: true,
//     },
//     user: {
//       type: [mongoose.Schema.Types.ObjectId],
//       ref: "User",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// export const Order = mongoose.model("Order", OrderSchema);


const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      size: String,
      color: String,
    },
  ],
  totalAmount: Number,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
