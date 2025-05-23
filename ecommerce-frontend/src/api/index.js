import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: { 
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  withCredentials: true
});

// Products
export const getProducts = () => apiClient.get("/products");
export const getProductById = (id) => apiClient.get(`/products/${id}`);
export const createProduct = (productData) => apiClient.post("/products", productData);
export const deleteProduct = (id) => apiClient.delete(`/products/${id}`);

export const updateProduct = (id, productData) => {
  // Check if we have files to upload
  const hasFiles = productData.images?.some(img => img instanceof File || img instanceof Blob);
  
  if (hasFiles) {
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      if (key === 'images') {
        productData.images.forEach((img, index) => {
          if (img instanceof File || img instanceof Blob) {
            formData.append(`images[${index}]`, img);
          } else {
            formData.append(`existingImages[${index}]`, JSON.stringify(img));
          }
        });
      } else {
        formData.append(key, productData[key]);
      }
    });
    
    return apiClient.put(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  
  // Regular JSON update
  return apiClient.put(`/products/${id}`, productData);
};
// Categories
export const getCategories = () => apiClient.get("/categories");
// Categories CRUD
export const createCategory = (categoryData) => apiClient.post("/categories", categoryData);
export const updateCategory = (id, categoryData) => apiClient.put(`/categories/${id}`, categoryData);
export const deleteCategory = (id) => apiClient.delete(`/categories/${id}`);
// Image Upload
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file, file.name);
  
  try {
    const response = await apiClient.post('/products/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Requested-With': 'XMLHttpRequest'
      },
      timeout: 30000 // 30 seconds timeout
    });
    
    if (!response.data.url) {
      throw new Error('Server did not return image URL');
    }
    
    return response.data.url;
  } catch (error) {
    let errorMessage = 'Failed to upload image';
    if (error.response) {
      errorMessage = error.response.data?.error || error.response.statusText;
    } else if (error.request) {
      errorMessage = 'No response from server';
    }
    console.error('Upload error:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Orders
export const getOrders = () => apiClient.get("/orders");
export const getOrderById = (id) => apiClient.get(`/orders/${id}`);
export const createOrder = (orderData) => apiClient.post("/orders", orderData);
export const updateOrder = (id, orderData) => apiClient.put(`/orders/${id}`, orderData);
export const deleteOrder = (id) => apiClient.delete(`/orders/${id}`);

export default apiClient;