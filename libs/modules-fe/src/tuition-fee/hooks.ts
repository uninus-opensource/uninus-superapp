import { useRecoilState, useRecoilValue } from 'recoil';
import {
  sarjanaFilter,
  sarjanaSearch,
  magisterFilter,
  magisterSearch,
} from './store';
import {
  TSarjanaDataResponse,
  TDataSarjanaQueryResponse,
  TDataMagisterQueryResponse,
  TMagisterDataResponse,
} from './types';

export const useSarjanaData = (): TSarjanaDataResponse => {
  const get = useRecoilValue(sarjanaFilter);
  return {
    getSarjanaData: get,
  };
};

export const useSarjanaQuery = (): TDataSarjanaQueryResponse => {
  const [get, set] = useRecoilState(sarjanaSearch);
  return {
    getSarjanaQuery: get,
    setSarjanaQuery: (val: string) => set(val),
  };
};

export const useMagisterData = (): TMagisterDataResponse => {
  const get = useRecoilValue(magisterFilter);
  return {
    getMagisterData: get,
  };
};

export const useMagisterQuery = (): TDataMagisterQueryResponse => {
  const [get, set] = useRecoilState(magisterSearch);
  return {
    getMagisterQuery: get,
    setMagisterQuery: (val: string) => set(val),
  };
};
