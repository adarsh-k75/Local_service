import axios from "axios";

const api = axios.create({
  // Point this to your live Render API
  baseURL: "https://local-service-lmek.onrender.com/api/",
  withCredentials: true,
});

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (Expired Tokens)
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("refresh")
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // This will now call https://local-service-lmek.onrender.com/api/refresh/
          await api.post("refresh/");
          isRefreshing = false;
          return api(originalRequest);
        } catch (err) {
          isRefreshing = false;
          // Redirect to login if the refresh token is also expired or invalid
          window.location.href = "/login";
          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;