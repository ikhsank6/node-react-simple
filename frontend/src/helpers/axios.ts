import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { login, logout } from '../features/auth/authSlice';
import AuthService from '../services/AuthService';
import { store } from '../store';

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });

    failedQueue = [];
};

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Exclude login and register endpoints from token refresh logic
        if (originalRequest.url?.includes('/login') || originalRequest.url?.includes('/register')) {
            return Promise.reject(error);
        }

        if ([401, 403].includes(error.response.status) && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                store.dispatch(logout());
                return Promise.reject(error);
            }

            try {
                const { data }: AxiosResponse<{ accessToken: string; refreshToken: string; user: any }> = await AuthService.refresh(refreshToken);

                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
                store.dispatch(login({ user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken }));

                processQueue(null, data.accessToken);

                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                store.dispatch(logout());
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
