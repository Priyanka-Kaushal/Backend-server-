const mongoose = require("mongoose");

const BlogCommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencing the User model
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog", // Referencing the Blog model
      required: true,
    },
  },
  { timestamps: true }
);

const BlogCommentDb = mongoose.model("BlogComment", BlogCommentSchema);

module.exports = BlogCommentDb;
