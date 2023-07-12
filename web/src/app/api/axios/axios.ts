import axios from 'axios';

const baseURL = `http://localhost:8000`;
// const baseURL = `https://apiv2.olkowski.dev`

const headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export const api = axios.create({
  // baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  baseURL: baseURL,
  headers: headers,
  withCredentials: true,
});

api.get('/sanctum/csrf-cookie');
