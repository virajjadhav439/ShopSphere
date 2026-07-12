const { createProduct, findProductById, fetchAllProducts, 
    updatePrice, updateBasicInfo, updateStock, softDeleteProduct } = require("../services/productServices")
const asyncHandler = require("../utils/asyncHandler")

const createProductController = asyncHandler(async (req,res) =>{
    const product = await createProduct(req.body,req.user.userId)

    return res.status(201).json({
        success:true,product
    })
})

const findProductController = asyncHandler(async(req,res)=>{
    const product = await findProductById(req.params.id)

    return res.status(200).json({
        product
    })
})

const getAllProductsController = asyncHandler(async (req,res)=>{
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

const updateBasicInfoController = asyncHandler(async(req,res)=>{
    const {name,description,brand,tags} = req.body;

    const updatedProduct = await updateBasicInfo(req.params.id,name,description,brand,tags,req.user.userId)

    return res.status(200).json({
        success:true,
        updatedProduct
    })
})

const updateStockController = asyncHandler(async(req,res)=>{
    const {stock} = req.body;

    const updatedProduct = await updateStock(req.params.id,stock,req.user.userId)

    return res.status(200).json({
        success:true,
        updatedProduct
    })
})

const softDeleteProductController = asyncHandler(async(req,res)=>{
    const updatedProduct = await softDeleteProduct(req.params.id,req.user.userId)
    return res.status(200).json({
        success:true,
        updatedProduct
    })
})

module.exports = {
    createProductController,
    findProductController,
    getAllProductsController,
    updatePriceController,
    updateBasicInfoController,
    updateStockController,
    softDeleteProductController,
}