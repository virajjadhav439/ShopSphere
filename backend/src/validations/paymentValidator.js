const { body, param } = require("express-validator");


const createPaymentOrderValidator = [
    body("orderId").notEmpty().withMessage("Order ID is required.").isMongoId().withMessage("Invalid Order ID.")
];

const verifyPaymentValidator = [
    body("orderId").notEmpty().withMessage("Order ID is required.").isMongoId().withMessage("Invalid Order ID."),
    body("razorpay_order_id").notEmpty().withMessage("Razorpay Order ID is required."),
    body("razorpay_payment_id").notEmpty().withMessage("Razorpay Payment ID is required."),
    body("razorpay_signature").notEmpty().withMessage("Razorpay Signature is required."),
]

const getPaymentDetailsValidator = [
    param("orderId")
        .notEmpty()
        .withMessage("Order ID is required.")
        .isMongoId()
        .withMessage("Invalid Order ID.")
];

module.exports = {
    createPaymentOrderValidator,
    verifyPaymentValidator,
    getPaymentDetailsValidator
}