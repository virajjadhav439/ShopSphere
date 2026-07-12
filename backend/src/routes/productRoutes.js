const express = require('express');
const router = express.Router()

const { productValidator, priceValidator, stockValidator, basicInfoValidator } = require('../validations/productValidator');
const validate = require('../middlewares/validate');
const {updatePriceController, createProductController, updateStockController, softDeleteProductController, updateBasicInfoController, findProductController, getAllProductsController } = require('../controllers/productController');
const protect = require('../middlewares/authMiddleware');

router.get('/:id',findProductController)
router.get('/',getAllProductsController)

router.post('/',protect,productValidator,validate,createProductController)


router.put('/:id',protect,basicInfoValidator,validate,updateBasicInfoController)
router.put('/:id/price',protect,priceValidator,validate,updatePriceController)
router.put('/:id/stock',protect,stockValidator,validate,updateStockController)

router.delete('/:id',protect,softDeleteProductController)

module.exports = router