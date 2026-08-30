import api from "./api";

export const getCart = () => {
  return api.get("/cart");
};

export const addToCart = (productId) => {
  return api.post(`/cart/${productId}`);
};

export const updateCartQuantity = (productId, quantity) => {
  return api.patch(`/cart/${productId}`, {
    quantity,
  });
};

export const removeFromCart = (productId) => {
  return api.delete(`/cart/${productId}`);
};

export const clearCart = () => {
  return api.delete("/cart");
};