const express = require("express");
const { createProduct } = require("../controller/Products/productController"); // Ensure this points to the correct handler
const router = express.Router();
const { isAuthenticated } = require("../middleware/index");

router.post("/product-add", isAuthenticated, createProduct); // Use the function here, not an object

module.exports = router;
