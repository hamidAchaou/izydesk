import apiClient from "./index";

export const getCategories = () => apiClient.get("/categories");
export const createCategory = (categoryData) => apiClient.post("/categories", categoryData);
export const updateCategory = (id, categoryData) => apiClient.put(`/categories/${id}`, categoryData);
export const deleteCategory = (id) => apiClient.delete(`/categories/${id}`);
