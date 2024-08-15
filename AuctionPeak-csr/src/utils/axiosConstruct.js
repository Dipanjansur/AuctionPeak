import axios from "axios"
import { useNavigate } from "react-router-dom";

const Baseaxios = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 10000, // Set a reasonable timeout value
});
// Add request interceptor to handle authentication token
Baseaxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      window.location.href = '/login'; // Redirect to login
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors and transform responses
Baseaxios.interceptors.response.use(
  (response) => {
    // Transform response data if needed
    return response.data;
  },
  (error) => {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error(`[${error.response.status}] ${error.response.data.message}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error setting up the request:', error.message);
    }

    // Optionally, you can throw the error to be handled by the calling code
    return Promise.reject(error);
  }
);

export default Baseaxios;