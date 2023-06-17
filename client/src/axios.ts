import axios, { AxiosError } from 'axios';
import apiUrls from './api/api';
import removeTokens from './utils/removeTokens';
import store from './store/store';
import { clearUser } from './store/authReducer';

declare module 'axios' {
  interface AxiosRequestConfig {
    _isRetry: boolean;
  }
}

const axiosApiInstance = axios.create({
  baseURL: 'http://localhost:7070/api/v1',
  _isRetry: false,
});

axiosApiInstance.interceptors.request.use((request) => {
  if (
    request.url !== apiUrls.auth.login ||
    request.url !== apiUrls.auth.register
  ) {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    request.headers.set(
      'Authorization',
      `Bearer ${
        request.url === apiUrls.auth.refreshToken ? refreshToken : accessToken
      }`
    );
  }
  return request;
});

axiosApiInstance.interceptors.response.use(
  (response) => {
    const request = response.config;
    if (request.url === apiUrls.auth.login) {
      localStorage.setItem('access_token', response.data.accessToken);
      localStorage.setItem('refresh_token', response.data.refreshToken);
      localStorage.setItem('authed_user', JSON.stringify(response.data.user));
    }

    if (request.url === apiUrls.auth.refreshToken) {
      localStorage.setItem('access_token', response.data.accessToken);
    }
    if (request.url === apiUrls.auth.logout) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('authed_user');
      window.location.href='/login';
    }
    return response;
  },
  async (err: AxiosError) => {
    const originalRequest = err?.config;
    if (
      originalRequest &&
      !originalRequest._isRetry &&
      err.response?.status === 401 &&
      originalRequest.url !== apiUrls.auth.login &&
      originalRequest.url !== apiUrls.auth.register &&
      originalRequest.url !== apiUrls.auth.refreshToken
    ) {
      try {
        originalRequest._isRetry = true;
        await axiosApiInstance.post(apiUrls.auth.refreshToken);
        return axiosApiInstance(originalRequest);
      } catch (err) {
        store.dispatch(clearUser());
        localStorage.removeItem('authed_user');
        removeTokens();
        window.location.href = '/';
        return Promise.reject(err);
      }
    }

    if (originalRequest?.url === apiUrls.auth.refreshToken) {
      store.dispatch(clearUser());
      removeTokens();
      localStorage.removeItem('authed_user');
      window.location.href = '/';
    }
    const errorMessage = err.response?.data;
    err.message = errorMessage as any;
    return Promise.reject({ ...err });
  }
);

export default axiosApiInstance;
