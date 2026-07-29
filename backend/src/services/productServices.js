const Category = require("../models/Category")
const Product = require("../models/Product")
const ApiError = require("../utils/ApiError")
const { generateSlug, generateSKU,createPriceHistoryEntry } = require("../utils/productHelpers")
const { findCategoryById } = require("./categoryServices")

const findProductById = async (productId, session = null) => {
    const query = Product.findById(productId);

    if (session) {
        query.session(session);
    }

    return await query;
};

const findProductBySlug = async (productSlug)=>{
    try {
        const product = await Product.findOne({slug:productSlug})
        return product
    } catch (error) {
        throw error
    }
}

const findProductByCategory = async (categoryId)=>{
    try {
        const product = await Product.findOne({category:categoryId})
        return product
    } catch (error) {
        throw error
    }
}

// Direct Services

const fetchAllProducts = async (queryParams)=>{
    const filter = {
        isActive:true,
    }
    const sort = {};

    // Default Values  as 1 and 10
    const page = Number(queryParams.page) || 1;
    const limit = Number(queryParams.limit) || 10;

    const skip = (page - 1) * limit;
    
    if(queryParams.search){
        filter.name = {
            $regex: queryParams.search,
            $options: "i"
        };
    }
    if(queryParams.category){
        filter.category = queryParams.category;
    }
    
    if (queryParams.minPrice || queryParams.maxPrice) {
        filter.currentPrice = {};
        
        if (queryParams.minPrice) {
            filter.currentPrice.$gte = Number(queryParams.minPrice);
        }
        
        if (queryParams.maxPrice) {
            filter.currentPrice.$lte = Number(queryParams.maxPrice);
        }
    }
    if (queryParams.rating !== undefined) {
        filter.averageRating = {
            $gte: Number(queryParams.rating)
        };
    }
    if(queryParams.inStock === "true"){
        filter.stock = {
            $gt: 0
        };
    }
    
    if (queryParams.sort === "price_asc") {
        sort.currentPrice = 1;
    }
    
    if (queryParams.sort === "price_desc") {
        sort.currentPrice = -1;
    }
    
    if (queryParams.sort === "rating") {
        sort.averageRating = -1;
    }
    
    if (queryParams.sort === "newest") {
        sort.createdAt = -1;
    }
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    
    const products = await Product.find(filter).sort(sort).skip(skip).limit(limit).populate("category","name")
    return {
        products,
        totalProducts,
        totalPages,
        currentPage: page
    };
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
    findProductByCategory,
}