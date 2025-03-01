import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../pages/auth/auth.store";
// Create an Axios instance with default configs
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// List of endpoints that should NOT have the Authorization header
const AUTH_WHITELIST = [
  "/auth/login",
  "/auth/signup",
  "/auth/password-reset/request",
  "/auth/password-reset/reset",
];

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");

    // Check if the request URL is in the whitelist
    const isAuthEndpoint = AUTH_WHITELIST.some((endpoint) =>
      config.url?.startsWith(endpoint)
    );

    if (token && !isAuthEndpoint) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 🔹 Remove the access token and redirect to login
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isAuthenticated")
      useAuthStore.getState().removeAuth();
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// Helper function to handle API errors
export const handleApiError = (error: unknown, defaultMessage: string) => {
  if (error instanceof AxiosError) {
    console.error(error.response?.data?.message || defaultMessage);
    throw new Error(error.response?.data?.notification || defaultMessage);
  }
  throw new Error(defaultMessage);
};
