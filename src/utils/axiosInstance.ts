import axios, { AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';
import { API_URL } from '@/config/api';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
});

// Tüm istekler için bir interceptor oluşturun.
axiosInstance.interceptors.request.use(async (config) => {
    const session:any = await getSession();
    if (session?.accessToken) {
        config.headers['Authorization'] = `Bearer ${session.accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
