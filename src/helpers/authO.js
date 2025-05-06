// const nodemailer = require("nodemailer");
// const crypto = require("crypto");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");

// dotenv.config();

// // Nodemailer configuration to send email
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,  
//     pass: process.env.EMAIL_PASS,  
//   },
// });

// const generateOTP = () => {
//   return crypto.randomBytes(3).toString("hex"); 

// const sendOTPEmail = async (email, otp) => {
//   try {
//     const mailOptions = {
//       from: process.env.EMAIL_USER, // sender address
//       to: email, 
//       subject: "Your OTP Code", // Subject
//       text: `Your OTP is: ${otp}`, // OTP message
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("Message sent: %s", info.messageId);
//     return true;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return false;
//   }
// };

// const generateAndSendOTP = async (email) => {
//   const otp = generateOTP();
//   const isSent = await sendOTPEmail(email, otp);

//   if (isSent) {
//     return otp; // For testing purposes, we return the OTP
//   } else {
//     throw new Error("Failed to send OTP");
//   }
// };

// const verifyOTP = (receivedOtp, storedOtp) => {
//   return receivedOtp === storedOtp;
// };

// // Example usage
// const email = "user@example.com";
// generateAndSendOTP(email).then((otp) => {
//   console.log("OTP sent to email:", otp);
//   // Store OTP in your database or in-memory for comparison (for simplicity, storing OTP in variable)
// });
