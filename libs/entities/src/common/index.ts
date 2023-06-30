import { AxiosError } from 'axios';

export type TMetaItem = {
  code: number;
  status: string;
  message: string;
};

export type TMetaResponse<T> = {
  data: Array<T>;
} & TMetaItem;

export type TMetaResponseSingle<T> = {
  data: T;
} & TMetaItem;

export type TMetaErrorResponse = AxiosError<TMetaItem>;

export interface CustomError extends Error {
  response?: {
    status: number;
  };
}
