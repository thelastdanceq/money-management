import axios from 'axios';
import { getAccessToken } from './token.ts';

const instance = axios.create({
  baseURL: 'http://ec2-13-51-168-225.eu-north-1.compute.amazonaws.com:3000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token !== null) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export { instance as apiInstance };
