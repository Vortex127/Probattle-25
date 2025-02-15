import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      // Store token
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      // Store token
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

export default api;

// Blog posts
export const getPosts = async () => {
  const response = await api.get('/posts');
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.data;
};

export const getPost = async (id) => {
  const response = await api.get(`/posts/${id}`);
  if (!response.ok) throw new Error('Failed to fetch post');
  return response.data;
};

export const createPost = async (post) => {
  const response = await api.post('/posts', post);
  if (!response.ok) throw new Error('Failed to create post');
  return response.data;
};

// Tasks
export const getTasks = async () => {
  const response = await api.get('/tasks');
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.data;
};

export const createTask = async (task) => {
  const response = await api.post('/tasks', task);
  if (!response.ok) throw new Error('Failed to create task');
  return response.data;
};

// Notes
export const getNotes = async () => {
  const response = await api.get('/notes');
  if (!response.ok) throw new Error('Failed to fetch notes');
  return response.data;
};

export const createNote = async (note) => {
  const response = await api.post('/notes', note);
  if (!response.ok) throw new Error('Failed to create note');
  return response.data;
}; 