const { body, param } = require("express-validator");

const productIdValidator = [
    param("productId").isMongoId().withMessage("Invalid Product ID")
]

const quantityValidator = [
    body("quantity").isInt({min:1}).withMessage("Quantity must be Greater than 0")
]

module.exports = {
    productIdValidator,
    quantityValidator,
};