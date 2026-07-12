const Category = require("../models/Category")
const Product = require("../models/Product")
const ApiError = require("../utils/ApiError")
const { generateSlug, generateSKU,createPriceHistoryEntry } = require("../utils/productHelpers")

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
    const products = await Product.find({isActive:true})
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
    const priceHistory = [
    createPriceHistoryEntry(
        currentPrice,
        adminId,
        "Initial Product Creation"
    )
];

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

const updatePrice = async (productId, updatedPrice, adminId, reason) => {

    // Find Product
    const product = await findProductById(productId);

    // Nothing changed
    if (product.currentPrice === updatedPrice) {
        throw new ApiError(400,"Product already has this price")
    }

    // Create History Entry
    const historyEntry = createPriceHistoryEntry(
        updatedPrice,
        adminId,
        reason
    );

    // Update Product
    product.currentPrice = updatedPrice;
    product.priceHistory.push(historyEntry);
    product.updatedBy = adminId;

    // Save
    await product.save();

    return product;
}

const updateBasicInfo = async (productId,newName,newDescription,newBrand,newTags,adminId)=>{
    //Find Product
    const product = await findProductById(productId)
    //if name Changed ->GenerateSlug
    const slug = generateSlug(newName);

const existingProduct = await findProductBySlug(slug);

if (
    existingProduct && existingProduct._id.toString() !== product._id.toString()
) {
    throw new ApiError(
        409,
        "Product with this name already exists"
    );
}

    product.name = newName
    product.description = newDescription
    product.slug = slug;
    product.brand = newBrand
    product.tags = newTags
    product.updatedBy=adminId

    // save
    await product.save()
    return product;
}


const updateStock = async (productId,newStock,adminId)=>{
    //Find Product
    const product = await findProductById(productId)
    // Update stock
    product.stock = newStock
    product.updatedBy = adminId
    // save
    await product.save()
    return product;
}

const softDeleteProduct = async (productId,adminId)=>{
    // Find Product
    const product = await findProductById(productId)
    //update the isActive Status
    product.isActive=false
    // update updatedby
    product.updatedBy=adminId
    // save
    await product.save()
    return product;
}

module.exports = {
    createProduct,
    findCategoryById,
    findProductById,
    findProductBySlug,
    fetchAllProducts,
    updatePrice,
    updateBasicInfo,
    updateStock,
    softDeleteProduct,
}