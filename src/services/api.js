import axios from 'axios';

export const API_URL = 'http://localhost:8000';

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

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('docify_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
};

export const profileService = {
  // Get current user's profile
  getMyProfile: async () => {
    const response = await api.get('/profiles/me');
    return response.data;
  },

  // Get profile by username (public)
  getProfile: async (username) => {
    const response = await api.get(`/profiles/${username}`);
    return response.data;
  },

  // Update profile
  updateProfile: async (profileData) => {
    const response = await api.put('/profiles/me', profileData);
    return response.data;
  },

  // Upload CV
  uploadCv: async (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append('cv', file);
    const response = await api.post('/profiles/me/cv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onUploadProgress(percentCompleted);
        }
      },
    });
    return response.data;
  },

  // Delete CV
  deleteCv: async () => {
    const response = await api.delete('/profiles/me/cv');
    return response.data;
  },

  // Upload profile picture
  uploadProfilePicture: async (file) => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    const response = await api.post('/profiles/me/picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Increment CV download count
  incrementCvDownload: async (username) => {
    const response = await api.post(`/profiles/${username}/cv-download`);
    return response.data;
  }
};

export const adminService = {
  // Users
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },
  blockUser: async (id) => {
    const response = await api.put(`/admin/users/${id}/block`);
    return response.data;
  },
  unblockUser: async (id) => {
    const response = await api.put(`/admin/users/${id}/unblock`);
    return response.data;
  },
  suspendUser: async (id, duration, reason) => {
    const response = await api.put(`/admin/users/${id}/suspend`, { duration, reason });
    return response.data;
  },

  // Queries
  getQueries: async () => {
    const response = await api.get('/admin/queries');
    return response.data;
  },
  resolveQuery: async (id) => {
    const response = await api.put(`/admin/queries/${id}/resolve`);
    return response.data;
  },
  addMessage: async (id, text) => {
    const response = await api.post(`/queries/${id}/message`, { text });
    return response.data;
  },
};

export const queryService = {
  createQuery: async (subject, message) => {
    const response = await api.post('/queries', { subject, message });
    return response.data;
  },
  getMyQueries: async () => {
    const response = await api.get('/queries/my-queries');
    return response.data;
  },
  addMessage: async (id, text) => {
    const response = await api.post(`/queries/${id}/message`, { text });
    return response.data;
  },
  getQueryById: async (id) => {
    const response = await api.get(`/queries/${id}`);
    return response.data;
  },
};

export const communityService = {
  getHistory: async () => {
    const response = await api.get('/community/history');
    return response.data;
  }
};

export default api;
