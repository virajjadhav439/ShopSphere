const {getAllOrders,getOrderById,updateOrderStatus,} = require("../services/adminOrderService");

const asyncHandler = require("../utils/asyncHandler");

const getAllOrdersController = asyncHandler(async (req, res) => {
    const orders = await getAllOrders();

    return res.status(200).json({
        success: true,
        orders,
    });
});

const getOrderByIdController = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    const order = await getOrderById(orderId);

    return res.status(200).json({
        success: true,
        order,
    });
});

const updateOrderStatusController = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const order = await updateOrderStatus(orderId, orderStatus);

    return res.status(200).json({
        success: true,
        message: "Order status updated successfully.",
        order,
    });
});

module.exports = {
    getAllOrdersController,
    getOrderByIdController,
    updateOrderStatusController,
};