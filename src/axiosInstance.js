import axios from "axios";

const generateBearerToken = () => {
  const secretKey = import.meta.env.VITE_SECRET_KEY;
  return `Bearer ${secretKey}`;
};

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = generateBearerToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
