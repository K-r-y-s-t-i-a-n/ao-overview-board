import axios from 'axios';

const api = axios.create({
  // baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  // baseURL: `http://localhost:8000`,
  baseURL: `https://apiv2.olkowski.dev`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

api.get('/sanctum/csrf-cookie');

export default api;
