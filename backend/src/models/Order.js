const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    items: {
    type: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        productName: {
            type: String,
            required: true,
        },
        productImage: {
            type: String,
            required: true,
        },
        priceAtPurchase: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        subtotal: {
            type: Number,
            required: true,
        },
    }],
    validate: {
        validator: items => items.length > 0,
        message: "Order must contain at least one item.",
    },
},
    shippingAddress:{
    fullName:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    addressLine1:{
        type:String,
        required:true,
    },
    addressLine2:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    pincode:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    }
},
paymentMethod: {
    type: String,
    enum: ["COD", "Razorpay", "Stripe"],
    required: true,
},
paymentStatus: {
    type: String,
    enum: ["Pending","Paid","Failed","Refunded"],
    default: "Pending",
},
paymentDate: {
    type: Date,
},
orderStatus: {
    type: String,
    enum: [
        "Pending",
        "Confirmed",
        "Packed",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
        "Returned",
    ],
    default: "Pending"
},
    totalItems:{
        type:Number,
        required:true,
        default:0,
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0,
    },
    discount:{
        type:Number,
        required:true,
        default:0,
    },
    tax:{
        type:Number,
        required:true,
        default:0,
    },
    finalAmount:{
        type:Number,
        required:true,
        default:0,
    },
    transactionId: {
    type: String,
    default: null,
},
    placedAt: {
    type: Date,
    default: Date.now,
},
deliveredAt: {
    type: Date,
},
},{
    timestamps:true,
})

const Order = mongoose.model("Order",orderSchema)

module.exports = Order