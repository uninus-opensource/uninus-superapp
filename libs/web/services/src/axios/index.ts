import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
};

export const api = axios.create(config);

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.user?.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
