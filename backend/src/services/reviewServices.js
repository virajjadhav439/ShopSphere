// Helper functions

const Product = require("../models/Product")
const Review = require("../models/Review")
const ApiError = require("../utils/ApiError")

const findReviewById = async (reviewId)=>{
    const review = await Review.findById(reviewId)
    if (!review) {
        throw new ApiError(400,"Invalid Review Id")
    }
    return review
}

const findProductById = async (productId, session = null) => {
    const query = Product.findById(productId);

if (session) {
    query.session(session);
}

const product = await query;

if (!product) {
    throw new ApiError(404, "Product Not Found");
}

return product;
};

const findReviewByUserAndProduct = async (userId, productId)=>{
    const review = await Review.findOne({user:userId,product:productId})
    return review
}

const findReviewsByProduct = async (productId) => {
    return await Review.find({ product: productId });
}

const updateProductRatings = async (productId)=>{
    // Find all the reviews 
    const reviews  = await findReviewsByProduct(productId)
    // Calculate the review count
    const reviewCount = reviews.length;
    // calculate the avg 
    const ratingTotal = reviews.reduce(
    (sum, review) => sum + review.rating,0);

    const averageRating =reviewCount === 0 ? 0: ratingTotal /reviewCount;
    const product = await findProductById(productId)
    product.reviewCount = reviewCount
    product.averageRating = averageRating
    await product.save()
}

// Direct Services

const createReview = async (userId, productId,rating,comment)=>{
// find product and tell if it exists or not
    await findProductById(productId)

    const existingReview = await findReviewByUserAndProduct(userId, productId)
    if (existingReview) {
        throw new ApiError(400,"review already exists.Edit the Existing")
    }
    const review = await Review.create({
        user:userId,
        product:productId,
        rating:rating,
        comment:comment
    })
    await updateProductRatings(productId);
    return review
}

const updateReview = async (userId,reviewId,{rating,comment})=>{
const review = await findReviewById(reviewId)
if (!review.user.equals(userId)) {
    throw new ApiError(403,"Unauthorized Write")
}
review.rating = rating
review.comment = comment
await review.save()
await updateProductRatings(review.product);
return review
}

const deleteReview = async (userId,reviewId)=>{
    const review = await findReviewById(reviewId)
if (!review.user.equals(userId)) {
    throw new ApiError(403,"Unauthorized Write")
}
await Review.findByIdAndDelete(reviewId)
await updateProductRatings(review.product);
}

const getProductReviews = async (productId)=>{
return await Review.find({product:productId}).populate("user","name profilePic");
}

const getMyReviews = async (userId) =>{
const reviews = await Review.find({user:userId})
if (reviews.length === 0) {
    throw new ApiError(400,"You Have No Reviews")
}
return reviews
}

module.exports = {
    createReview,
    updateReview,
    deleteReview,
    getProductReviews,
    getMyReviews,

    // Helpers (optional)
    findReviewById,
    findProductById,
    findReviewByUserAndProduct,
    findReviewsByProduct,
    updateProductRatings,
};