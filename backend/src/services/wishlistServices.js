const Wishlist = require("../models/Wishlist")
const ApiError = require("../utils/ApiError")
const { findProductById } = require("./productServices")

//Helper Functions
const findWishlistByUserId = async (userId) => {
    return await Wishlist.findOne({
        user: userId
    });
}

const findWishlistById = async (wishlistId)=>{
    return await Wishlist.findById(wishlistId)
}

const createWishlist = async (userId)=>{
    return await Wishlist.create({
        user:userId
    })
}
//Direct Services

const addProductToWishlist = async (userId, productId)=>{
// Find Wishlist 
let wishlist = await findWishlistByUserId(userId);

if (!wishlist) {
    wishlist = await createWishlist(userId);
}
// Check if product exists
    await findProductById(productId)

    // Check if product exists in the wishlist if not then add it.
    const alreadyExists = wishlist.products.some(
    product => product.equals(productId)
);

if (alreadyExists){
    throw new ApiError(409,"Product already exists in wishlist");
}
        wishlist.products.push(productId);

        await wishlist.save()
        return await wishlist.populate(
    "products",
    "name slug currentPrice images brand stock"
);
}

const getWishlist = async (userId)=>{
const wishlist = await findWishlistByUserId(userId);

if (!wishlist) {
    throw new ApiError(404, "Wishlist Not Found");
}

return await wishlist.populate("products","name slug currentPrice images brand stock");
}

const removeProductFromWishlist = async  (userId, productId)=>{
const wishlist = await findWishlistByUserId(userId)
if (!wishlist) {
    throw new ApiError(404,"Wishlist Not Found")
}
// Check if Product Exists 
const exists = wishlist.products.some(
    product => product.equals(productId)
);

if (!exists) {
    throw new ApiError(404,"Product not found in wishlist");
}

wishlist.products = wishlist.products.filter(
    product => !product.equals(productId)
);

await wishlist.save();

return await wishlist.populate(
    "products",
    "name slug currentPrice images brand stock"
);
}

module.exports = {
    findWishlistByUserId,
    findWishlistById,
    addProductToWishlist,
    getWishlist,
    removeProductFromWishlist,
}