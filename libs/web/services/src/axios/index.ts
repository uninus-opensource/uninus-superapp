import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { auth } from "../auth";

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
    const session = await auth();
    console.log("Session", session);
    const token = session?.user?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
