// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Token not provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

 req.user = decoded;
 
 console.log("decode:", decoded)// Attach user information (including role)
    next();
  });
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied, only superadmin got all the user" });
    }
    
    next();
  };
};

// const authenticateToken = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ message: "Access denied, no token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, 'your-secret-key');
//     req.user = decoded;  // Adding decoded user data to the request object
//     next();
//   } catch (error) {
//     res.status(400).json({ message: "Invalid token" });
//   }
// };


module.exports = { authenticate, authorize };
