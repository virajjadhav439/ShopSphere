// Helper Functions 

const Coupon = require("../models/Coupon")
const ApiError = require("../utils/ApiError")

const findCouponByCode = async (code) => {
    return await Coupon.findOne({ code });
};

const validateExpiryDate = async (expiryDate) =>{
    const today = new Date();

if (new Date(expiryDate) <= today) {
    throw new ApiError(400, "Expiry date must be in the future.");
}
}


const findCouponById = async (couponId) => {
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
        throw new ApiError(404, "Coupon not found.");
    }
    return coupon;
};

const findOrderById = async (orderId) => {
    const order = await Order.findById(orderId);

    if (!order) {
        throw new ApiError(404, "Order not found.");
    }

    return order;
};

const isCouponExpired = (coupon) => {
    if (coupon.expiryDate < new Date()) {
        throw new ApiError(
            400,
            "Coupon has expired."
        );
    }
};

// Direct Functions

const createCoupon = async ({code,discountType,discountValue,minimumOrderAmount,maximumDiscount,expiryDate,usageLimit},createdBy) =>{
    // Check for duplicate coupons
    if (await findCouponByCode(code)) {
        throw new ApiError(409,"The Coupon Code Already Exists")
    }
    // Check if Coupon is Not expired/Timed Out 
    await validateExpiryDate(expiryDate)
    
    //  Validate Coupon Discountype
    if (discountType === "PERCENTAGE" && maximumDiscount == null) {
    throw new ApiError(400,"Maximum discount is required for percentage coupons.");
    }

    // Create coupon
    const coupon = await Coupon.create({
        code,
        discountType,
        discountValue,
        minimumOrderAmount,
        maximumDiscount,
        expiryDate,
        usageLimit,
        createdBy,
    })
    // return coupon
    return coupon
}

const getAllCoupons = async () => {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    return coupons;
};

const getCouponById = async (couponId) => {
    return await findCouponById(couponId);
};


const updateCoupon = async (couponId,{code,discountType,discountValue,minimumOrderAmount,maximumDiscount,expiryDate,usageLimit,isActive}) => {

    // Find Coupon
    const coupon = await findCouponById(couponId);

    // Validate expiry if provided
    if (expiryDate !== undefined) {
        await validateExpiryDate(expiryDate);
    }

    // Check duplicate code only if code is changing
    if (code !== undefined && coupon.code !== code) {
        if (await findCouponByCode(code)) {
            throw new ApiError(409, "The Coupon Code Already Exists");
        }
    }

    // Determine final values after update
    const finalDiscountType = discountType ?? coupon.discountType;
    const finalMaximumDiscount = maximumDiscount ?? coupon.maximumDiscount;

    // Validate percentage coupon
    if (
        finalDiscountType === "PERCENTAGE" &&
        finalMaximumDiscount == null
    ) {
        throw new ApiError(
            400,
            "Maximum discount is required for percentage coupons."
        );
    }

    // Update only provided fields
    if (code !== undefined) coupon.code = code;
    if (discountType !== undefined) coupon.discountType = discountType;
    if (discountValue !== undefined) coupon.discountValue = discountValue;
    if (minimumOrderAmount !== undefined) coupon.minimumOrderAmount = minimumOrderAmount;
    if (maximumDiscount !== undefined) coupon.maximumDiscount = maximumDiscount;
    if (expiryDate !== undefined) coupon.expiryDate = expiryDate;
    if (usageLimit !== undefined) coupon.usageLimit = usageLimit;
    if (isActive !== undefined) coupon.isActive = isActive;

    await coupon.save();

    return coupon;
};

const deleteCoupon = async (couponId) => {
    // Find Coupon
    const coupon = await findCouponById(couponId);

    // Delete Coupon
    await coupon.deleteOne();

    // Return Deleted Coupon
    return coupon;
};

const applyCoupon = async (code, orderId) => {

    // Find Coupon
    const coupon = await findCouponByCode(code);

    if (!coupon) {
        throw new ApiError(404, "Coupon not found.");
    }

    // Check Active
    if (!coupon.isActive) {
        throw new ApiError(400, "Coupon is inactive.");
    }

    // Check Expiry
    isCouponExpired(coupon);

    // Usage Limit
    if (coupon.usedCount >= coupon.usageLimit) {
        throw new ApiError(400, "Coupon usage limit reached.");
    }

    // Find Order
    const order = await findOrderById(orderId);

    // Minimum Order Amount
    if (order.totalAmount < coupon.minimumOrderAmount) {
        throw new ApiError(
            400,
            `Minimum order amount should be ₹${coupon.minimumOrderAmount}.`
        );
    }

    // Calculate Discount
    let discount = 0;

    if (coupon.discountType === "PERCENTAGE") {

        discount =
            (order.totalAmount * coupon.discountValue) / 100;

        if (discount > coupon.maximumDiscount) {
            discount = coupon.maximumDiscount;
        }

    } else {

        discount = coupon.discountValue;

    }

    // Prevent Negative Total
    discount = Math.min(discount, order.totalAmount);

    const finalAmount = order.totalAmount - discount;
    order.coupon = coupon._id;
    order.discount = discount;
    order.finalAmount = finalAmount;

    await order.save();
    return {
        couponCode: coupon.code,
        originalAmount: order.totalAmount,
        discount,
        finalAmount
    };
};

module.exports = {
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon,
    applyCoupon
};