import apiClient from "./index";

export const getOrders = () => apiClient.get("/orders");
export const getOrderById = (id) => apiClient.get(`/orders/${id}`);
export const createOrder = (orderData) => apiClient.post("/orders", orderData);
export const updateOrder = (id, orderData) => apiClient.put(`/orders/${id}`, orderData);
export const deleteOrder = (id) => apiClient.delete(`/orders/${id}`);
