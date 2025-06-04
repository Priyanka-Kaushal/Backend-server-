// const Wishlist = require("../../modelsDb/wishlistSchema");
// const { logger } = require("../../logger");

// const addToWishlist = async (req, res) => {
//   const { productId } = req.body;
//   try {
//     let wishlist = await Wishlist.findOne({ user: req.user._id });
//     if (!wishlist) wishlist = new Wishlist({ user: req.user._id, items: [] });

//     if (!wishlist.items.includes(productId)) {
//       wishlist.items.push(productId);
//     }

//     await wishlist.save();
//     res.json(wishlist);
//   } catch (error) {
//     logger.error("Error adding to wishlist:", error);
//     res.status(500).json({ message: "Failed to add to wishlist", error });
//   }
// };

// const getWishlist = async (req, res) => {
//   try {
//     const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("items");
//     res.json(wishlist || { items: [] });
//   } catch (error) {
//     logger.error("Error fetching wishlist:", error);
//     res.status(500).json({ message: "Failed to get wishlist", error });
//   }
// };

// const removeFromWishlist = async (req, res) => {
//   const { productId } = req.params;
//   try {
//     const wishlist = await Wishlist.findOne({ user: req.user._id });
//     if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

//     wishlist.items = wishlist.items.filter(id => id.toString() !== productId);
//     await wishlist.save();

//     res.json(wishlist);
//   } catch (error) {
//     logger.error("Error removing from wishlist:", error);
//     res.status(500).json({ message: "Failed to remove item", error });
//   }
// };

// module.exports = { addToWishlist, getWishlist, removeFromWishlist };
