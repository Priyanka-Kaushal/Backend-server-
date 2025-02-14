const jwt = require('jsonwebtoken');
const User = require('../modelsDb/User');
require("dotenv").config(); 

const generateToken = (user) => {
  console.log("Generating token for user:", user);
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Generate JWT Token
    const authToken = (newUser) => {
      return jwt.sign(
        { id: newUser.id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    };

//  verify token for profile after login
const verifyToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "A token is required for authentication",
    });
  }

  try {
    let bearerToken;
    
    // Check if token follows "Bearer <token>" format
    if (token.startsWith("Bearer ")) {
      bearerToken = token.split(" ")[1]; // Extract actual token
    } else {
      bearerToken = token; // Use token as is if it's not prefixed with "Bearer"
    }

    if (!bearerToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    const decodedData = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = decodedData.user;
     
    console.log( decodedData.user)
    req.user = {
      id: decodedData.id,
      email: decodedData.email,
    };
   
    console.log("decodedData for user:", req.user);

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = { generateToken, authToken, verifyToken };






