const crypto = require("crypto");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// Log to confirm .env values are loaded
console.log("📧 EMAIL_USER:", process.env.EMAIL_USER);
console.log("🔐 EMAIL_PASS length:", process.env.EMAIL_PASS?.length || 0);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Optional: Check transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error);
  } else {
    console.log("✅ Email transporter is ready to send emails.");
  }
});

// Generate a simple 6-character hexadecimal OTP
const generateOTP = () => {
  return crypto.randomBytes(3).toString("hex"); // e.g. 'a1b2c3'
};

// Send OTP via email
const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  };

  try {
    console.log("🚀 Attempting to send email to:", email);
    console.log("📤 Mail options:", mailOptions);

    await transporter.sendMail(mailOptions);

    console.log("📧 OTP email sent successfully to:", email);
    return true;
  } catch (err) {
    console.error("❌ Email sending error:", err.message || err);
    return false;
  }
};

// Generate OTP and attempt to send it
const generateAndSendOTP = async (email) => {
  const otp = generateOTP();
  console.log("🔢 Generated OTP:", otp);

  const sent = await sendOTPEmail(email, otp);

  if (!sent) {
    console.log("🚨 Failed to send OTP email to:", email);
    throw new Error("Failed to send OTP");
  }

  return otp;
};

// Basic OTP verification
const verifyOTP = (receivedOtp, storedOtp) => {
  return receivedOtp === storedOtp;
};

module.exports = {
  generateOTP,
  sendOTPEmail,
  generateAndSendOTP,
  verifyOTP,
};
