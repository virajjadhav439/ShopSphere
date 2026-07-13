const express = require('express');
const router = express.Router()

const { productValidator, priceValidator, stockValidator, basicInfoValidator } = require('../validations/productValidator');
const validate = require('../middlewares/validate');
const {updatePriceController, createProductController, updateStockController, softDeleteProductController, updateBasicInfoController, findProductController, getAllProductsController } = require('../controllers/productController');
const protect = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');

router.get('/:id',findProductController)
router.get('/',getAllProductsController)

router.post('/',protect,authorize('admin'),productValidator,validate,createProductController)


router.put('/:id',protect,authorize('admin'),basicInfoValidator,validate,updateBasicInfoController)
router.put('/:id/price',protect,authorize('admin'),priceValidator,validate,updatePriceController)
router.put('/:id/stock',protect,authorize('admin'),stockValidator,validate,updateStockController)

router.delete('/:id',protect,authorize('admin'),softDeleteProductController)

module.exports = router