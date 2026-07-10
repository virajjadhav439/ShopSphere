const { createProduct, findProductById, fetchAllProducts, updatePrice } = require("../services/productServices")
const asyncHandler = require("../utils/asyncHandler")

const createProductController = asyncHandler(async (req,res) =>{
    const product = await createProduct(req.body,req.user.userId)

    return res.status(201).json({
        success:true,product
    })
})

const findProduct = asyncHandler(async(req,res)=>{
    const product = await findProductById(req.params.id)

    return res.status(200).json({
        product
    })
})

const getAllProducts = asyncHandler(async (req,res)=>{
    const products = await fetchAllProducts()
    return res.status(200).json({
        products
    })
})

const updatePriceController = asyncHandler(async(req,res) =>{
    const { currentPrice, reason } = req.body;
    const updatedProduct = await updatePrice(
        req.params.id,
        currentPrice,
        req.user.userId,
        reason
    );
    return res.status(200).json({
        success: true,
        updatedProduct
    })
})

module.exports = {
    createProductController,
    findProduct,
    getAllProducts,
    updatePriceController,
}