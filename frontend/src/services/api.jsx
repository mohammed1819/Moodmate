import axios from 'axios';

const api = axios.create({
  baseURL: 'https://moodmate-backend-jlk7.onrender.com/api',
  withCredentials: true, // CRITICAL: Sends cookies
});

// Request Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        console.log("Token expired. Attempting refresh...");
        
        // Call refresh endpoint
        const { data } = await axios.post(
          'https://moodmate-backend-jlk7.onrender.com/api/auth/refresh',
          {},
          { withCredentials: true } // MUST send cookie here
        );
        
        console.log("Refresh successful!");
        localStorage.setItem('accessToken', data.accessToken);
        
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
        
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
        // If refresh fails, log out
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;