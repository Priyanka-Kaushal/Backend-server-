const express = require("express");
const { body } = require("express-validator");
const User = require("../modelsDb/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware imports
// const { verifyToken } = require("../middleware/auth");
const { authenticate, authorize } = require("../middleware/authMiddleware");

// Controller imports (ensure the folder name is correct)
const {
  loginUser,
  registerPost,
} = require("../controler/auth");
const { validateUser, deleteUser } = require("../controler/userControllers");
const { registerValidator, loginValidator } = require("../helpers/validator");
// Register route
router.post("/register", registerValidator, registerPost);

// Validate registration (Superadmin only) and rights had only superadmin
router.get(
  "/validateRegister",
  authenticate,
  authorize("superadmin"),
  validateUser
);

// Login route
router.post("/login", loginValidator, loginUser);

// router.get("/profile", verifyToken, userProfile);

router.delete("/deleteUser", authenticate, deleteUser);
module.exports = router;
