import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: apiBaseUrl || "/api",
});

api.interceptors.request.use(
  (config) => {
    if (!apiBaseUrl && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      throw new Error("Backend URL is not configured. Set VITE_API_BASE_URL in your frontend deployment.");
    }

    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("access_token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
