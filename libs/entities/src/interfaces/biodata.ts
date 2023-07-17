import { TBiodataResponse } from '../types';

export interface IBiodataGetResponse extends TBiodataResponse {
  id: string;
  fullname: string;
  email: string;
  user_id: string;
  createdAt: string;
}
