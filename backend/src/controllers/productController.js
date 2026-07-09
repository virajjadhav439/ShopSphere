const { createProduct, findProductById, fetchAllProducts } = require("../services/productServices")
const asyncHandler = require("../utils/asyncHandler")

const create = asyncHandler(async (req,res) =>{
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

module.exports = {
    create,
    findProduct,
    getAllProducts,
}