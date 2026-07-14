const { param } = require("express-validator");

const wishlistValidator = [
    param("productId").isMongoId().withMessage("Invalid Product ID"),
];

module.exports = {
    wishlistValidator,
}