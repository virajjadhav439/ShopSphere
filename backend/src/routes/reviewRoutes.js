const express = require("express");

const { createReviewValidator, updateReviewValidator } = require("../validations/reviewValidator");
const protect = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const { createReviewController, updateReviewController, deleteReviewController, getMyReviewsController, getProductReviewsController } = require("../controllers/reviewController");

const router = express.Router();

router.post(
    "/",
    protect,
    createReviewValidator,
    validate,
    createReviewController
);

router.put(
    "/:reviewId",
    protect,
    updateReviewValidator,
    validate,
    updateReviewController
);

router.delete(
    "/:reviewId",
    protect,
    deleteReviewController
);

router.get(
    "/my-reviews",
    protect,
    getMyReviewsController
);

router.get(
    "/product/:productId",
    getProductReviewsController
);

module.exports = router;