const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { createPaymentOrderController, verifyPaymentController, getPaymentDetailsController } = require("../controllers/paymentController");

const { createPaymentOrderValidator, verifyPaymentValidator, getPaymentDetailsValidator } = require("../validations/paymentValidator");
const validate = require("../middlewares/validate");
const router = express.Router();

router.post("/create-order",protect,createPaymentOrderValidator,validate,createPaymentOrderController);
router.post("/verify-payment",protect,verifyPaymentValidator,validate,verifyPaymentController);
router.get("/:orderId",protect,getPaymentDetailsValidator,validate,getPaymentDetailsController);

module.exports = router;