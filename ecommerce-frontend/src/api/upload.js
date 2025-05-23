import apiClient from "./index";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file, file.name);
  
  try {
    const response = await apiClient.post('/products/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Requested-With': 'XMLHttpRequest'
      },
      timeout: 30000
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
