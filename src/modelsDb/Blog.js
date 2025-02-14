const mongoose = require("mongoose");
// const { Schema } = mongoose;

// Define the user schema first
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    owner: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create the User model using the userSchema
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
