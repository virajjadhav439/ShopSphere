const { body } = require("express-validator");

const createPaymentOrderValidator = [
    body("orderId").notEmpty().withMessage("Order ID is required.").isMongoId().withMessage("Invalid Order ID.")
];