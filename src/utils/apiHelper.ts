import { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';

const apiHelper = {
    get: async <T = any>(endpoint: string): Promise<AxiosResponse<T>> => {
        const response = await axiosInstance.get<T>(endpoint);
        return response;
    },
    post: async <T = any>(endpoint: string, data: any, config?: any): Promise<AxiosResponse<T>> => {
        const response = await axiosInstance.post<T>(endpoint, data, config);
        return response;
    },
    put: async <T = any>(endpoint: string, data: any, config?: any): Promise<AxiosResponse<T>> => {
        const response = await axiosInstance.put<T>(endpoint, data, config);
        return response;
    },
    delete: async <T = any>(endpoint: string): Promise<AxiosResponse<T>> => {
        const response = await axiosInstance.delete<T>(endpoint);
        return response;
    }
};

export default apiHelper;
