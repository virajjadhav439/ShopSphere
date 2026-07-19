const Order = require("../models/Order")
const ApiError = require("../utils/ApiError")
const { calculateOrderTotals, createOrderItem } = require("../utils/productHelpers")
const { findCartByUserId, clearCart } = require("./cartServices")
const { findProductById } = require("./productServices")
const mongoose = require('mongoose');
// helper Functions 
const findOrderById = async (orderId)=>{
    return await Order.findById(orderId)
}

const findOrdersByUserId = async (userId) => {
    return await Order.find({ user: userId })
        .sort({ createdAt: -1 });
};

// Direct helpers
const createOrder = async (userId,shippingAddress,paymentMethod) => {
    
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // 1. Find Cart
        const cart = await findCartByUserId(userId, session); // <-- update helper

        if (!cart) {
            throw new ApiError(404,"Cart not found.");
        }

        // 2. Validate Cart 
        if (cart.items.length === 0) {
            throw new ApiError(400,"Cart is empty.");
        }

        const orderItems = [];
        const productsToUpdate = [];

        // 3. Validate Stock + Build Order Items
        for (const item of cart.items) {

            const product = await findProductById(item.product, session); // <-- update helper

            if (!product) {
                throw new ApiError(404,"Product not found.");
            }

            if (product.stock < item.quantity) {
                throw new ApiError(400,`${product.name} has insufficient stock.`);
            }

            orderItems.push(
                createOrderItem(product, item.quantity)
            );

            productsToUpdate.push({
                product,
                quantity: item.quantity,
            });
        }

        // 4. Calculate Totals
        const {
            totalItems,
            totalPrice,
            tax,
            finalAmount,
        } = calculateOrderTotals(orderItems);

        // 5. Create Order
        const orders = await Order.create(
            [{
                user: userId,
                items: orderItems,
                shippingAddress,
                paymentMethod,
                totalItems,
                totalPrice,
                tax,
                finalAmount,
            }],
            { session }
        );

        const order = orders[0];

        // 6. Reduce Product Stock
        for (const item of productsToUpdate) {

            item.product.stock -= item.quantity;

            await item.product.save({ session });

        }

        // 7. Clear Cart
        await clearCart(userId, session); // <-- update helper

        // 8. Commit
        await session.commitTransaction();

        return order;

    } catch (error) {

        await session.abortTransaction();

        throw error;

    } finally {

        session.endSession();

    }
};

const getMyOrders = async (userId) => {
    return await findOrdersByUserId(userId);
};

const getOrderById = async (orderId, userId) => {

    const order = await findOrderById(orderId);

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    if (order.user.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to access this order.");
    }

    return order;
};

const cancelOrder = async (orderId, userId) => {

    const order = await findOrderById(orderId);

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    if (order.user.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to cancel this order.");
    }

    if (
        order.orderStatus === "Delivered" ||
        order.orderStatus === "Cancelled" ||
        order.orderStatus === "Returned"
    ) {
        throw new ApiError(
            400,
            `Cannot cancel an order that is ${order.orderStatus}.`
        );
    }

    order.orderStatus = "Cancelled";

    await order.save();

    return order;
};

module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    cancelOrder,
    findOrdersByUserId,
}