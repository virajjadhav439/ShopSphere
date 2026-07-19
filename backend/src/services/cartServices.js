// Cart Helpers

const Cart = require("../models/Cart")
const ApiError = require("../utils/ApiError")
const {createCartItem } = require("../utils/productHelpers")
const { findProductById } = require("./productServices")

const findCartByUserId = async (userId, session = null) => {
    const query = Cart.findOne({ user: userId });

    if (session) {
        query.session(session);
    }

    const cart = await query;

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    return cart;
};

const findCartById = async (cartId)=>{
    return await Cart.findById(cartId)
}

const createCart = async (userId)=>{
    return await Cart.create({
        user:userId,
    })
}

const calculateCartTotals = async (cart) => {

    let totalItems = 0;
    let totalPrice = 0;

    for (const item of cart.items) {

        const product = await findProductById(item.product);

        totalItems += item.quantity;

        totalPrice += product.currentPrice * item.quantity;
    }

    cart.totalItems = totalItems;
    cart.totalPrice = totalPrice;

    return cart;
};


// Direct Services

const addProductToCart = async (userId, productId) => {

    const product = await findProductById(productId);

    if (product.stock === 0) {
        throw new ApiError(
            409,
            "Product can't be added. Stock not available."
        );
    }

    let cart = await findCartByUserId(userId);

    if (!cart) {
        cart = await createCart(userId);
    }

    const existingItem = cart.items.find(
        item => item.product.equals(productId)
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push(createCartItem(productId));
    }

    await calculateCartTotals(cart);

    await cart.save();

    return await cart.populate(
        "items.product",
        "name slug currentPrice images brand stock"
    );
};

const getCart = async (userId) => {

    const cart = await findCartByUserId(userId);

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    return await cart.populate(
        "items.product",
        "name slug currentPrice images brand stock"
    );
}

const updateQuantity = async (userId, productId, quantity) => {
// Check if quantity greater then 0
    if (quantity <= 0) {
        throw new ApiError(400, "Quantity must be greater than 0");
    }
// Find cart
    const cart = await findCartByUserId(userId);

    if (!cart) {
        throw new ApiError(404, "Cart does not exist");
    }
// Find product
    const existingItem = cart.items.find(
        item => item.product.equals(productId)
    );

    if (!existingItem) {
        throw new ApiError(404, "Product not found in cart");
    }
// must quantity be less then stock
    const product = await findProductById(productId);

    if (quantity > product.stock) {
        throw new ApiError(
            400,
            "Requested quantity exceeds available stock"
        );
    }

    existingItem.quantity = quantity;

    await calculateCartTotals(cart);

    await cart.save();

    return await cart.populate(
        "items.product",
        "name slug currentPrice images brand stock"
    );
};

const removeProductFromCart = async (userId, productId) => {

    const cart = await findCartByUserId(userId);

    if (!cart) {
        throw new ApiError(404, "Cart does not exist");
    }

    const existingItem = cart.items.find(
        item => item.product.equals(productId)
    );

    if (!existingItem) {
        throw new ApiError(404, "Product not found in cart");
    }

    cart.items = cart.items.filter(
        item => !item.product.equals(productId)
    );

    await calculateCartTotals(cart);

    await cart.save();

    return await cart.populate(
        "items.product",
        "name slug currentPrice images brand stock"
    );
};

const clearCart = async (userId, session = null) => {
    // Find cart
    const cart = await findCartByUserId(userId, session);

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    // Clear items
    cart.items = [];

    await calculateCartTotals(cart);

    // Save with transaction session
    await cart.save({ session });

    return cart
};

module.exports = {
    findCartByUserId,
    addProductToCart,
    getCart,
    updateQuantity,
    removeProductFromCart,
    clearCart,
    findCartById,
}