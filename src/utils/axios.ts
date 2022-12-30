import axios from 'axios';
// const BASE_URL = 'http://localhost:4000';
const BASE_URL = 'https://taskify-backend-production.up.railway.app';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
