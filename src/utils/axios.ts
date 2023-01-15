import axios from 'axios';
// const BASE_URL = 'http://localhost:4000';
const BASE_URL = 'https://taskify-backend-production.up.railway.app';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use(
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

// api.interceptors.response.use(
//   (res: any) => res,
//   async (err: any) => {
//     const prevRequest = err?.config;
//     if (prevRequest && !prevRequest?.sent) {
//       prevRequest.sent = true;
//       try {
//         const res = await api.post(`/auth/token`);
//         const { accessToken } = res.data;
//         console.log('Access Token: ', accessToken);
//         localStorage.setItem('token', accessToken);
//         prevRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//         return api(prevRequest);
//       } catch (err2) {
//         return Promise.reject(err2);
//       }
//     }
//     return Promise.reject(err);
//   }
// );
