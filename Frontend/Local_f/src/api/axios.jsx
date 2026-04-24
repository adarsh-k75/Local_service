import axios from "axios";

const api = axios.create({
  baseURL: "https://local-service-lmek.onrender.com/api/",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If we get a 401 and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        console.log("Access token expired. Attempting refresh...");
        
        // 1. Call your Django refresh endpoint
        // This works because your refresh_token is in the HttpOnly cookies
        await axios.post(
          "https://local-service-lmek.onrender.com/api/token/refresh/", 
          {}, 
          { withCredentials: true }
        );

        console.log("Refresh successful! Retrying original request...");

        // 2. If refresh worked, retry the original request that failed
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token expired or invalid. Logging out.");
        
        // 3. If the refresh token is also dead, clear state/redirect to login
        // window.location.href = "/login"; 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;