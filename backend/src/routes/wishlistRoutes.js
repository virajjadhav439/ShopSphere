const express = require('express');
const protect = require('../middlewares/authMiddleware');
const { getWishlistController, addProductToWishlistController, removeProductFromWishlistController } = require('../controllers/wishlistController');
const validate = require('../middlewares/validate');
const { wishlistValidator } = require('../validations/wishlistValidator');
const router = express.Router()


router.get("/",protect,getWishlistController);

router.post("/:productId",protect,wishlistValidator,validate,addProductToWishlistController);

router.delete("/:productId",protect,wishlistValidator,validate,removeProductFromWishlistController);

module.exports = router