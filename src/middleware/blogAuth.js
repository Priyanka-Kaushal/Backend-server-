
const jwt = require('jsonwebtoken');
const User = require('../modelsDb/User');

const blogauthenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token not provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Log the decoded user data for debugging
    console.log('Decoded user data:', decoded);

    // Check if the decoded object contains the necessary user info
    if (!decoded || !decoded.id) {
      return res.status(403).json({ message: 'Invalid token payload' });
    }

    req.user = decoded;  // Attach user information (including role)
    next();
  });
};

module.exports = blogauthenticate;