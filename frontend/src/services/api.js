import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '/api';

console.log('API Base URL:', baseURL); // Debug log

const api = axios.create({
  baseURL,
  withCredentials: false, // Changed from true to fix CORS
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  // Products
  getProducts: async () => {
    try {
      const { data } = await api.get('/products');
      return data.data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      console.error('API URL:', baseURL);
      throw error; // Re-throw so components can handle it
    }
  },

  // Inquiry
  submitInquiry: async (formData) => {
    const { data } = await api.post('/inquiry', formData);
    return data;
  },

  // Upload
  uploadLogo: async (file) => {
    const formData = new FormData();
    formData.append('logo', file);
    const { data } = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  // Admin
  adminLogin: async (email, password) => {
    const { data } = await api.post('/admin/login', { email, password });
    return data;
  },

  getInquiries: async (page = 1, limit = 10) => {
    const { data } = await api.get(`/inquiry?page=${page}&limit=${limit}`);
    return data;
  },

  updateInquiry: async (id, status) => {
    const { data } = await api.put(`/inquiry/${id}`, { status });
    return data;
  },
};

export default api;
