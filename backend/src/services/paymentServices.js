const razorpay = require("../config/razorpay");
const Order = require("../models/Order");
const ApiError = require("../utils/ApiError");
const crypto = require('crypto');
// Helper Functions
const findOrderById = async (orderId, session = null) => {
    const order = await Order.findById(orderId).session(session);

    if (!order) {
        throw new ApiError(404, "Order not found.");
    }

    return order;
};

const isOrderOwnedByUser = (order, userId) => {
    if (order.user.toString() !== userId.toString()) {
        throw new ApiError(403, "This order does not belong to you.");
    }
    return order;
};

const isOrderAlreadyPaid = (order)=>{
    if (order.paymentStatus==="Paid") {
        throw new ApiError(400,"Order Already Paid")
    }
    return order
}

// Direct Services
const createPaymentOrder = async(orderId, userId)=>{
    const order = await findOrderById(orderId)
    isOrderOwnedByUser(order,userId)
    isOrderAlreadyPaid(order)
    const razorpayOrder = await razorpay.orders.create({
    amount: order.totalPrice * 100,
    currency: "INR",
    receipt: order._id.toString()
});
order.gatewayOrderId = razorpayOrder.id;
await order.save();

return {
    gatewayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    receipt: razorpayOrder.receipt
};
}

const verifyPayment = async (orderId,userId,razorpay_order_id,razorpay_payment_id,razorpay_signature) => {

    const session = await mongoose.startSession();

    try {

        await session.startTransaction();

        const order = await findOrderById(orderId, session);

        isOrderOwnedByUser(order, userId);

        isOrderAlreadyPaid(order);

        if (order.gatewayOrderId !== razorpay_order_id) {
            throw new ApiError(400, "Invalid Razorpay Order");
        }

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            throw new ApiError(400, "Transaction Failed");
        }

        order.paymentStatus = "Paid";
        order.transactionId = razorpay_payment_id;
        order.paymentDate = new Date();

        if (order.coupon) {
            await Coupon.findByIdAndUpdate(
                order.coupon,
                {
                    $inc: {
                        usedCount: 1
                    }
                },
                { session }
            );
        }

        await order.save({ session });

        await session.commitTransaction();

        return order;

    } catch (error) {

        await session.abortTransaction();

        throw error;

    } finally {

        session.endSession();

    }
};

const getPaymentDetails = async(orderId, userId)=>{
    // find order
const order = await findOrderById(orderId)
// Check ownership
isOrderOwnedByUser(order,userId)
// return Details
return {
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    gatewayOrderId: order.gatewayOrderId,
    transactionId: order.transactionId,
    paymentDate: order.paymentDate
};
}

module.exports = {
    isOrderOwnedByUser,
    isOrderAlreadyPaid,
    createPaymentOrder,
    verifyPayment,
    getPaymentDetails,
}