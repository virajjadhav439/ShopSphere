const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { createPaymentOrderController, verifyPaymentController, getPaymentDetailsController } = require("../controllers/paymentController");
const router = express.Router();

router.post("/create-order",protect,createPaymentOrderController);
router.post("/verify",protect,verifyPaymentController);
router.get("/:orderId",protect,getPaymentDetailsController);

module.exports = router;