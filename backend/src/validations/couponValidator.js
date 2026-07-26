const { body } = require("express-validator");

const createCouponValidator = [
    body("code").trim().notEmpty().withMessage("Coupon code is required"),
    body("discountType").isIn(["PERCENTAGE", "FIXED"]),
    body("discountValue").isNumeric(),
    body("minimumOrderAmount").isNumeric(),
    body("expiryDate").notEmpty(),
    body("usageLimit").isInt({ min: 1 })
];

const updateCouponValidator = [
    body("discountType")
        .optional()
        .isIn(["PERCENTAGE", "FIXED"]),

    body("discountValue")
        .optional()
        .isNumeric(),

    body("minimumOrderAmount")
        .optional()
        .isNumeric(),

    body("maximumDiscount")
        .optional()
        .isNumeric(),

    body("usageLimit")
        .optional()
        .isInt({ min: 1 }),

    body("isActive")
        .optional()
        .isBoolean()
];

const applyCouponValidator = [
    body("code")
        .trim()
        .notEmpty()
        .withMessage("Coupon code is required"),

    body("orderId")
        .notEmpty()
        .withMessage("Order Id is required")
];

module.exports = {
    createCouponValidator,
    updateCouponValidator,
    applyCouponValidator
};