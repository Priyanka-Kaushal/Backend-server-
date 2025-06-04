const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/index");
const checkRole = require("../middleware/roleBased");
const { getAllOrders } = require("../controller/Orders/orders");

router.get("/orders", isAuthenticated, checkRole(["admin", "superadmin"]), getAllOrders);

module.exports = router;
