const mongoose = require("mongoose");

const googleAuthSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  role: { type: String, default: "user" },
  avatar: String,
  provider: { type: String, default: "local" } 
});

module.exports = mongoose.model("GoogleAuth", googleAuthSchema);
