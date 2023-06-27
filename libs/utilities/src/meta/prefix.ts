import { PaginateFunction } from '@uninus/entities';
import { paginator } from './paginator';

export const MetaPrefix = (data: unknown) => {
  const paginate: PaginateFunction = paginator({ perPage: 10 });
  return paginate(data);
};
