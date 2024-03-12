import axios, { AxiosError, AxiosResponse } from 'axios';
import { getCookie } from 'cookies-next';

const BASE_URL = 'https://sp-taskify-api.vercel.app/1-4/';

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use((config) => {
  const accessToken = getCookie('accessToken');
  if (accessToken) {
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
  }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    const { response } = error as unknown as AxiosError;
    if (response) {
      throw { status: response.status, data: response.data };
    }
  },
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};
