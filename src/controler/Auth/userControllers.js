const User = require("../../modelsDb/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const validateUser = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this resource" });
    }

    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const userIdFromToken = req.user.id;

  try {
    const userIdToDelete = id || userIdFromToken;

    if (!mongoose.Types.ObjectId.isValid(userIdToDelete)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    if (req.user.role !== "superadmin" && userIdToDelete !== req.user.id) {
      return res.status(403).json({
        message:
          "Access Denied: Only Superadmin can delete other users, or you can only delete your own account",
      });
    }

    const deletedUser = await User.findByIdAndDelete(userIdToDelete);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

module.exports = { validateUser, deleteUser };
