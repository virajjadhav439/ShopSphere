const { body } = require("express-validator");

const categoryValidator = [
    body("name").trim().notEmpty().withMessage("Category Name is Required"),
    body("description").optional().trim(),
    body("image").optional().isString().withMessage("Image must be a string"),
    body("parentCategory").optional({values:'falsy'}).isMongoId().withMessage("Invalid Parent Category ID"),
];

module.exports = {
    categoryValidator,
};