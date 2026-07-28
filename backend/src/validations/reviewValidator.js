const { body } = require("express-validator");

const createReviewValidator = [
    body("productId").notEmpty().withMessage("Product Id is required.").isMongoId().withMessage("Invalid Product Id."),
    body("rating").notEmpty().withMessage("Rating is required.").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5."),
    body("comment").trim().notEmpty().withMessage("Comment is required.").isLength({ max: 1000 }).withMessage("Comment cannot exceed 1000 characters."),
];

const updateReviewValidator = [
    body("rating").notEmpty().withMessage("Rating is required.").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5."),
    body("comment").trim().notEmpty().withMessage("Comment is required.").isLength({ max: 1000 }).withMessage("Comment cannot exceed 1000 characters."),
];

module.exports = {
    createReviewValidator,
    updateReviewValidator,
};