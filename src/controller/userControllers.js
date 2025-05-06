const User = require("../modelsDb/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Fetch all users, accessible only by admin
const validateUser = async (req, res) => {
  try {
    // Only admin can validate users
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to access this resource' });
    }
    
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;  // Get ID from URL parameters
  console.log("User ID from token:", req.user.id); 
  const userIdFromToken = req.user.id;  // Get ID from JWT token

  // Debugging logs
  console.log("User ID from token:", req.user.id); 

  try {
    // If the ID is not provided in the URL, use the ID from the token
    const userIdToDelete = id || userIdFromToken;

    // Validate if the ID format is correct
    if (!mongoose.Types.ObjectId.isValid(userIdToDelete)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    // Ensure the requester is a admin if deleting another user
    if (req.user.role !== "admin" && userIdToDelete !== req.user.id) {
      return res.status(403).json({
        message: "Access Denied: Only Admin can delete other users, or you can only delete your own account"
      });
    }

    // Find and delete the user
    const deletedUser = await User.findByIdAndDelete(userIdToDelete);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

module.exports = { validateUser, deleteUser};