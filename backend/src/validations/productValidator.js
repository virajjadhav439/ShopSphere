const { body } = require("express-validator");

const productValidator = [
body("name").trim().notEmpty().withMessage("Product Name is Required"),
body("description").trim().notEmpty().withMessage("Description is Required"),
body("brand").trim().notEmpty().withMessage("Brand is Required"),
body("currentPrice").isFloat({min:0}).withMessage("Price must be greater than or equal to 0"),
body("category").notEmpty().withMessage("Category is Required"),
body("stock").optional().isInt({min:0}).withMessage("Stock Cannot be negative"),
]

const priceValidator = [
body("currentPrice").isFloat({ min: 0 }).withMessage("Price must be greater than or equal to 0"),
body("reason").trim().notEmpty().withMessage("Reason is required")
];

const stockValidator = [
body("stock").isInt({min:0}).withMessage("Stock must be greater then or equal to 0"),
]

const basicInfoValidator = [
body("name").trim().notEmpty().withMessage("Product Name is Required"),
body("description").trim().notEmpty().withMessage("Description is Required"),
body("brand").trim().notEmpty().withMessage("Brand is Required"),
body("tags").optional().isArray().withMessage("Tags must be an array"),
];

module.exports = {
    productValidator,
    priceValidator,
    stockValidator,
    basicInfoValidator,
};