const { body, param } = require("express-validator");

const updateOrderStatusValidator = [
    param("orderId")
        .isMongoId()
        .withMessage("Invalid order ID."),

    body("orderStatus")
        .notEmpty()
        .withMessage("Order status is required.")
        .isIn([
            "Pending",
            "Confirmed",
            "Packed",
            "Shipped",
            "Out for Delivery",
            "Delivered",
            "Cancelled",
            "Returned",
        ])
        .withMessage("Invalid order status."),
];

module.exports = {
    updateOrderStatusValidator,
};