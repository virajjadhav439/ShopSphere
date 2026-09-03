import api from "./api";

export const getProducts = (params = {}) => {
  return api.get("/products", {
    params,
  });
};
