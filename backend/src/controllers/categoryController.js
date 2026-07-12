const { createCategory, findCategoryById, fetchAllCategories, updateCategory, deleteCategory } = require("../services/categoryServices")
const asyncHandler = require("../utils/asyncHandler")

const createCategoryController = asyncHandler(async (req,res)=>{
    const category = await createCategory(req.body)
    return res.status(201).json({
        success:true,category
    })
})

const findCategoryController = asyncHandler(async (req,res)=>{
    const category = await findCategoryById(req.params.id)
    return res.status(200).json({
        success:true,category
    })
})

const getAllCategoriesController =asyncHandler( async (req,res)=>{
    const categories = await fetchAllCategories()
    return res.status(200).json({
        success:true,categories
    })
})

const updateCategoryController = asyncHandler(async (req, res) => {

    const category = await updateCategory(
        req.params.id,
        req.body
    );

    return res.status(200).json({
        success: true,
        category
    });
});

const deleteCategoryController = asyncHandler(async (req,res)=>{
    await deleteCategory(req.params.id)
    return res.status(200).json({
        success:true,message:"Category Deleted Successfully"
    })
})

module.exports = {
    createCategoryController,
    findCategoryController,
    getAllCategoriesController,
    updateCategoryController,
    deleteCategoryController,
}