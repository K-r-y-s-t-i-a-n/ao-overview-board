import axios from 'axios';
// import router from "./router";

const api = axios.create({
  // baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  baseURL: `http://localhost:8000`,
  // baseURL: `https://apiv2.olkowski.dev`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

api.get('/sanctum/csrf-cookie');

// axiosClient.defaults.headers.common['X-Requested-With'] = `XMLHttpRequest`;
// axiosClient.defaults.headers.common['Content-Type'] = `application/json`;
// axiosClient.defaults.headers.common['Accept'] = `application/json`;

// axiosClient.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`;
//   return config;
// });

// axiosClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('TOKEN');
//       window.location.reload();
//       // router.navigate('/login')
//       return error;
//     }
//     throw error;
//   }
// );

export default api;
