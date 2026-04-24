import axios from "axios";

const api = axios.create({
  baseURL: "https://local-service-lmek.onrender.com/api/",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      console.log("401 error → stopping loop");

      // 🔥 IMPORTANT: do NOT retry again and again
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;