const sendOtpEmail = require("../utils/mailSender");
const { logger } = require("../logger/index");
const redis = require("redis");
const { verifyOtpFromRedis } = require("../utils/otpUtils");

const redisClient = redis.createClient({ url: process.env.REDIS_URL || "redis://localhost:6379" });
redisClient.connect().catch(console.error);

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const otp = generateOTP();

    await redisClient.setEx(`otp:${email}`, 300, otp);

    await sendOtpEmail(email, otp);

    logger.info(`OTP sent to ${email}`);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    logger.error("Failed to send OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};


const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const result = await verifyOtpFromRedis(email, otp);

  if (!result.success) {
    return res.status(400).json({ message: result.message });
  }

  res.status(200).json({ message: "OTP verified successfully" });
};


module.exports = {
    verifyOtp,
    sendOTP
  };
  