import axios from "axios";

const normalizeApiUrl = (url) => {
  if (!url) return "/api";

  const trimmedUrl = url.replace(/\/+$/, "");
  return trimmedUrl.endsWith("/api") ? trimmedUrl : `${trimmedUrl}/api`;
};

const axiosInstance = axios.create({
  baseURL: normalizeApiUrl(import.meta.env.VITE_API_URL),
  withCredentials: true, // by adding this field browser will send the cookies to server automatically, on every single req
});

let authTokenGetter = null;

export const setAuthTokenGetter = (getter) => {
  authTokenGetter = getter;
};

axiosInstance.interceptors.request.use(async (config) => {
  if (!authTokenGetter) return config;

  const token = await authTokenGetter();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
