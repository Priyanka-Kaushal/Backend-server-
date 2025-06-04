const orders = require("../../modelsDb/order");
const { logger } = require("../../logger/index");

const getAllOrders = async(req, res) => {
    try{
        const orders = await Order.find().populate("user", "email role");
        res.status(200).json(orders);
    } catch (error) {
        logger.error("Failed to fetch All orders:", error);
        res.status(500).json({ message: "Failed to retrieve orders", error });
    }
}


module.exports = {
  getAllOrders,
};
