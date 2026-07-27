import axios from "axios";

// This checks if you are running locally or on Vercel
const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

// Fallback to your live AWS EC2 Public IP when deployed on Vercel
const BASE_URL = isLocal 
  ? "http://localhost:8000/api/" 
  : "https://local-service-3.onrender.com/api/";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        console.log("Access token expired. Attempting refresh...");
        
        // Dynamic path for the token refresh endpoint too
        const refreshUrl = isLocal 
          ? "http://localhost:8000/api/refresh/" 
          : "https://local-service-3.onrender.com/api/refresh/";

        await axios.post(
          refreshUrl,
          {},
          { withCredentials: true }
        );

        console.log("Refresh successful! Retrying original request...");
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token expired or invalid. Logging out.");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;