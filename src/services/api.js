import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Default FastAPI dev port

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor for auth token
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('docify_user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

export const profileService = {
  getProfile: async (username) => {
    const response = await api.get(`/profiles/${username}`);
    return response.data;
  },
  updateProfile: async (profileData) => {
    const response = await api.put('/profiles/me', profileData);
    return response.data;
  },
  uploadCv: async (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/profiles/me/cv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
    return response.data;
  },
  deleteCv: async () => {
    const response = await api.delete('/profiles/me/cv');
    return response.data;
  }
};

export default api;
