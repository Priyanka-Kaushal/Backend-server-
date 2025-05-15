const redisClient = require("../utils/redisClient");

async function verifyOtpFromRedis(email, otp) {
  try {
    const storedOtp = await redisClient.get(email);
    if (!storedOtp) {
      return { success: false, message: "OTP expired or not found" };
    }

    if (storedOtp !== otp) {
      return { success: false, message: "Invalid OTP" };
    }

    await redisClient.del(email); // Clear OTP after use
    return { success: true };
  } catch (error) {
    console.error("OTP verification error:", error);
    return { success: false, message: "Server error during OTP verification" };
  }
}

module.exports = {
  verifyOtpFromRedis,
};
