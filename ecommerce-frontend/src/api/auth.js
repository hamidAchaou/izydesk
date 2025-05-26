import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: { "Content-Type": "application/json" },
});

const apiClientWithAuth = axios.create({
  baseURL: "http://localhost:8000/api",
});

apiClientWithAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (credentials) => apiClient.post("/login", credentials);

export const register = (userData) => apiClient.post("/register", userData);

export { apiClientWithAuth };
