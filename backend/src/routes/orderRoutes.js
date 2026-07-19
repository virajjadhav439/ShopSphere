const express = require("express");

const router = express.Router();

const verifyJWT = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");

const {
    createOrderController,
    getMyOrdersController,
    getOrderByIdController,
    cancelOrderController,
} = require("../controllers/orderController");
const { placeOrderValidation, orderIdValidation } = require("../validations/orderValidator");
// All routes require login
router.use(verifyJWT);

// Place Order
router.post(
    "/",
    placeOrderValidation,
    validate,
    createOrderController
);

// Get My Orders
router.get(
    "/",
    getMyOrdersController
);

// Get Order By ID
router.get(
    "/:orderId",
    orderIdValidation,
    validate,
    getOrderByIdController
);

// Cancel Order
router.patch(
    "/:orderId/cancel",
    orderIdValidation,
    validate,
    cancelOrderController
);

module.exports = router;