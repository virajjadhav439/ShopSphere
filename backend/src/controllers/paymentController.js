

const { createPaymentOrder } = require("../services/paymentService");
const asyncHandler = require("../utils/asyncHandler");

const createPaymentOrderController = asyncHandler(async (req, res) => {

    const { orderId } = req.body;

    const razorpayOrder = await createPaymentOrder(
        orderId,
        req.user.userId
    );

    return res.status(201).json({
        success: true,
        message: "Razorpay order created successfully.",
        data: razorpayOrder
    });

});

const verifyPaymentController = asyncHandler(async (req, res) => {

});

const getPaymentDetailsController = asyncHandler(async (req, res) => {

});

module.exports = {
    createPaymentOrderController,
    verifyPaymentController,
    getPaymentDetailsController,
};