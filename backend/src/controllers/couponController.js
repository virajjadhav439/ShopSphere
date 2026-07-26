const asyncHandler = require("../utils/asyncHandler");

const {
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon,
    applyCoupon
} = require("../services/couponServices");

const createCouponController = asyncHandler(async (req, res) => {

    const coupon = await createCoupon(req.body, req.user.id);

    return res.status(201).json({
        success: true,
        message: "Coupon Created Successfully",
        data: coupon
    });
});

const getAllCouponsController = asyncHandler(async (req, res) => {

    const coupons = await getAllCoupons();

    return res.status(200).json({
        success: true,
        message: "Coupons Fetched Successfully",
        data: coupons
    });
});

const getCouponByIdController = asyncHandler(async (req, res) => {

    const coupon = await getCouponById(req.params.couponId);

    return res.status(200).json({
        success: true,
        message: "Coupon Fetched Successfully",
        data: coupon
    });
});

const updateCouponController = asyncHandler(async (req, res) => {

    const coupon = await updateCoupon(
        req.params.couponId,
        req.body
    );

    return res.status(200).json({
        success: true,
        message: "Coupon Updated Successfully",
        data: coupon
    });
});

const deleteCouponController = asyncHandler(async (req, res) => {

    const coupon = await deleteCoupon(req.params.couponId);

    return res.status(200).json({
        success: true,
        message: "Coupon Deleted Successfully",
        data: coupon
    });
});

const applyCouponController = asyncHandler(async (req, res) => {

    const { code, orderId } = req.body;

    const result = await applyCoupon(code, orderId);

    return res.status(200).json({
        success: true,
        message: "Coupon Applied Successfully",
        data: result
    });
});

module.exports = {
    createCouponController,
    getAllCouponsController,
    getCouponByIdController,
    updateCouponController,
    deleteCouponController,
    applyCouponController
};