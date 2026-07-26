

const { createPaymentOrder, verifyPayment, getPaymentDetails } = require("../services/paymentServices");
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
    const {orderId,razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
    const order = await verifyPayment(orderId,req.user.userId,razorpay_order_id,razorpay_payment_id,razorpay_signature)
    return res.status(200).json({
    success: true,
    message: "Payment verified successfully.",
    data: order
});
});

const getPaymentDetailsController = asyncHandler(async (req, res) => {
    const orderId = req.params.orderId;
    const {paymentMethod,paymentStatus,gatewayOrderId,transactionId,paymentDate} = await getPaymentDetails(orderId,req.user.userId)
    return res.status(200).json({
    success: true,
    message: "Payment details fetched successfully.",
    data: {
        paymentMethod,
        paymentStatus,
        gatewayOrderId,
        transactionId,
        paymentDate
    }
});
});

module.exports = {
    createPaymentOrderController,
    verifyPaymentController,
    getPaymentDetailsController,
};