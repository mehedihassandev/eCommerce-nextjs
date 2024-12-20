import axios, { InternalAxiosRequestConfig } from 'axios';

const baseURL = process.env.API_BASE_URL;

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((reqConfig: InternalAxiosRequestConfig) => {
  reqConfig.headers.set('Cache-Control', 'no-cache');

  return reqConfig;
});

export { instance as axios };
