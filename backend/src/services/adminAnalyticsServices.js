const Category = require("../models/Category");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Review = require("../models/Review");
const User = require("../models/User");

const getAdminAnalytics = async()=>{
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalReviews = await Review.countDocuments();
    
    const revenue = await Order.aggregate([
    {
        $match: {
            paymentStatus: "Paid"
        }
    },
    {
        $group: {
            _id: null,
            totalRevenue: {
                $sum: "$finalAmount"
            }
        }
    }
]); 

const totalRevenue = revenue.length > 0 ? revenue[0].totalRevenue : 0;

const averageOrderValue = totalOrders > 0? totalRevenue / totalOrders: 0;

    return {
    totalProducts,
    totalUsers,
    totalOrders,
    totalCategories,
    totalReviews,
    totalRevenue,
    averageOrderValue,
};
}
module.exports = {
    getAdminAnalytics
}