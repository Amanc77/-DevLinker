const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getToken = () => localStorage.getItem('token');

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// Auth API
export const authAPI = {
  register: (userData) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  login: (credentials) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  getMe: () => apiCall('/auth/me'),
};

// Communities API
export const communitiesAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/communities?${queryString}`);
  },
  getById: (id) => apiCall(`/communities/${id}`),
  getFeatured: () => apiCall('/communities/featured/list'),
  create: (communityData) => apiCall('/communities', {
    method: 'POST',
    body: JSON.stringify(communityData),
  }),
};

// Users API
export const usersAPI = {
  joinCommunity: (id) => apiCall(`/users/join-community/${id}`, {
    method: 'POST',
  }),
  leaveCommunity: (id) => apiCall(`/users/leave-community/${id}`, {
    method: 'DELETE',
  }),
  saveCommunity: (id) => apiCall(`/users/save-community/${id}`, {
    method: 'POST',
  }),
  unsaveCommunity: (id) => apiCall(`/users/unsave-community/${id}`, {
    method: 'DELETE',
  }),
  getMyCommunities: () => apiCall('/users/my-communities'),
};

