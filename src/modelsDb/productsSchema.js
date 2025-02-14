const mongoose = require("mongoose");

// Define the user schema first
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: false,
  },
  description:{
    type: String,
    required: true,
  },
  category: {
    type: Array,
    required: false
  },
  image: {
    type: String,
      required: true,
  },
  price: {
    type: string,
    required: true,
  },
  tags: {
    type: [String],
    required: false,
  },
  productColor: {
    type: string,
    required: true
  },
  size:{
    type: string,
    required: true,
  },
  Quantity: {
    type: Number,
  }
}, { timestamps: true } );



// Create the Product model using the productSchema
const Products = mongoose.model("Products", productSchema);

module.exports = Products;
