import axios from 'axios';
const BASE_URL = 'http://localhost:4000';
// const BASE_URL = 'https://taskify-backend-production.up.railway.app';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

privateApi.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    console.log('Read token: ', token);
    if (!token) return config;
    return {
      ...config,
      headers: { ...config.headers, Authorization: `Bearer ${token}` },
    };
  },
  (err) => {
    return Promise.reject(err);
  }
);

privateApi.interceptors.response.use(
  (res: any) => res,
  async (err: any) => {
    const prevRequest = err?.config;
    const token = localStorage.getItem('token');
    if (err.response.status === 403 && token) {
      try {
        const res = await privateApi.post(`/auth/token`);
        const { accessToken } = res.data;
        localStorage.setItem('token', accessToken);
        prevRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return privateApi(prevRequest);
      } catch (err2) {
        console.log(err2);
        return Promise.reject(err2);
      }
    }
    return Promise.reject(err);
  }
);
