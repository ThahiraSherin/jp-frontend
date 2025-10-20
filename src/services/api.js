import axios from 'axios';

// Use VITE_API_URL if set, otherwise fall back to the deployed backend URL
const backend = 'https://jp-backend-1-mtjn.onrender.com/api';

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
