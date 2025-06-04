const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectID, ref: 'Product' },
      quantity: { type: Number, default: 1 },
      price: { type: Number, default: 0 },
      size: String,
      color: String,
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

}, { timestamps: true })


const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;