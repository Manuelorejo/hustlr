import axios from 'axios';
import { AxiosError } from 'axios';

// Create an Axios instance with default configs
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await apiClient.post('/auth/refresh-token', { 
          refreshToken: localStorage.getItem('refresh_token')
        });
        localStorage.setItem('access_token', data.accessToken);
        apiClient.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;



export const handleApiError = (error: unknown, defaultMessage: string) => {
  if (error instanceof AxiosError) {
    console.error(error.response?.data?.message || defaultMessage);
    throw new Error(error.response?.data?.notification || defaultMessage);
  }
  throw new Error(defaultMessage);
};
