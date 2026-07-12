const Category = require("../models/Category")
const ApiError = require("../utils/ApiError")
const { generateSlug } = require("../utils/productHelpers")
const Product = require("../models/Product");

const findCategoryById = async (categoryId)=>{
    const existingCategory = await Category.findById(categoryId)
    if (!existingCategory) {
        throw new ApiError(404,"Category Not Found")
    }
    return existingCategory
}

const findCategoryByName = async(categoryName) =>{
    const existingCategory = await Category.findOne({name:categoryName})
    if (!existingCategory) {
        throw new ApiError(404,"Category Not Found")
    }
    return existingCategory
}

const findCategoryBySlug = async(categorySlug)=>{
    const existingCategory = await Category.findOne({slug:categorySlug})
    if (!existingCategory) {
        throw new ApiError(404,"Category Not Found")
    }
    return existingCategory
}

// Direct Services

const createCategory = async({name,description,image,parentCategory}) =>{
    const existingCategory = await Category.findOne({name: name.toLowerCase()});

if (existingCategory) {
    throw new ApiError(
        409,
        "Category Already Exists"
    );
}

    const newSlug = generateSlug(name)
    const category = await Category.create({
        name,description,image,parentCategory,slug:newSlug
    })
    return category
}

const fetchAllCategories = async() =>{
    const categories = await Category.find()
    return categories
}

const updateCategory = async (
    categoryId,
    { name, description, image, parentCategory }
) => {

    const existingCategory = await findCategoryById(categoryId);

    // Only check slug if the name changes
    if (name && name !== existingCategory.name) {

        const newSlug = generateSlug(name);

        const existingSlug = await Category.findOne({
            slug: newSlug
        });

        if (
            existingSlug &&
            existingSlug._id.toString() !== existingCategory._id.toString()
        ) {
            throw new ApiError(
                409,
                "Category already exists"
            );
        }

        existingCategory.name = name;
        existingCategory.slug = newSlug;
    }

    if (description !== undefined) {
        existingCategory.description = description;
    }

    if (image !== undefined) {
        existingCategory.image = image;
    }

    if (parentCategory !== undefined) {
        existingCategory.parentCategory = parentCategory;
    }

    await existingCategory.save();

    return existingCategory;
};

const deleteCategory =async (categoryId) =>{
    await findCategoryById(categoryId)
    // Check if any product is present in the Category
    const product = await Product.findOne({
    category: categoryId
});

if (product) {
    throw new ApiError(409, "Category contains products");
}
    // Delete the Category
    await Category.findByIdAndDelete(categoryId)
}

module.exports ={
    findCategoryById,
    findCategoryByName,
    findCategoryBySlug,
    fetchAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
}