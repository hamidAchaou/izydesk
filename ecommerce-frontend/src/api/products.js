import apiClient from "./index";

export const getProducts = () => apiClient.get("/products");
export const getProductById = (id) => apiClient.get(`/products/${id}`);
export const createProduct = (productData) => apiClient.post("/products", productData);
export const deleteProduct = (id) => apiClient.delete(`/products/${id}`);

export const updateProduct = (id, productData) => {
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

  return apiClient.put(`/products/${id}`, productData);
};
