import axios from 'axios';

// Use production backend URL if set, otherwise use /api for local dev (proxied in Vite)
const backend = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: backend,
  withCredentials: true, // needed if your backend uses http-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach token if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error logging
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

// Auth API wrapper
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/me'),
  reactivate: (payload) => api.post('/auth/reactivate', payload),
};

export default api;
