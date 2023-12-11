import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { TDepartmentResponse, TMetaErrorResponse } from "@uninus/entities";
import { DepartmentGet } from "./api";

export const useDepartment = (): UseQueryResult<TDepartmentResponse, TMetaErrorResponse> => {
  return useQuery({
    queryKey: ["geDepartment"],
    queryFn: async () => await DepartmentGet(),
    keepPreviousData: true,
  });
};
