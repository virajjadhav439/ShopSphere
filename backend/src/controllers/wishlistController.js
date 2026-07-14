const { addProductToWishlist, getWishlist, removeProductFromWishlist } = require("../services/wishlistServices")
const asyncHandler = require("../utils/asyncHandler")


const addProductToWishlistController = asyncHandler(async(req,res)=>{
    const wishlist = await addProductToWishlist(req.user.userId,req.params.productId)
    return res.status(201).json({
        success:true,
        wishlist
    })
})

const getWishlistController = asyncHandler(async(req,res)=>{
    const wishlist = await getWishlist(req.user.userId)
    return res.status(200).json({
        success:true,
        wishlist,
    })
})

const removeProductFromWishlistController = asyncHandler(async(req,res)=>{
    const wishlist = await removeProductFromWishlist(req.user.userId,req.params.productId)
    return res.status(200).json({
        success:true,
        wishlist,
    })
})

module.exports = {
    addProductToWishlistController,
    getWishlistController,
    removeProductFromWishlistController,
}