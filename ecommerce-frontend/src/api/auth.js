import axios from "axios";

// Public API client (no token)
const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: { "Content-Type": "application/json" },
});

// Authenticated API client with interceptor to add token from localStorage
const apiClientWithAuth = axios.create({
  baseURL: "http://localhost:8000/api",
});

apiClientWithAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");  // get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // attach token
  }
  return config;
});

export const login = (credentials) => apiClient.post("/login", credentials);

export const register = (userData) => apiClient.post("/register", userData);

// export authenticated client to use for protected routes
export { apiClientWithAuth };
