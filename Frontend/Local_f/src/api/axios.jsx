import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
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
        
       
        await axios.post(
          "http://127.0.0.1:8000/api/refresh/", 
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