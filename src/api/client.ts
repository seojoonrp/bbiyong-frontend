import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const BASE_URL =
  "https://nontheological-unpostered-addyson.ngrok-free.dev/api/v1";

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
});

client.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error.response?.data || error.message);

    return Promise.reject(error);
  }
);

export default client;
