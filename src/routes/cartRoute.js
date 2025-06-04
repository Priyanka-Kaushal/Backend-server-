const express = require("express");
const router = express.Router();
const { addToCart, getCart, removeFromCart } = require("../controller/Cart/cart");
const { isAuthenticated } = require("../middleware/index");
const { permissionAddValidator } = require("../helpers/adminValidator");
const checkRole = require("../middleware/roleBased");

router.post("/cartItems", isAuthenticated, checkRole(["superadmin", "admin", "user"]), permissionAddValidator, addToCart);
router.get("/viewCartItems", isAuthenticated, checkRole(["user", "admin", "superadmin"]),permissionAddValidator, getCart);
router.delete("/remove/:productId", isAuthenticated, checkRole(["user", "admin", "superadmin"]), permissionAddValidator, removeFromCart);

module.exports = router;