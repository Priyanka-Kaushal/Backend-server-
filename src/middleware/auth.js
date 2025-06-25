  const jwt = require("jsonwebtoken");
  const { logger } = require("../logger/index");

  const generateToken = (user) => {
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      throw new Error("JWT secret key is missing!");
    }

    logger.debug(`Generating token for user: ${user.email}`);

    try {
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
      logger.info(`Token generated for user: ${user.email}`);
      return token;
    } catch (error) {
      logger.error(
        `Error generating token for user ${user.email}: ${error.message}`
      );
      throw error;
    }
  };

  const verifyAuthToken = (token) => {
    if (!token) {
      logger.error("No token provided");
      return null;
    }

    try {
      logger.debug(`Verifying token: ${token}`);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded token :", decoded);
      logger.info("Token verified successfully");

      return decoded;
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        logger.error(`Token expired: ${error.message}`);
      } else if (error.name === "JsonWebTokenError") {
        logger.error(`Invalid token signature: ${error.message}`);
      } else {
        logger.error(`Error verifying token: ${error.message}`);
      }

      return null;
    }
  };

  const generateResetToken = (payload) => {
    return jwt.sign(payload, process.env.RESET_SECRET, {
      expiresIn: "1d",
    });
  };

  const verifyResetToken = (token) => {
    try {
      const payload = jwt.verify(token, process.env.RESET_SECRET);
      return payload;
    } catch (error) {
      logger.error(`Error verifying reset token: ${error.message}`);
      return null;
    }
  };

  module.exports = {
    generateToken,
    verifyAuthToken,
    generateResetToken,
    verifyResetToken,
  };
