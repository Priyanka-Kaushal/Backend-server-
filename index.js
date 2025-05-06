const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./src/utils/db");
const cors = require("cors");
const path = require("path");
const {
  generateOTP,
  sendOTPEmail,
  generateAndSendOTP,
  verifyOTP,
} = require("./src/controller/accessPermission/authOtpVerification");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json()); // built-in JSON parser
app.use(express.urlencoded({ extended: true })); // handles form-encoded data

// In-memory OTP store (consider DB or Redis in production)
const otpStore = {};

// Serve static files correctly
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

// Route: Send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  console.log("📨 Request to send OTP for:", email);

  try {
    const otp = await generateAndSendOTP(email);
    otpStore[email] = otp; // Store temporarily
    res.json({ message: "OTP sent to email." });
  } catch (error) {
    console.error("❌ Error in /send-otp:", error);
    res.status(500).json({ error: "Failed to send OTP." });
  }
});

// Route: Verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] && verifyOTP(otp, otpStore[email])) {
    delete otpStore[email]; // Clear OTP after verification
    res.json({ success: true, message: "OTP verified successfully." });
  } else {
    res.status(400).json({ success: false, message: "Invalid OTP." });
  }
});

// Import Routes
const userRoutes = require("./src/routes/userRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const blogCommentsRoutes = require("./src/routes/blogCommentsRoutes");
const productRoutes = require("./src/routes/productsRoutes");


// API Routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/blogs/comments", blogCommentsRoutes);
app.use("/api/products", productRoutes);

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📂 Static files served from: ${path.join(__dirname, "public")}`);
});
