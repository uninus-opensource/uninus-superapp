import type { AxiosRequestConfig } from 'axios';
import { TRegisterRequest, TRegisterResponse } from '@uninus/entities';
import axios from 'axios';

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
};

const api = axios.create(config);

export const registerRequest = async (
  payload: TRegisterRequest
): Promise<TRegisterResponse> => {
  const { data } = await api.post('/register', payload);
  return data;
};
