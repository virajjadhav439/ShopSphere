const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");

const { categoryValidator } = require("../validations/categoryValidator");

const {
    createCategoryController,
    findCategoryController,
    getAllCategoriesController,
    updateCategoryController,
    deleteCategoryController,
} = require("../controllers/categoryController");

router.get("/", getAllCategoriesController);
router.get("/:id", findCategoryController);

router.post("/",protect,categoryValidator,validate,createCategoryController);

router.put("/:id",protect,categoryValidator,validate,updateCategoryController);

router.delete("/:id",protect,deleteCategoryController);

module.exports = router;