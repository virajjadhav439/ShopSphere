const razorpay = require("../config/razorpay");
const Order = require("../models/Order");
const ApiError = require("../utils/ApiError");

// Helper Functions
const findOrderById = async (orderId) => {
    const order = await Order.findById(orderId);

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
    return {
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    receipt: razorpayOrder.receipt
};
}

const verifyPayment = async(orderId,razorpay_order_id,razorpay_payment_id,razorpay_signature)=>{
    
}

const getPaymentDetails = async(orderId, userId)=>{
const order = await findOrderById(orderId)

}

module.exports = {
    isOrderOwnedByUser,
    isOrderAlreadyPaid,
    createPaymentOrder,
    verifyPayment,
    getPaymentDetails,
}