// src/api/index.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: { "Content-Type": "application/json" },
});

export const getProducts = () => apiClient.get("/products");
export const getProductById = (id) => apiClient.get(`/products/${id}`);
export const createOrder = (orderData) => apiClient.post("/orders", orderData);
// export const getProductById = (id) => axios.get(`/api/products/${id}`);
export const getCategories = () => apiClient.get("/categories");

export default apiClient;

// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: 'http://localhost:8000/api',
//   headers: { 'Content-Type': 'application/json' },
// });

// export const getProducts = () => apiClient.get('/products');
// export const getProductById = (id) => apiClient.get(`/products/${id}`);
// export const createOrder = (orderData) => apiClient.post('/orders', orderData);

// export default apiClient;
