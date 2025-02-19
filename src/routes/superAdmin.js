const express = require("express");
const { body } = require("express-validator");
// const {Permission} = require("../modelsDb/PermissionModel");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
  addPermission,
} = require("../controler/superAdmin/permissionController");

// Import validator
const { permissionAddValidator } = require("../helpers/superAdminValidator");

// Register route
router.post("/add-permission", permissionAddValidator, addPermission);

module.exports = router;
