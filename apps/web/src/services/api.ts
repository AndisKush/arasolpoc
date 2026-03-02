import axios from 'axios';
import { storage } from '../utils/storage';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://69.62.103.87:3000',
});

api.interceptors.request.use(config => {
    const token = storage.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401) {
            storage.clearAll();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export { api };
