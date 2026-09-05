import api from "./api";

export const createOrder = (orderData) => {
  return api.post("/order", orderData);
};

export const getMyOrders = () => {
  return api.get("/order");
};

export const getOrderById = (orderId) => {
  return api.get(`/order/${orderId}`);
};

export const cancelOrder = (orderId) => {
  return api.patch(`/order/${orderId}/cancel`);
};