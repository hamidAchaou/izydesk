import { apiClientWithAuth } from "../api/auth";

export const fetchOrders = () => {
  return apiClientWithAuth.get("/orders");
};

export const getOrders = () => apiClientWithAuth.get("/orders");
export const getOrderById = (id) => apiClientWithAuth.get(`/orders/${id}`);
export const createOrder = (orderData) => apiClientWithAuth.post("/orders", orderData);
export const updateOrder = (id, orderData) => apiClientWithAuth.put(`/orders/${id}`, orderData);
export const deleteOrder = (id) => apiClientWithAuth.delete(`/orders/${id}`);
 