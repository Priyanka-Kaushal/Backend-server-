const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,   
      trim: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email address",
      },
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
