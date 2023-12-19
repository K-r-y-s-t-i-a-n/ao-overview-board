import axios from 'axios';
import { Notification } from '../../../components/core';

// const baseURL = `http://localhost:8000`;
// const baseURL = `https://apiv2.olkowski.dev`;
// const baseURL = `https://api.ovboard.com`;
const baseURL = `http://api.ovboard.test`;

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

api.interceptors.response.use(
  function (response) {
    // Call was successful, don't do anything special.
    return response;
  },
  function (error) {
    switch (error.response.status) {
      // case 401: // Unauthenticated / Not logged in
      //   return Notification({
      //     color: 'red',
      //     message: 'You are not logged in.',
      //   });
      // case 403: // Unauthorized / Access Forbidden
      //   return Notification({
      //     color: 'red',
      //     message: 'You are not authorized to perform this action.',
      //   });
      case 419: // Session expired
        return Notification({
          color: 'red',
          message: 'Your session has expired. Please login again.',
        });
      case 503: // Down for maintenance
        // Bounce the user to the login screen with a redirect back
        window.location.reload();
        break;
      // case 500:
      //   alert('Oops, something went wrong!  The team have been notified.');
      //   break;
      default:
        // Allow individual requests to handle other errors
        return Promise.reject(error);
    }
  }
);

api.get('/sanctum/csrf-cookie');
