const Product = require("../../modelsDb/productSchema"); 

// Define your product creation logic here
const createProduct = async (req, res) => {
  try {
    const { title, subTitle, description, price, tags, sizes, quantity } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(400).json({ error: "User authentication failed. ID missing." });
    }

    const newProduct = new Product({ title, subTitle, description, price, tags, sizes, quantity });
    const savedProduct = await newProduct.save();

    res.status(201).json({ message: "Product is created", productItem: savedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createProduct }; // Ensure you're exporting the function
