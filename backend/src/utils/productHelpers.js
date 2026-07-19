const Cart = require("../models/Cart");

const generateSlug = (name) => {
    return name
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")   // Remove special characters
        .replace(/\s+/g, "-")       // Spaces -> hyphens
        .replace(/-+/g, "-");       // Multiple hyphens -> one
};

const generateSKU = () => {
    const timestamp = Date.now();

    const random =
        Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();

    return `SKU-${timestamp}-${random}`;
};

const createPriceHistoryEntry = (price,adminId,reason)=>{
return{
        price,
        changedBy: adminId,
        reason,
    }
}
const createCartItem = (productId)=>{
    return {
        product:productId,
        quantity:1,
    }
}
const createOrderItem = (product, quantity) => {
    return {
        product: product._id,
        productName: product.name,
        productImage: product.images[0].url,
        priceAtPurchase: product.currentPrice,
        quantity,
        subtotal: product.currentPrice * quantity,
    };
};

const calculateOrderTotals = (orderItems) => {
    let totalItems=0,totalPrice=0,tax=0,finalAmount=0
    for(const item of orderItems){
        totalItems+=item.quantity
        totalPrice += item.subtotal;
    }
    tax = totalPrice * 0.03;
    finalAmount = totalPrice + tax
    return {totalItems,totalPrice,tax,finalAmount}
}

module.exports ={
    generateSlug,
    generateSKU,
    createPriceHistoryEntry,
    createCartItem,
    createOrderItem,
    calculateOrderTotals,
}