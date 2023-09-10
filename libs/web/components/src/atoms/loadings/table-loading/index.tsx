import { FC, ReactElement } from "react";
import { TLoadingProps } from "../spinner/type";

export const TableLoadingData: FC<TLoadingProps> = ({ className }): ReactElement => {
  return (
    <div
      data-testid="load-table-data"
      className={`${className} bg-slate-3 animate-pulse rounded-md`}
    ></div>
  );
};
