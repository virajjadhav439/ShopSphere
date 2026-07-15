const { addProductToCart, getCart, updateQuantity, removeProductFromCart, clearCart } = require("../services/cartServices")
const asyncHandler = require("../utils/asyncHandler")

const addProductToCartController =asyncHandler( async (req,res)=>{
    const cart = await addProductToCart(req.user.userId,req.params.productId)
    return res.status(200).json({
        success:true,
        cart
    })
})

const getCartController = asyncHandler(async (req,res)=>{
    const cart = await getCart(req.user.userId)
    return res.status(200).json({
        success:true,
        cart
    })
})

const updateQuantityController = asyncHandler(async (req, res) => {
    const { quantity } = req.body;

    const cart = await updateQuantity(
        req.user.userId,
        req.params.productId,
        quantity
    );

    return res.status(200).json({
        success: true,
        cart,
    });
});

const removeProductFromCartController =asyncHandler( async (req,res)=>{
    const cart = await removeProductFromCart(req.user.userId,req.params.productId)
    return res.status(200).json({
        success:true,
        cart
    })
})

const clearCartController = asyncHandler(async (req,res)=>{
    const cart = await clearCart(req.user.userId)
    return res.status(200).json({
        success:true,
        cart
    })
})
module.exports = {
    addProductToCartController,
    getCartController,
    updateQuantityController,
    removeProductFromCartController,
    clearCartController,
}