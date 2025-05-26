import axios from 'axios';
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from '../utils/storage';
import { refreshAccessToken } from './auth';

// 환경변수에서 baseURL을 읽어오고, 없으면 기본값 사용
const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.6:8000/api';

const instance = axios.create({
  baseURL,
  timeout: 30000,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

instance.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      (config.headers as any)['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        if (isRefreshing) {
          return new Promise(function(resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              return instance(originalRequest);
            })
            .catch(err => Promise.reject(err));
        }
        isRefreshing = true;
        const refresh = await getRefreshToken();
        if (!refresh) {
          await clearTokens();
          // TODO: 로그인 화면 이동 또는 Alert
          return Promise.reject(error);
        }
        const data = await refreshAccessToken(refresh);
        await saveTokens(data.access, data.refresh || refresh);
        processQueue(null, data.access);
        originalRequest.headers['Authorization'] = 'Bearer ' + data.access;
        return instance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        await clearTokens();
        // TODO: 로그인 화면 이동 또는 Alert
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default instance; 