const express = require('express');
const { clearCartController, removeProductFromCartController, updateQuantityController, addProductToCartController, getCartController } = require('../controllers/cartController');
const protect = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { productIdValidator, quantityValidator } = require('../validations/cartValidator');
const router = express.Router()

router.get("/",protect,getCartController);

router.post("/:productId",protect,productIdValidator,validate,addProductToCartController);

router.patch("/:productId",protect,productIdValidator,quantityValidator,validate,updateQuantityController);

router.delete("/:productId",protect,productIdValidator,validate,removeProductFromCartController);

router.delete("/",protect,clearCartController);

module.exports = router