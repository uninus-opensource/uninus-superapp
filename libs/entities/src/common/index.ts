import { AxiosError } from "axios";

export type TMetaItem = {
  code: number;
  status: string;
  message: string;
};

export type TMetaResponse<T> = {
  data: T;
} & TMetaItem;

export type TMetaErrorResponse = AxiosError<TMetaItem>;

export interface CustomError extends Error {
  response?: {
    status: number;
  };
}

export type TSize = "sm" | "md" | "lg";

export type TVariant = "default" | "primary" | "secondary" | "success" | "warning" | "error";

export type TVariantType = "solid" | "outline";

export type TState = "default" | "loading";
