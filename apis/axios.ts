import axios, { AxiosError } from 'axios';
import LocalStorage from '@/utils/localStorage';
import { AxiosResponse } from 'axios';

const BASE_URL = 'https://sp-taskify-api.vercel.app/1-4/';

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use((config) => {
  const accessToken = LocalStorage.getItem('accessToken');
  config.headers.Authorization = `Bearer ${accessToken}`;
  config.headers['Content-Type'] = 'application/json';
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
