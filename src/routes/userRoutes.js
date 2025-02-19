const express = require("express");
const { body } = require("express-validator");
const User = require("../modelsDb/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware imports
const { authenticate, authorize } = require("../middleware/authMiddleware");

// Controller imports (ensure the folder name is correct)
const {
  registeration,
  login,
  fetchPagedUsers,
  searchProfile,
  roleFilter,
} = require("../controler/Auth/auth");

const {
  validateUser,
  deleteUser,
} = require("../controler/Auth/userControllers");
const { registerValidator, loginValidator } = require("../helpers/validator");

router.post("/register", registerValidator, registeration);

router.get(
  "/validateRegister",
  authenticate,
  authorize("superadmin"),
  validateUser
);

router.get("/usersPagination", fetchPagedUsers);

router.get("/userSearch/:key", searchProfile);

router.get("/userRoleFilter", roleFilter);

router.post("/login", loginValidator, login);

router.delete("/deleteUser", authenticate, deleteUser);
module.exports = router;
