const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon,
    applyCoupon
} = require("../services/couponService");

const createCouponController = asyncHandler(async (req, res) => {

    const coupon = await createCoupon(req.body, req.user.id);

    return res.status(201).json(
        new ApiResponse(201, coupon, "Coupon Created Successfully")
    );
});

const getAllCouponsController = asyncHandler(async (req, res) => {

    const coupons = await getAllCoupons();

    return res.status(200).json(
        new ApiResponse(200, coupons, "Coupons Fetched Successfully")
    );
});

const getCouponByIdController = asyncHandler(async (req, res) => {

    const coupon = await getCouponById(req.params.couponId);

    return res.status(200).json(
        new ApiResponse(200, coupon, "Coupon Fetched Successfully")
    );
});

const updateCouponController = asyncHandler(async (req, res) => {

    const coupon = await updateCoupon(
        req.params.couponId,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(200, coupon, "Coupon Updated Successfully")
    );
});

const deleteCouponController = asyncHandler(async (req, res) => {

    const coupon = await deleteCoupon(req.params.couponId);

    return res.status(200).json(
        new ApiResponse(200, coupon, "Coupon Deleted Successfully")
    );
});

const applyCouponController = asyncHandler(async (req, res) => {

    const { code, orderId } = req.body;

    const result = await applyCoupon(code, orderId);

    return res.status(200).json(
        new ApiResponse(200, result, "Coupon Applied Successfully")
    );
});

module.exports = {
    createCouponController,
    getAllCouponsController,
    getCouponByIdController,
    updateCouponController,
    deleteCouponController,
    applyCouponController
};