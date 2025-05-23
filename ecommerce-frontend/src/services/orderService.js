import apiClient from "../api/api";

export const fetchOrders = () => {
  return apiClient.get("/orders");
};