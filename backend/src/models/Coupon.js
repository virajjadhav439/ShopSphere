const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
},
discountType: {
    type: String,
    enum: ["PERCENTAGE", "FIXED"],
    required: true
},
discountValue: {
    type: Number,
    required: true,
    min: 1
},
minimumOrderAmount: {
    type: Number,
    default: 0,
    min: 0
},
maximumDiscount: {
    type: Number,
    default: null
},
expiryDate: {
    type: Date,
    required: true
},
usageLimit: {
    type: Number,
    required: true,
    min: 1
},
usedCount: {
    type: Number,
    default: 0,
    min:0,
},
isActive: {
    type: Boolean,
    default: true
},
createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
},{
    timestamps:true,
})

const Coupon = mongoose.model("Coupon",couponSchema)

module.exports = Coupon