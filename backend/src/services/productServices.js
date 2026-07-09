const Category = require("../models/Category")
const Product = require("../models/Product")
const ApiError = require("../utils/ApiError")
const { generateSlug, generateSKU, createInitialPriceHistory } = require("../utils/productHelpers")

const findProductById = async (productId)=>{
    try {
        const product = await Product.findById(productId)
        if (!product) {
            throw new ApiError(404,"Product Not Found")
        }
        return product
    } catch (error) {
        throw error
    }
}

const findProductBySlug = async (productSlug)=>{
    try {
        const product = await Product.findOne({slug:productSlug})
        return product
    } catch (error) {
        throw error
    }
}

const findCategoryById =async (categoryId)=>{
    const existingCategory = await Category.findById(categoryId)
    if (!existingCategory) {
        throw new ApiError(404,"Category Not Found")
    }
    return existingCategory
}

const fetchAllProducts = async ()=>{
    const products = await Product.find()
    return products
}

const createProduct = async ({name,description,brand,currentPrice,category,stock,images,tags},adminId)=>{
    //check if category exits
    await findCategoryById(category)
    //Generate Slug
    const slug = generateSlug(name)

    // Find Product by Slug
    const existingProduct = await findProductBySlug(slug)
    if (existingProduct) {
        throw new ApiError(409,"Product Already Exists")
    }
    // Generate SKU
    const sku = generateSKU()

    // Create First Price History Entry
    const priceHistory = createInitialPriceHistory(currentPrice,adminId,"Initial Product Creation")

    // Create Product 
    const product  = await Product.create({
        name,description,brand,
        slug,sku,
        currentPrice,category,stock,images,tags,
        createdBy:adminId,
        updatedBy:null,priceHistory,
    })
    // Return Product 
    return product
}

module.exports = {
    createProduct,
    findCategoryById,
    findProductById,
    findProductBySlug,
    fetchAllProducts,
}