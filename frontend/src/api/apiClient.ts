import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { Result } from '../common/types';
import { store } from '../store';
import { clearAuth } from '../store/auth/authSlice';
import { storage } from '../utils/storage';


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
 
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (res: AxiosResponse<Result>) => {
    if (res.data.code === '200') {
      return res.data.data;
    }
    return Promise.reject(new Error(res.data.code));
  },
  (error: AxiosError<Result>) => {
    if (error.response?.status === 401) {
      store.dispatch(clearAuth());
      storage.clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

class APIClient {
  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }

  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  put<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' });
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }

  patch<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' });
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<any, AxiosResponse<Result>>(config)
        .then((res: AxiosResponse<Result>) => {
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
        });
    });
  }
}
export default new APIClient();
