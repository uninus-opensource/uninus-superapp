import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

const configApi: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
};
const configMock: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_MOCK_URL,
};
export const api = axios.create(configApi);
export const mock = axios.create(configMock);

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.user?.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["app-origin"] = process.env.NEXT_PUBLIC_APP_ORIGIN;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
