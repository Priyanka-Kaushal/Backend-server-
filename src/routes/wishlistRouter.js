// const express = require("express");
// const router = express.Router();
// const { addToWishlist, getWishlist, removeFromWishlist } = require("../controller/Wishlist/wishListController");
// const { isAuthenticated } = require("../middleware/index");
// const checkRole = require("../middlewares/roleMiddleware");


// router.post("/wishList", isAuthenticated, checkRole(["user", "admin", "superadmin"]), addToWishlist);
// router.get("/wishListView", isAuthenticated, checkRole(["user", "admin", "superadmin"]), getWishlist);
// router.delete("/:productId", isAuthenticated, checkRole(["user", "admin", "superadmin"]), removeFromWishlist);

// module.exports = router;
