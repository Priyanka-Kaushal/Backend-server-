const User = require("../modelsDb/User");
const mongoose = require("mongoose");
const { logger } = require("../logger/index");

const validateUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this resource" });
    }

    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    logger.error(`Error fetching users: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const userIdFromToken = req.user.id;

  try {
    const userIdToDelete = id || userIdFromToken;

    if (!mongoose.Types.ObjectId.isValid(userIdToDelete)) {
      logger.warn(`Invalid User ID format: ${userIdToDelete}`);
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    if (req.user.role !== "admin" && userIdToDelete !== req.user.id) {
      logger.warn(`Unauthorized attempt to delete user: ${userIdToDelete}`);
      return res.status(403).json({
        message:
          "Access Denied: Only Admin can delete other users, or you can only delete your own account",
      });
    }

    const deletedUser = await User.findByIdAndDelete(userIdToDelete);

    if (!deletedUser) {
      logger.warn(`User not found for deletion: ${userIdToDelete}`);
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    logger.error(`Error deleting user: ${err.message}`);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

module.exports = { validateUser, deleteUser };
