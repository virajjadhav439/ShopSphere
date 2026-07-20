const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorize");
const validate = require("../middlewares/validate");

const {
    updateOrderStatusValidator,
} = require("../validations/adminOrderValidator");

const {
    getAllOrdersController,
    getOrderByIdController,
    updateOrderStatusController,
} = require("../controllers/adminOrderController");

router.get(
    "/",
    protect,
    authorize("admin"),
    getAllOrdersController
);

router.get(
    "/:orderId",
    protect,
    authorize("admin"),
    getOrderByIdController
);

router.patch(
    "/:orderId/status",
    protect,
    authorize("admin"),
    updateOrderStatusValidator,
    validate,
    updateOrderStatusController
);

module.exports = router;