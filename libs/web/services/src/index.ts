import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';
import { DefaultSession } from 'next-auth';
import { IUser } from './nextauth';

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
};

export const api = axios.create(config);

interface ISession extends DefaultSession {
  user: IUser & {
    token: {
      access_token: string;
      refresh_token: string;
    };
  };
}

api.interceptors.request.use(
  async (config) => {
    const session = (await getSession()) as ISession;
    const token = session?.user?.token?.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
