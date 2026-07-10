const express = require('express');
const router = express.Router()

const { productValidator, priceValidator } = require('../validations/productValidator');
const validate = require('../middlewares/validate');
const {findProduct, getAllProducts, updatePriceController, createProductController } = require('../controllers/productController');
const protect = require('../middlewares/authMiddleware');

router.get('/:id',findProduct)
router.get('/',getAllProducts)

router.post('/',protect,productValidator,validate,createProductController)
router.put('/:id/price',protect,priceValidator,validate,updatePriceController)

module.exports = router