// api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Replace with your API base URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Retrieve the token from local storage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
