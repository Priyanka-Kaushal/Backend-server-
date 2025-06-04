
const { logger } = require("../../logger");
const Cart = require("../../modelsDb/cart");

// const addToCart = async (req, res) => {
//   const { productId, quantity, size, color } = req.body;
//   try {
//     let cart = await Cart.findOne({ user: req.user._id });
//     if (!cart) cart = new Cart({ user: req.user._id, items: [] });

//     const itemIndex = cart.items.findIndex(
//       (item) => item.product.toString() === productId && item.size === size && item.color === color
//     );

//     if (itemIndex >= 0) {
//       cart.items[itemIndex].quantity += quantity;
//     } else {
//       cart.items.push({ product: productId, quantity, size, color });
//     }

//     await cart.save();
//     res.json(cart);
//   } catch (error) {
//     logger.error("Error adding to cart:", error);
//     res.status(500).json({ message: "Failed to add to cart", error });
//   }
// };


const addToCart = async (req, res) => {
  const { productId, quantity, size, color } = req.body;
  console.log("reqqq :", req.body);
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId && item.size === size && item.color === color
    );

    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, size, color });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    logger.error("Error adding to cart:", error);
    res.status(500).json({ message: "Failed to add to cart", error });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    res.json(cart || { items: [] });
  } catch (error) {
    logger.error("Error fetching cart:", error);
    res.status(500).json({ message: "Failed to get cart", error });
  }
};

// const removeFromCart = async (req, res) => {
//   const { productId } = req.params;
//   try {
//     const cart = await Cart.findOne({ user: req.user._id });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     cart.items = cart.items.filter(item => item.product.toString() !== productId);
//     await cart.save();

//     res.json(cart);
//   } catch (error) {
//     logger.error("Error removing from cart:", error);
//     res.status(500).json({ message: "Failed to remove item", error });
//   }
// };

const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  console.log("product id:", productId);

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const initialLength = cart.items.length;

    // Remove items matching the product ID
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await cart.save();

    res.status(200).json({
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    logger.error("Error removing from cart:", error);
    res.status(500).json({ message: "Failed to remove item", error });
  }
};


module.exports = { addToCart, getCart, removeFromCart };
