import axios, { AxiosError } from 'axios';
import apiUrls from './api/api';

declare module 'axios' {
  interface AxiosRequestConfig {
    _isRetry: boolean;
  }
}

const axiosApiInstance = axios.create({
  baseURL: 'http://localhost:7070/api/v1',
  _isRetry: false,
});

axiosApiInstance.interceptors.response.use(
  (response) => {
    const request = response.config;
    if (request.url === apiUrls.auth.login) {
      localStorage.setItem('access_token', response.data.accessToken);
      localStorage.setItem('refresh_token', response.data.refreshToken);
      localStorage.setItem('authed_user', JSON.stringify(response.data.user));
    }
    return response;
  },
  async (err: AxiosError) => {
    const errorMessage = err.response?.data;
    err.message = errorMessage as any;
    return Promise.reject({ ...err });
  }
);

export default axiosApiInstance;
