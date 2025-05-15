const { logger } = require("../logger/index");
const { verifyAuthToken } = require("../middleware/auth");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const rawToken = req.headers.authorization;
    const token = rawToken && rawToken.split(" ")[1];
    if (!token) {
      logger.error("No token provided");
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = await verifyAuthToken(token);
    if (!decoded) {
      logger.error("Invalid token");
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.user = decoded;
    logger.info(`Authenticated user: ${decoded.email} (${decoded.role})`);
    next();
  } catch (error) {
    logger.error(`Auth error: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      logger.warn(
        `Access denied for ${req.user.email} with role ${req.user.role}`
      );
      return res.status(403).json({
        success: false,
        message: "Access denied: insufficient permissions",
      });
    }
    next();
  };
};

module.exports = {
  isAuthenticated,
  authorize,
};
