import axios from 'axios';

// Axios instance with relative baseURL for Vite proxy
const api = axios.create({
  baseURL: '/api', // Vite will proxy this to backend
  withCredentials: true, // if you use http-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add request interceptor if you need auth tokens
api.interceptors.request.use(
  (config) => {
    // Example: Add token from localStorage if you have one
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API error response:', {
        url: error.config?.url,
        status: error.response.status,
        data: error.response.data,
      });
    } else {
      console.error('API request error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/me'),
  // Try to request reactivation for an email (backend may implement)
  reactivate: (payload) => api.post('/auth/reactivate', payload),
};

export default api;
