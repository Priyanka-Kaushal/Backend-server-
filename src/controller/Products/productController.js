const Product = require("../../modelsDb/productSchema");
const { logger } = require("../../logger/index");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    logger.error("Failed to fetch products:", error);
    res.status(500).json({ message: "Failed to retrieve products", error });
  }
};

const addProduct = async (req, res) => {
  try {
    const { title, description, price, quantity, sizes, colors, images, category } = req.body;
    logger.info("Add product payload:", req.body);

    const newProduct = new Product({
      title,
      description,
      price,
      quantity,
      sizes,
      colors,
      images,
      category,
      createdBy: req.user._id,
    });

    await newProduct.save();
    logger.info("New product added:", newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    logger.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product", error });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      logger.warn(`Product not found for deletion: ${id}`);
      return res.status(404).json({ message: "Product not found" });
    }
    logger.info(`Product deleted: ${id}`);
    res.json({ message: "Product deleted" });
  } catch (error) {
    logger.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product", error });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    logger.info(`Update request for product ID: ${id} with payload:`, req.body);

    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      logger.warn(`Product not found for update: ${id}`);
      return res.status(404).json({ message: "Product not found" });
    }

    logger.info("Product updated:", updated);
    res.json(updated);
  } catch (error) {
    logger.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product", error });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  deleteProduct,
  updateProduct,
};
