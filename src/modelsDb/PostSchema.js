const mongoose = require("mongoose");

// Define the user schema first
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  category: {
    type: Array,
    required: false
  },
}, { timestamps: true } );



// Create the User model using the userSchema
const User = mongoose.model("Post", postSchema);

module.exports = User;



