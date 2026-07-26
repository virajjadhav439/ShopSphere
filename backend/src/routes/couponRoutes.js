const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorize");
const validate = require("../middlewares/validate");

const {
    createCouponController,
    getAllCouponsController,
    getCouponByIdController,
    updateCouponController,
    deleteCouponController,
    applyCouponController
} = require("../controllers/couponController");

const {
    createCouponValidator,
    updateCouponValidator,
    applyCouponValidator
} = require("../validations/couponValidator");

router.post(
    "/",
    protect,
    authorize("admin"),
    createCouponValidator,
    validate,
    createCouponController
);

router.get(
    "/",
    protect,
    authorize("admin"),
    getAllCouponsController
);

router.get(
    "/:couponId",
    protect,
    authorize("admin"),
    getCouponByIdController
);

router.patch(
    "/:couponId",
    protect,
    authorize("admin"),
    updateCouponValidator,
    validate,
    updateCouponController
);

router.delete(
    "/:couponId",
    protect,
    authorize("admin"),
    deleteCouponController
);

router.post(
    "/apply",
    protect,
    applyCouponValidator,
    validate,
    applyCouponController
);

module.exports = router;