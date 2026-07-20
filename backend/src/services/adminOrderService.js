const Order = require("../models/Order");
const ApiError = require("../utils/ApiError");

// Helper Functions
const findAllOrders = async () => {
    return await Order.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 });
};

const findOrderById = async (orderId) => {
    return await Order.findById(orderId)
        .populate("user", "name email");
};

// Direct Services 
const getAllOrders = async ()=>{
    return await findAllOrders()
}

const getOrderById = async (orderId)=>{
    const order = await findOrderById(orderId);

    if (!order) {
        throw new ApiError(404, "Order not found.");
    }

    return order;
}
const updateOrderStatus = async (orderId, orderStatus)=>{
    // find order
    const order = await findOrderById(orderId);

if (!order) {
    throw new ApiError(404, "Order not found.");
}
// Validation Cases
const validTransitions = {
    Pending: ["Confirmed", "Cancelled"],
    Confirmed: ["Packed", "Cancelled"],
    Packed: ["Shipped"],
    Shipped: ["Out for Delivery"],"Out for Delivery": ["Delivered"],
    Delivered: ["Returned"],
    Cancelled: [],
    Returned: [],
};

if (!validTransitions[order.orderStatus].includes(orderStatus)) {
    throw new ApiError(
        400,
        `Cannot change status from ${order.orderStatus} to ${orderStatus}.`
    );
}
// update Status
order.orderStatus = orderStatus;
// if delivered
if (orderStatus === "Delivered") {
    order.deliveredAt = new Date();
}
// Save it up 

await order.save();

return order;
}

module.exports = {
    getAllOrders,
    getOrderById,
    updateOrderStatus,
};