import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: { "Content-Type": "application/json" },
});

export const login = (credentials) => apiClient.post("/login", credentials);

export const register = (userData) => apiClient.post("/register", userData);
