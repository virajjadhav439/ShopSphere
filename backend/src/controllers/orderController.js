const {
    createOrder,
    getMyOrders,
    getOrderById,
    cancelOrder,
} = require("../services/orderServices");

const asyncHandler = require("../utils/asyncHandler");

const createOrderController = asyncHandler(async (req, res) => {

    const order = await createOrder(
        req.user.userId,
        req.body.shippingAddress,
        req.body.paymentMethod
    );

    return res.status(201).json({
        success: true,
        message: "Order placed successfully.",
        data: order,
    });
});

const getMyOrdersController = asyncHandler(async (req, res) => {

    const orders = await getMyOrders(req.user.userId);

    return res.status(200).json({
        success: true,
        message: "Orders fetched successfully.",
        data: orders,
    });
});

const getOrderByIdController = asyncHandler(async (req, res) => {

    const order = await getOrderById(
        req.params.orderId,
        req.user.userId
    );

    return res.status(200).json({
        success: true,
        message: "Order fetched successfully.",
        data: order,
    });
});

const cancelOrderController = asyncHandler(async (req, res) => {

    const order = await cancelOrder(
        req.params.orderId,
        req.user.userId
    );

    return res.status(200).json({
        success: true,
        message: "Order cancelled successfully.",
        data: order,
    });
});

module.exports = {
    createOrderController,
    getMyOrdersController,
    getOrderByIdController,
    cancelOrderController,
};