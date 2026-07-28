const { createReview, updateReview, deleteReview, getProductReviews, getMyReviews } = require("../services/reviewServices");
const asyncHandler = require("../utils/asyncHandler")

const createReviewController = asyncHandler(async (req,res)=>{
    const { productId, rating, comment } = req.body;

    const review = await createReview(
        req.user.userId,
        productId,
        rating,
        comment
    );

    return res.status(201).json({
        success: true,
        message: "Review Created Successfully",
        data: review,
    });
})

const updateReviewController = asyncHandler(async (req,res)=>{
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await updateReview(
        req.user.userId,
        reviewId,
        {
            rating,
            comment,
        }
    );

    return res.status(200).json({
        success: true,
        message: "Review Updated Successfully",
        data: review,
    });
})

const deleteReviewController = asyncHandler(async (req,res)=>{
    const { reviewId } = req.params;

    await deleteReview(
        req.user.userId,
        reviewId
    );

    return res.status(200).json({
        success: true,
        message: "Review Deleted Successfully",
    });
})

const getProductReviewsController = asyncHandler(async (req,res)=>{
    const { productId } = req.params;

    const reviews = await getProductReviews(productId);

    return res.status(200).json({
        success: true,
        message: "Reviews Retrieved Successfully",
        data: reviews,
    });
})

const getMyReviewsController = asyncHandler(async (req,res)=>{
    const reviews = await getMyReviews(req.user.userId);

    return res.status(200).json({
        success: true,
        message: "Reviews Retrieved Successfully",
        data: reviews,
    });
})

module.exports = {
    createReviewController,
    updateReviewController,
    deleteReviewController,
    getProductReviewsController,
    getMyReviewsController,
};