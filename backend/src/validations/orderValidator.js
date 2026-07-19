const { body, param } = require("express-validator");

const placeOrderValidation = [
    body("shippingAddress.fullName")
        .trim()
        .notEmpty()
        .withMessage("Full name is required."),

    body("shippingAddress.phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required."),

    body("shippingAddress.addressLine1")
        .trim()
        .notEmpty()
        .withMessage("Address Line 1 is required."),

    body("shippingAddress.city")
        .trim()
        .notEmpty()
        .withMessage("City is required."),

    body("shippingAddress.state")
        .trim()
        .notEmpty()
        .withMessage("State is required."),

    body("shippingAddress.pincode")
        .trim()
        .notEmpty()
        .withMessage("Pincode is required."),

    body("shippingAddress.country")
        .trim()
        .notEmpty()
        .withMessage("Country is required."),

    body("paymentMethod")
        .isIn(["COD", "Razorpay", "Stripe"])
        .withMessage("Invalid payment method."),
];

const orderIdValidation = [
    param("orderId")
        .isMongoId()
        .withMessage("Invalid Order ID."),
];

module.exports = {
    placeOrderValidation,
    orderIdValidation,
};