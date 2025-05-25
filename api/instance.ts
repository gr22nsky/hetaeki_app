import axios from 'axios';
import { getAccessToken } from '../utils/storage';

// 환경변수에서 baseURL을 읽어오고, 없으면 기본값 사용
const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.6:8000/api';

const instance = axios.create({
  baseURL,
  timeout: 5000,
});

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

export default instance; 