const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/index");
const {getAllProducts,  addProduct, deleteProduct, updateProduct } = require("../controller/Products/productController"); 
const { permissionAddValidator } = require("../helpers/adminValidator");
const checkRole = require("../middleware/roleBased");

// these are the private route
router.post("/product-add", isAuthenticated,  checkRole(["superadmin", "admin"]), permissionAddValidator, addProduct); 
router.delete("/product-delete/:id", isAuthenticated,  checkRole(["superadmin", "admin"]), permissionAddValidator, deleteProduct);
router.put("/product-update/:id", isAuthenticated,  checkRole(["superadmin", "admin"]), permissionAddValidator, updateProduct); 

// these are the products public routes
router.get("/products", getAllProducts);

module.exports = router;
