const express = require('express');
const router = express.Router()

const { productValidator } = require('../validations/productValidator');
const validate = require('../middlewares/validate');
const { create, findProduct, getAllProducts } = require('../controllers/productController');
const protect = require('../middlewares/authMiddleware');

router.get('/:id',findProduct)
router.get('/',getAllProducts)

router.post('/create',protect,productValidator,validate,create)

module.exports = router