const express = require("express");
const { body } = require("express-validator");
const User = require("../modelsDb/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware imports
const { authenticate, authorize } = require("../middleware/authMiddleware");

// Controller imports (ensure the folder name is correct)
const {
  loginUser,
  registerPost,
  getPaginatedUsers,
  userProfileSearching,
  userRoles_filter,
} = require("../controller/auth");

const { validateUser, deleteUser } = require("../controller/userControllers");
const { registerValidator, loginValidator } = require("../helpers/validator");
// Register route
router.post("/register", registerValidator, registerPost);

// Validate registration (admin only) and rights had only admin
router.get(
  "/validateRegister",
  authenticate,
  authorize("Admin"),
  validateUser
);

router.get("/usersPagination", getPaginatedUsers);

router.get("/userSearch/:key", userProfileSearching);

router.get("/userRoleFilter", userRoles_filter);

// Login route
router.post("/login", loginValidator, loginUser);

router.delete("/deleteUser", authenticate, deleteUser);
module.exports = router;
