// api.js
import axios from 'axios';
import { auth } from './firebase.js';

const api = axios.create({
  baseURL: 'http://localhost:4000', // only base URL here
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  const token = await auth.currentUser?.getIdToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
