const redisClient = require("./redisClient");
const sendOtpEmail = require("./mailSender");

const generateAndSendOtp = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP to Redis with 5 min expiry
  await redisClient.setEx(`otp:${email}`, 300, otp);
  console.log("Generated OTP for", email, ":", otp);

  // Send via email
  await sendOtpEmail(email, otp);

  return otp;
};

module.exports = generateAndSendOtp;
