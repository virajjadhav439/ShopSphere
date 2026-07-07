const { createProduct } = require("../services/productServices")
const asyncHandler = require("../utils/asyncHandler")

const create = asyncHandler(async (req,res) =>{
    const product = await createProduct(req.body,req.user.userId)

    return res.status(201).json({
        success:true,product
    })
})