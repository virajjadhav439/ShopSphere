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
const authorize = require("../middlewares/authorize");

router.get("/", getAllCategoriesController);
router.get("/:id", findCategoryController);

router.post("/",protect,authorize('admin'),categoryValidator,validate,createCategoryController);

router.put("/:id",protect,authorize('admin'),categoryValidator,validate,updateCategoryController);

router.delete("/:id",protect,authorize('admin'),deleteCategoryController);

module.exports = router;